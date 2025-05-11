import { NextResponse } from "next/server"
import { pingRedis } from "@/lib/redis"

export async function GET() {
  try {
    // Set a timeout for the Redis ping
    const timeoutPromise = new Promise<{ success: false; error: string }>((_, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("Redis ping timed out after 5 seconds"))
      }, 5000)

      // Ensure the timeout is cleared if the promise is rejected
      timeoutId.unref?.()
    })

    // Race the ping against the timeout
    const result = await Promise.race([
      pingRedis().then((isConnected) => ({
        success: isConnected,
        error: isConnected ? null : "Redis ping failed",
      })),
      timeoutPromise,
    ])

    return NextResponse.json(result)
  } catch (error) {
    console.error("Redis test error:", error)

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Unknown error occurred",
        errorType: (error as Error).name,
      },
      { status: 500 },
    )
  }
}
