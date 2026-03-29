import { GoogleGenerativeAI } from "@google/generative-ai"
import { SCRIPT_SYSTEM_PROMPT } from "../prompts/scriptPrompt"
import { ScriptSchema, Script } from "../schemas/scriptSchema"
import { supabase } from "../lib/supabase"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export class ScriptGenerationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ScriptGenerationError'
  }
}

export async function generateScript(ocrText: string, detectedObjects: string[], manualContext: string, jobId: string): Promise<Script> {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: SCRIPT_SYSTEM_PROMPT,
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json',
        },
    })

    const userMessage = `Product: ${manualContext || 'Unknown'}

    Detected text:
    ${ocrText}

    Detected objects:
    ${detectedObjects.map(obj => `- ${obj}`).join('\n')}`

    const start = Date.now()
    let retryCount = 0
    let success = true

    try {
        const response = await model.generateContent(userMessage)
        const text = response.response.text()

        // Attempt to parse — if JSON is truncated, retry with instruction to keep it short
        let parsed: unknown
        try {
            parsed = JSON.parse(text)
        } catch {
            retryCount = 1
            const retryMessage = userMessage + `\n\nYour previous response was truncated and produced invalid JSON. Respond with valid JSON only. Keep scenes to 4 or fewer and keep all string values short.`
            const retryResponse = await model.generateContent(retryMessage)
            const retryText = retryResponse.response.text()
            try {
                parsed = JSON.parse(retryText)
            } catch {
                success = false
                throw new ScriptGenerationError('Script generation failed: response was truncated on both attempts')
            }
        }

        const result = ScriptSchema.safeParse(parsed)

        if (!result.success) {
            if (retryCount === 0) {
                retryCount = 1
                const retryMessage = userMessage + `\n\nYour previous response failed validation with this error: ${result.error.message}\nFix it and respond with valid JSON only.`
                const retryResponse = await model.generateContent(retryMessage)
                const retryText = retryResponse.response.text()
                const retryParsed = JSON.parse(retryText)
                const retryResult = ScriptSchema.safeParse(retryParsed)

                if (!retryResult.success) {
                    success = false
                    throw new ScriptGenerationError(`Script generation failed after retry: ${retryResult.error.message}`)
                }

                return retryResult.data
            }
            success = false
            throw new ScriptGenerationError(`Script generation failed after retry: ${result.error.message}`)
        }

        return result.data
    } finally {
        await supabase.from('api_usage_log').insert({
            job_id: jobId,
            service: 'gemini',
            duration_ms: Date.now() - start,
            success,
            retry_count: retryCount,
        })
    }
}
