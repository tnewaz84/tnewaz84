import { NextResponse } from "next/server"

export async function GET() {
  const envStatus = {
    redis: {
      url: process.env.UPSTASH_REDIS_URL || "",
      token: Boolean(process.env.KV_REST_API_TOKEN),
      isUrlValid: false,
      error: null,
    },
    postgres: {
      url: Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING),
      error: null,
    },
    supabase: {
      url: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      anonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      serviceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      error: null,
    },
    ai: {
      groqKey: Boolean(process.env.GROQ_API_KEY),
      error: null,
    },
  }

  // Validate Redis URL format
  const redisUrl = process.env.UPSTASH_REDIS_URL || ""
  if (redisUrl) {
    if (redisUrl.startsWith("https://")) {
      envStatus.redis.isUrlValid = true
    } else {
      envStatus.redis.error = "Redis URL should start with https://"
    }
  } else {
    envStatus.redis.error = "Redis URL is not configured"
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    status: envStatus,
  })
}
