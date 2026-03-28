import { supabase } from './lib/supabase'
import { analyzeImage } from './services/visionService'

export async function runJob(jobId: string, inputImageUrl: string): Promise<void> {
  try {
    await supabase.from('jobs').update({ status: 'processing', updated_at: new Date().toISOString() }).eq('id', jobId)

    // Step 1.3 — Vision OCR
    const { detectedText, detectedObjects } = await analyzeImage(inputImageUrl, jobId)

    await supabase.from('jobs').update({
      ocr_text: detectedText,
      detected_objects: detectedObjects,
      status: 'script_ready',
      updated_at: new Date().toISOString(),
    }).eq('id', jobId)

    // Step 2.2 — Gemini script generation wired in Phase 2
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    await supabase.from('jobs').update({
      status: 'failed',
      error_message: message,
      updated_at: new Date().toISOString(),
    }).eq('id', jobId)
  }
}
