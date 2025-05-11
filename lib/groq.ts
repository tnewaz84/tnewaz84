"use server"

import { Groq } from "groq-sdk"

// Message type for Groq
export type GroqMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

// Initialize Groq client with error handling
let groqClient: Groq | null = null

export const getGroqClient = () => {
  if (groqClient) return groqClient

  try {
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      console.warn("GROQ API key is missing. Using mock client.")
      return createMockGroqClient()
    }

    groqClient = new Groq({ apiKey })
    return groqClient
  } catch (error) {
    console.error("Failed to initialize Groq client:", error)
    return createMockGroqClient()
  }
}

// Create a mock Groq client for development or when Groq is unavailable
function createMockGroqClient() {
  return {
    chat: {
      completions: {
        create: async () => {
          return {
            choices: [
              {
                message: {
                  content: "This is a mock response from the Groq AI service. The actual service is not available.",
                },
              },
            ],
          }
        },
      },
    },
  } as unknown as Groq
}

// Generate chat completion with Groq
export async function generateChatCompletion(
  messages: GroqMessage[],
  options: {
    temperature?: number
    maxTokens?: number
    model?: string
  } = {},
) {
  try {
    const { temperature = 0.7, maxTokens = 1000, model = "llama3-70b-8192" } = options

    // Check if Groq API key is available
    if (!process.env.GROQ_API_KEY) {
      return {
        success: false,
        error: "GROQ API key is not configured.",
      }
    }

    const client = getGroqClient()

    const response = await client.chat.completions.create({
      messages,
      model,
      temperature,
      max_tokens: maxTokens,
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      return {
        success: false,
        error: "No content in response",
      }
    }

    return {
      success: true,
      content,
    }
  } catch (error) {
    console.error("Error generating chat completion:", error)

    return {
      success: false,
      error: (error as Error).message,
    }
  }
}
