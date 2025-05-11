import { Groq } from "groq-sdk"

// Message type for Groq
export type GroqMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

// Initialize Groq client with error handling - only on server side
export const groq = (() => {
  // Check if we're on the server side
  if (typeof window === "undefined") {
    try {
      const apiKey = process.env.GROQ_API_KEY

      if (!apiKey) {
        console.warn("GROQ API key is missing. Using mock client.")
        return createMockGroqClient()
      }

      return new Groq({ apiKey })
    } catch (error) {
      console.error("Failed to initialize Groq client:", error)
      return createMockGroqClient()
    }
  } else {
    // Return mock client on client side
    return createMockGroqClient()
  }
})()

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

// Generate chat completion with Groq - ensure this is only called server-side
export async function generateChatCompletion(
  messages: GroqMessage[],
  options: {
    temperature?: number
    maxTokens?: number
    model?: string
  } = {},
) {
  // Check if we're on the client side
  if (typeof window !== "undefined") {
    return {
      success: false,
      error: "Groq API can only be called from server-side code.",
    }
  }

  try {
    const { temperature = 0.7, maxTokens = 1000, model = "llama3-70b-8192" } = options

    // Check if Groq API key is available
    if (!process.env.GROQ_API_KEY) {
      return {
        success: false,
        error: "GROQ API key is not configured.",
      }
    }

    const response = await groq.chat.completions.create({
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
