import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export async function GET() {
  try {
    // Set a test value
    const testKey = "redis-test"
    const testValue = `test-${Date.now()}`

    await redis.set(testKey, testValue, { ex: 60 }) // Expire in 60 seconds

    // Get the value back
    const retrievedValue = await redis.get(testKey)

    // Check if the values match
    const success = testValue === retrievedValue

    return NextResponse.json({
      success,
      message: success ? "Redis connection successful" : "Redis test failed: values do not match",
      testValue,
      retrievedValue,
    })
  } catch (error) {
    console.error("Redis test error:", error)

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
