import vision from '@google-cloud/vision'
import { supabase } from '../lib/supabase'

const client = new vision.ImageAnnotatorClient()

export class VisionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'VisionError'
  }
}

export interface VisionResult {
  detectedText: string
  detectedObjects: string[]
  confidence: number
}

export async function analyzeImage(imageUrl: string, jobId: string): Promise<VisionResult> {
  const start = Date.now()
  let success = true

  try {
    const [result] = await client.annotateImage({
      image: { source: { imageUri: imageUrl } },
      features: [
        { type: 'TEXT_DETECTION' },
        { type: 'LABEL_DETECTION', maxResults: 20 },
      ],
    })

    // Extract text
    const detectedText = result.fullTextAnnotation?.text?.trim() ?? ''

    // Extract labels with confidence > 0.70
    const detectedObjects = (result.labelAnnotations ?? [])
      .filter(label => (label.score ?? 0) > 0.70)
      .map(label => label.description ?? '')
      .filter(Boolean)

    // Average confidence of top 5 text blocks
    const textAnnotations = result.textAnnotations?.slice(1, 6) ?? []
    const confidence = textAnnotations.length > 0
      ? textAnnotations.reduce((sum, t) => sum + (t.confidence ?? 0), 0) / textAnnotations.length
      : 0

    if (detectedText.length < 10) {
      throw new VisionError('No meaningful text detected in image')
    }

    return { detectedText, detectedObjects, confidence }
  } catch (err) {
    success = false
    if (err instanceof VisionError) throw err
    throw new VisionError(`Vision API error: ${err instanceof Error ? err.message : String(err)}`)
  } finally {
    await supabase.from('api_usage_log').insert({
      job_id: jobId,
      service: 'google_vision',
      duration_ms: Date.now() - start,
      success,
      retry_count: 0,
    })
  }
}
