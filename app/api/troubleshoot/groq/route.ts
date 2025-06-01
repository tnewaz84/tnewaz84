import { NextResponse } from "next/server"
import Groq from "groq-sdk"

export async function GET() {
  try {
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        status: "error",
        message: "Missing Groq API key",
        details: "GROQ_API_KEY not found",
      })
    }

    const groq = new Groq({ apiKey })

    // Test with a simple completion
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: 'Say "test" if you can hear me.' }],
      model: "llama3-8b-8192",
      max_tokens: 10,
    })

    const response = completion.choices[0]?.message?.content

    if (!response || !response.toLowerCase().includes("test")) {
      return NextResponse.json({
        status: "warning",
        message: "Groq API responding but unexpected output",
        details: `Response: ${response}`,
      })
    }

    return NextResponse.json({
      status: "healthy",
      message: "Groq API working correctly",
      details: "Successfully generated response",
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Groq API check failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
