import { describe, it, expect, vi, beforeEach } from 'vitest'

const validScript = {
  title: 'Connect headphones via Bluetooth',
  product_category: 'consumer_electronics',
  duration_seconds: 10,
  narration: 'Hold the power button for three seconds until the LED flashes blue.',
  scenes: [
    {
      scene_id: 1,
      duration_seconds: 5,
      description: 'Show headphones with power button highlighted',
      animation_type: 'highlight_pulse',
      target_object: 'power_button',
      label_text: 'Hold for 3 seconds',
      background_asset: 'headphones_svg',
    },
    {
      scene_id: 2,
      duration_seconds: 5,
      description: 'Show checkmark',
      animation_type: 'checkmark',
      target_object: 'led',
      label_text: 'Done',
      background_asset: 'headphones_svg',
    },
  ],
}

const mockGenerateContent = vi.fn()

// Mock @google/generative-ai
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: function () {
    return {
      getGenerativeModel: () => ({ generateContent: mockGenerateContent }),
    }
  },
}))

// Mock supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    }),
  },
}))

describe('generateScript', () => {
  beforeEach(() => {
    mockGenerateContent.mockReset()
  })

  it('returns a valid script on first attempt', async () => {
    mockGenerateContent.mockResolvedValueOnce({
      response: { text: () => JSON.stringify(validScript) },
    })

    const { generateScript } = await import('../services/scriptService')
    const result = await generateScript('some ocr text here', ['headphones'], 'electronics', 'job-1')
    expect(result.title).toBe(validScript.title)
  })

  it('retries when first response fails Zod validation', async () => {
    mockGenerateContent
      .mockResolvedValueOnce({ response: { text: () => JSON.stringify({ invalid: true }) } })
      .mockResolvedValueOnce({ response: { text: () => JSON.stringify(validScript) } })

    const { generateScript } = await import('../services/scriptService')
    const result = await generateScript('some ocr text here', ['headphones'], 'electronics', 'job-1')
    expect(mockGenerateContent).toHaveBeenCalledTimes(2)
    expect(result.title).toBe(validScript.title)
  })

  it('throws ScriptGenerationError after two failures', async () => {
    mockGenerateContent
      .mockResolvedValueOnce({ response: { text: () => JSON.stringify({ invalid: true }) } })
      .mockResolvedValueOnce({ response: { text: () => JSON.stringify({ also_invalid: true }) } })

    const { generateScript, ScriptGenerationError } = await import('../services/scriptService')
    await expect(
      generateScript('some ocr text here', ['headphones'], 'electronics', 'job-1')
    ).rejects.toThrow(ScriptGenerationError)
  })
})
