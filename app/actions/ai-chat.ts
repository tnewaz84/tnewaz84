"use server"

import { generateChatCompletion } from "@/lib/groq"
import { getCache, setCache } from "@/lib/redis"
import { revalidatePath } from "next/cache"

// Cache TTL in seconds (24 hours)
const CACHE_TTL = 86400

// Create a cache key from the user's message
function createCacheKey(message: string): string {
  // Normalize the message to improve cache hits
  const normalizedMessage = message.trim().toLowerCase()
  return `ai-chat:${normalizedMessage}`
}

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

// Function to send a message and get a response (for client components)
export async function sendMessage(message: string) {
  if (!message || !message.trim()) {
    return { success: false, error: "Message cannot be empty" }
  }

  try {
    // Check if we have a cached response
    const cacheKey = createCacheKey(message)
    let cachedResponse = null

    try {
      cachedResponse = await getCache<{ content: string }>(cacheKey)
    } catch (cacheError) {
      console.warn("Cache retrieval error:", cacheError)
      // Continue without cache
    }

    if (cachedResponse) {
      console.log("Cache hit for message:", message)
      return {
        success: true,
        content: cachedResponse.content,
        cached: true,
      }
    }

    // No cache hit, generate a new response
    console.log("Cache miss for message:", message)

    // Check if GROQ API key is available
    if (!process.env.GROQ_API_KEY) {
      return {
        success: true, // Return success but with a fallback message
        content:
          "I'm currently in maintenance mode. Please email tnewaz84@gmail.com or call +1-201-292-4983 for immediate assistance.",
        cached: false,
      }
    }

    const response = await generateChatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      {
        temperature: 0.7,
        maxTokens: 500,
      },
    )

    if (response.success && response.content) {
      // Cache the successful response
      try {
        await setCache(cacheKey, { content: response.content }, CACHE_TTL)
      } catch (cacheError) {
        console.warn("Cache storage error:", cacheError)
        // Continue without caching
      }

      return {
        success: true,
        content: response.content,
        cached: false,
      }
    } else {
      return {
        success: true, // Return success but with a fallback message
        content:
          "I'm having trouble connecting to my knowledge base right now. Please email tnewaz84@gmail.com or call +1-201-292-4983 for immediate assistance.",
        cached: false,
      }
    }
  } catch (error) {
    console.error("Error in sendMessage:", error)
    return {
      success: true, // Return success but with a fallback message
      content:
        "I'm having technical difficulties right now. Please email tnewaz84@gmail.com or call +1-201-292-4983 for immediate assistance.",
      cached: false,
    }
  }
}

// Function to clear all AI chat caches
export async function clearAIChatCache() {
  try {
    // Get all keys with the ai-chat prefix
    const keys = await getCache<string[]>("ai-chat:*")

    // If there are no keys, return success
    if (!keys || keys.length === 0) {
      return { success: true, message: "No cache entries to clear" }
    }

    // Delete each key
    for (const key of keys) {
      await setCache(key, null, 1) // Set to null with 1 second expiry
    }

    revalidatePath("/")
    return { success: true, message: `Cleared ${keys.length} cache entries` }
  } catch (error) {
    console.error("Error clearing AI chat cache:", error)
    return { success: false, error: (error as Error).message }
  }
}
