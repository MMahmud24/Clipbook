import { GoogleGenerativeAI } from "@google/generative-ai"
import { SCRIPT_SYSTEM_PROMPT } from "../prompts/scriptPrompt.js"
import { ScriptSchema } from "../schemas/scriptSchema.js"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateScript(ocrText, detectedObjects, manualContext) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: SCRIPT_SYSTEM_PROMPT,
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1500,
            responseMimeType: 'application/json',
        },
    })

    const userMessage = `Product: ${manualContext || 'Unknown'}
    
    Detected text:
    ${ocrText}

    Detected objects:
    ${detectedObjects.map(obj => `- ${obj}`).join('\n')}`

    const response = await model.generateContent(userMessage)
    const text = response.response.text()

    const parsed = JSON.parse(text)
    const result = ScriptSchema.safeParse(parsed)

    if (!result.success) {
        const retryMessage = userMessage + `\n\nYour previous response failed validation with this error: ${result.error.message}\nFix it and respond with valid JSON only.`
        const retryResponse = await model.generateContent(retryMessage)
        const retryText = retryResponse.response.text()

        const retryParsed = JSON.parse(retryText)
        const retryResult = ScriptSchema.safeParse(retryParsed)

        if (!retryResult.success) {
            throw new Error(`Script generation failed after retry: ${retryResult.error.message}`)
        }

        return retryResult.data
    }

    return result.data
}

