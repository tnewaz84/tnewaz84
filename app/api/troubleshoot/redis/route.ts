import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

export async function GET() {
  try {
    const redisUrl = process.env.UPSTASH_REDIS_URL
    const redisToken = process.env.KV_REST_API_TOKEN

    if (!redisUrl || !redisToken) {
      return NextResponse.json({
        status: "error",
        message: "Missing Redis credentials",
        details: "UPSTASH_REDIS_URL or KV_REST_API_TOKEN not found",
      })
    }

    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: redisToken,
    })

    // Test connection
    const testKey = `health-check-${Date.now()}`
    await redis.set(testKey, "test", { ex: 10 })
    const result = await redis.get(testKey)
    await redis.del(testKey)

    if (result !== "test") {
      return NextResponse.json({
        status: "error",
        message: "Redis read/write test failed",
        details: "Could not verify data integrity",
      })
    }

    return NextResponse.json({
      status: "healthy",
      message: "Redis connection successful",
      details: "Read/write operations working",
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Redis check failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
