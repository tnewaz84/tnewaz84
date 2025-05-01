import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if Redis URL is properly formatted
    const redisUrl = process.env.UPSTASH_REDIS_URL || ""
    const redisToken = process.env.KV_REST_API_TOKEN || ""

    // Validate Redis configuration
    if (!redisUrl || !redisToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Redis URL or token is not configured",
          message: "Redis connection failed: Missing configuration",
        },
        { status: 500 },
      )
    }

    // Check if Redis URL is in the correct format
    if (!redisUrl.startsWith("https://")) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid Redis URL format: ${redisUrl.substring(0, 10)}... (URL should start with https://)`,
          message: "Redis connection failed: Invalid URL format",
        },
        { status: 500 },
      )
    }

    // Dynamically import Redis client to avoid initialization during build
    const { safeRedis } = await import("@/lib/redis-safe")

    // Test basic connection
    const pingResult = await safeRedis.ping()

    // Test set operation
    await safeRedis.set("test-key", "Hello from Redis test!")

    // Test get operation
    const testValue = await safeRedis.get("test-key")

    return NextResponse.json({
      success: true,
      ping: pingResult,
      testValue,
      message: "Redis connection successful!",
    })
  } catch (error) {
    console.error("Redis test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        message: "Redis connection failed!",
      },
      { status: 500 },
    )
  }
}
