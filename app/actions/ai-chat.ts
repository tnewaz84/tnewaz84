"use server"

// Simple version that doesn't rely on complex AI SDK features
export async function generateChatResponse(messages: any[]) {
  try {
    // Check if GROQ API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing")
      return {
        success: false,
        text: "AI service is not configured properly. Please contact support.",
      }
    }

    // Basic fetch implementation instead of using the SDK
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GROQ API error:", errorData)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const responseText = data.choices[0]?.message?.content || ""

    return {
      success: true,
      text: responseText,
    }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      success: false,
      text: "I'm having trouble connecting right now. Please try again later.",
    }
  }
}
