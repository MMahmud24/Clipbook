import { describe, it, expect } from 'vitest'
import { ScriptSchema } from '../schemas/scriptSchema'

const validScript = {
  title: 'Connect headphones via Bluetooth',
  product_category: 'consumer_electronics',
  duration_seconds: 16,
  narration: 'Hold the power button for three seconds until the LED flashes blue.',
  scenes: [
    {
      scene_id: 1,
      duration_seconds: 8,
      description: 'Show headphones with power button highlighted',
      animation_type: 'highlight_pulse',
      target_object: 'power_button',
      label_text: 'Hold for 3 seconds',
      background_asset: 'headphones_svg',
    },
    {
      scene_id: 2,
      duration_seconds: 8,
      description: 'Show checkmark when complete',
      animation_type: 'checkmark',
      target_object: 'led_indicator',
      label_text: 'Pairing complete',
      background_asset: 'headphones_svg',
    },
  ],
}

describe('ScriptSchema', () => {
  it('passes with a valid full script', () => {
    const result = ScriptSchema.safeParse(validScript)
    expect(result.success).toBe(true)
  })

  it('fails when narration is missing', () => {
    const result = ScriptSchema.safeParse({ ...validScript, narration: undefined })
    expect(result.success).toBe(false)
  })

  it('fails when narration is too short', () => {
    const result = ScriptSchema.safeParse({ ...validScript, narration: 'Too short' })
    expect(result.success).toBe(false)
  })

  it('fails when scene durations do not sum to duration_seconds', () => {
    const result = ScriptSchema.safeParse({ ...validScript, duration_seconds: 20 })
    expect(result.success).toBe(false)
  })

  it('fails with an invalid animation_type', () => {
    const result = ScriptSchema.safeParse({
      ...validScript,
      scenes: [{ ...validScript.scenes[0], animation_type: 'explode' }, validScript.scenes[1]],
    })
    expect(result.success).toBe(false)
  })

  it('fails when a scene duration is below 3', () => {
    const result = ScriptSchema.safeParse({
      ...validScript,
      duration_seconds: 10,
      scenes: [{ ...validScript.scenes[0], duration_seconds: 2 }, { ...validScript.scenes[1], duration_seconds: 8 }],
    })
    expect(result.success).toBe(false)
  })

  it('fails with an empty scenes array', () => {
    const result = ScriptSchema.safeParse({ ...validScript, scenes: [] })
    expect(result.success).toBe(false)
  })

  it('fails when label_text exceeds 40 characters', () => {
    const result = ScriptSchema.safeParse({
      ...validScript,
      scenes: [{ ...validScript.scenes[0], label_text: 'A'.repeat(41) }, validScript.scenes[1]],
    })
    expect(result.success).toBe(false)
  })

  it('fails when title exceeds 80 characters', () => {
    const result = ScriptSchema.safeParse({ ...validScript, title: 'A'.repeat(81) })
    expect(result.success).toBe(false)
  })
})
