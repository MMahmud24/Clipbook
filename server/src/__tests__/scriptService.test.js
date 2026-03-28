import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockGenerateContent = vi.fn()

vi.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
        getGenerativeModel: vi.fn().mockReturnValue({
            generateContent: mockGenerateContent
        })
    }))
}))

import { generateScript } from '../services/scriptService.js'

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

const invalidScript = {
    ...validScript,
    scenes: [{ ...validScript.scenes[0], animation_type: "explode" }]
}

beforeEach(() => {
    mockGenerateContent.mockReset()
})

describe('generateScript', () => {
    it('calls Gemini with the system prompt', async () => {
        mockGenerateContent.mockResolvedValueOnce({
            response: { text: () => JSON.stringify(validScript) }
        })

        await generateScript('some ocr text', ['headphones'], 'headphones')

        expect(mockGenerateContent).toHaveBeenCalledWith(
            expect.stringContaining('headphones')
        )
    })

    it('retries once on validation failure', async () => {
        mockGenerateContent
            .mockResolvedValueOnce({
                response: { text: () => JSON.stringify(invalidScript) }
            })
            .mockResolvedValueOnce({
                response: { text: () => JSON.stringify(validScript) }
            })

        await generateScript('some ocr text', ['headphones'], 'headphones')

        expect(mockGenerateContent).toHaveBeenCalledTimes(2)
    })

    it('throws after two validation failures', async () => {
        mockGenerateContent
            .mockResolvedValueOnce({
                response: { text: () => JSON.stringify(invalidScript) }
            })
            .mockResolvedValueOnce({
                response: { text: () => JSON.stringify(invalidScript) }
            })

        await expect(
            generateScript('some ocr text', ['headphones'], 'headphones')
        ).rejects.toThrow('Script generation failed after retry')
    })
})
