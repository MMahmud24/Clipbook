import { describe, it, expect } from 'vitest'
import { ScriptSchema } from '../schemas/scriptSchema.js'

const validScript = {
    title: "Connect headphones via Bluetooth",
    product_category: "consumer_electronics",
    duration_seconds: 16,
    narration: "Hold the power button for three seconds until the LED flashes blue.",
    scenes: [
        {
            scene_id: 1,
            duration_seconds: 8,
            description: "Show headphones with power button highlighted",
            animation_type: "highlight_pulse",
            target_object: "power_button",
            label_text: "Hold for 3 seconds",
            background_asset: "headphones_svg"
        },
        {
            scene_id: 2,
            duration_seconds: 8,
            description: "Show pairing confirmation",
            animation_type: "checkmark",
            target_object: "led_indicator",
            label_text: "Paired!",
            background_asset: "headphones_svg"
        }
    ]
}

describe('ScriptSchema', () => {
    it('valid script passes', () => {
        const result = ScriptSchema.safeParse(validScript)
        expect(result.success).toBe(true)
    })

    it('duration sum mismatch fails', () => {
        const result = ScriptSchema.safeParse({ ...validScript, duration_seconds: 20 })
        expect(result.success).toBe(false)
    })

    it('narration too short fails', () => {
        const result = ScriptSchema.safeParse({ ...validScript, narration: "Too short." })
        expect(result.success).toBe(false)
    })

    it('invalid animation_type fails', () => {
        const invalid = {
            ...validScript,
            scenes: [{ ...validScript.scenes[0], animation_type: "explode" }]
        }
        const result = ScriptSchema.safeParse(invalid)
        expect(result.success).toBe(false)
    })

    it('empty scenes array fails', () => {
        const result = ScriptSchema.safeParse({ ...validScript, scenes: [] })
        expect(result.success).toBe(false)
    })
})
