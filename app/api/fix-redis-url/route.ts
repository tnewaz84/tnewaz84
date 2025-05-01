import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const redisUrl = url.searchParams.get("url") || process.env.UPSTASH_REDIS_URL || ""

  if (!redisUrl) {
    return NextResponse.json(
      {
        success: false,
        error: "No Redis URL provided",
        message: "Please provide a Redis URL as a query parameter",
      },
      { status: 400 },
    )
  }

  // Check if it's already in the correct format
  if (redisUrl.startsWith("https://")) {
    return NextResponse.json({
      success: true,
      message: "Redis URL is already in the correct format",
      url: redisUrl,
    })
  }

  // Try to fix common Redis URL format issues
  let fixedUrl = redisUrl

  // Case 1: Command line format: redis-cli --tls -u redis://...
  if (redisUrl.includes("redis-cli") && redisUrl.includes("redis://")) {
    const match = redisUrl.match(/redis:\/\/[^@]+@[^:]+:\d+/)
    if (match) {
      const redisConnectionString = match[0]
      // Convert redis://default:password@host:port to https://host:port
      const parts = redisConnectionString.replace("redis://", "").split("@")
      if (parts.length === 2) {
        const [auth, hostPort] = parts
        const [user, pass] = auth.split(":")
        fixedUrl = `https://${hostPort}`
      }
    }
  }

  // Case 2: Standard Redis URL: redis://default:password@host:port
  else if (redisUrl.startsWith("redis://")) {
    fixedUrl = redisUrl.replace("redis://", "https://")
  }

  return NextResponse.json({
    success: true,
    originalUrl: redisUrl.substring(0, 15) + "...", // Don't expose full URL with credentials
    fixedUrl: fixedUrl.substring(0, 15) + "...",
    message: "Redis URL has been fixed. Please update your environment variable.",
    instructions: "Update your UPSTASH_REDIS_URL environment variable in Vercel with the fixed URL.",
  })
}
