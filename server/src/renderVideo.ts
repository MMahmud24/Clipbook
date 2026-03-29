import path from 'path'
import fs from 'fs'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { uploadToR2 } from './lib/r2'

// Cache the bundle path so we only bundle once per server process
let cachedBundlePath: string | null = null

const RENDERER_ENTRY = path.resolve(
  __dirname,
  '../../renderer/src/index.ts'
)

const TEMP_DIR = '/tmp/renders'

async function getBundlePath(): Promise<string> {
  // Re-bundle if cache is empty or the cached path no longer exists on disk
  if (!cachedBundlePath || !fs.existsSync(cachedBundlePath)) {
    console.log('[renderVideo] Bundling Remotion composition...')
    cachedBundlePath = await bundle({
      entryPoint: RENDERER_ENTRY,
      webpackOverride: (config) => config,
    })
    console.log('[renderVideo] Bundle complete:', cachedBundlePath)
  }
  return cachedBundlePath
}

export async function renderVideo(
  jobId: string,
  scriptJson: Record<string, unknown>
): Promise<{ outputVideoUrl: string; renderDurationMs: number }> {
  const startTime = Date.now()

  // Ensure temp directory exists
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true })
  }

  const outputPath = path.join(TEMP_DIR, `${jobId}.mp4`)
  const bundlePath = await getBundlePath()

  // Resolve the composition — calculateMetadata sets durationInFrames from script
  const composition = await selectComposition({
    serveUrl: bundlePath,
    id: 'VideoManual',
    inputProps: { script: scriptJson },
  })

  console.log(`[renderVideo] Rendering job ${jobId} — ${composition.durationInFrames} frames`)

  await renderMedia({
    composition,
    serveUrl: bundlePath,
    codec: 'h264',
    outputLocation: outputPath,
    inputProps: { script: scriptJson },
  })

  console.log(`[renderVideo] Render complete for job ${jobId}`)

  // Upload MP4 to R2
  const buffer = fs.readFileSync(outputPath)
  const r2Key = `jobs/${jobId}/output.mp4`
  const outputVideoUrl = await uploadToR2(r2Key, buffer, 'video/mp4')

  // Delete temp file immediately to avoid filling disk
  fs.unlinkSync(outputPath)

  const renderDurationMs = Date.now() - startTime
  console.log(`[renderVideo] Uploaded to R2. Duration: ${renderDurationMs}ms`)

  return { outputVideoUrl, renderDurationMs }
}
