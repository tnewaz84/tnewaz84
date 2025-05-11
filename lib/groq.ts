import { groq } from "@ai-sdk/groq"
import type { Message } from "ai"

// Default model to use
export const DEFAULT_MODEL = "llama3-70b-8192"

// Helper function to generate chat completions
export async function generateChatCompletion(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {},
) {
  try {
    const { model = DEFAULT_MODEL, temperature = 0.7, maxTokens = 1024 } = options

    const response = await groq.chat({
      messages,
      model,
      temperature,
      max_tokens: maxTokens,
    })

    return {
      success: true,
      content: response.choices[0]?.message?.content || "",
      usage: response.usage,
    }
  } catch (error) {
    console.error("Error generating chat completion:", error)
    return {
      success: false,
      content: "",
      error: (error as Error).message,
    }
  }
}

// Function to convert AI Message type to Groq message format
export function convertToGroqMessages(messages: Message[], systemPrompt: string) {
  const groqMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role as "system" | "user" | "assistant",
      content: msg.content,
    })),
  ]

  return groqMessages
}
