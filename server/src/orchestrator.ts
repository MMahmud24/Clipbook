import { supabase } from './lib/supabase'
import { analyzeImage } from './services/visionService'
import { generateScript } from './services/scriptService'

export async function runJob(jobId: string, inputImageUrl: string, manualContext: string = ''): Promise<void> {
  try {
    await supabase.from('jobs').update({ status: 'processing', updated_at: new Date().toISOString() }).eq('id', jobId)

    // Phase 1 — Vision OCR
    const { detectedText, detectedObjects } = await analyzeImage(inputImageUrl, jobId)

    await supabase.from('jobs').update({
      ocr_text: detectedText,
      detected_objects: detectedObjects,
      status: 'script_ready',
      updated_at: new Date().toISOString(),
    }).eq('id', jobId)

    // Phase 2 — Gemini script generation
    const script = await generateScript(detectedText, detectedObjects, manualContext, jobId)

    await supabase.from('jobs').update({
      script_json: script,
      status: 'script_only_complete',
      updated_at: new Date().toISOString(),
    }).eq('id', jobId)

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    await supabase.from('jobs').update({
      status: 'failed',
      error_message: message,
      updated_at: new Date().toISOString(),
    }).eq('id', jobId)
  }
}
