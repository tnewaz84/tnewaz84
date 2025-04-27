import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export async function GET() {
  try {
    // Test basic connection
    const pingResult = await redis.ping()

    // Test set operation
    await redis.set("test-key", "Hello from Redis test!")

    // Test get operation
    const testValue = await redis.get("test-key")

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
        error: (error as Error).message,
        message: "Redis connection failed!",
      },
      { status: 500 },
    )
  }
}
