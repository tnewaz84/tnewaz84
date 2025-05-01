"use server"

import { groq } from "@ai-sdk/groq"
import type { Message } from "ai"

// System prompt that defines the assistant's behavior
const systemPrompt = `You are Tanvir, a helpful assistant for Tanvir Newaz's digital marketing agency.

About Tanvir Newaz's Services:
- SEO Optimization: Boost online visibility and attract qualified leads with data-driven SEO strategies
- Website Design: Custom website design solutions tailored to business needs with modern, responsive designs
- Google My Business Optimization: Improve local search visibility and customer engagement
- E-commerce Growth: Scale online stores with conversion-focused strategies and optimized user experiences
- Content Strategy: Develop engaging content that drives traffic and converts visitors
- AI-Powered Solutions: Enhance customer satisfaction with intelligent chatbots and AI tools
- Social Media Management: Build brand presence and engagement across platforms
- Email: tnewaz84@gmail.com
- Phone: +1-201-292-4983

Your job is to answer customer questions about digital marketing services, provide information about Tanvir's expertise, and help potential clients get in touch. If a customer wants a quote or consultation, offer to collect their information to send to Tanvir.

Keep your responses friendly, helpful, and concise. If you don't know something specific, suggest they call or email directly.`

export async function generateChatResponse(messages: Message[]) {
  try {
    // Prepare messages for the API
    const apiMessages = [{ role: "system", content: systemPrompt }, ...messages]

    // Call the GROQ API
    const response = await groq.chat({
      messages: apiMessages,
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 500,
    })

    // Extract the response text
    const responseText = response.choices[0]?.message?.content || ""

    if (!responseText) {
      return {
        success: false,
        text: "I'm sorry, I couldn't generate a response. Please try again later.",
      }
    }

    return {
      success: true,
      text: responseText,
    }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      success: false,
      text: "I'm having trouble connecting right now. Please try again or contact us directly at tnewaz84@gmail.com or +1-201-292-4983.",
    }
  }
}
