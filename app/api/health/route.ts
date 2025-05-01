import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { safeRedis } from "@/lib/redis-safe"

export async function GET() {
  const healthStatus = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    services: {
      supabase: { status: "unknown", error: null },
      redis: { status: "unknown", error: null },
      postgres: { status: "unknown", error: null },
      ai: { status: "unknown", error: null },
    },
    config: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasRedisUrl: !!process.env.UPSTASH_REDIS_URL,
      hasRedisToken: !!process.env.KV_REST_API_TOKEN,
      hasGroqApiKey: !!process.env.GROQ_API_KEY,
      hasPostgresUrl: !!process.env.POSTGRES_URL || !!process.env.DIRECT_POSTGRES_URL,
    },
  }

  // Check Supabase connection
  try {
    const { data, error } = await supabase.from("profiles").select("count").single()
    if (error) throw error
    healthStatus.services.supabase = { status: "ok", error: null }
  } catch (error) {
    healthStatus.services.supabase = {
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    }
  }

  // Check Redis connection - using safe client
  try {
    const pingResult = await safeRedis.ping()
    healthStatus.services.redis = {
      status: pingResult === "PONG" ? "ok" : "degraded",
      error: null,
    }
  } catch (error) {
    healthStatus.services.redis = {
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    }
  }

  // Check Postgres connection - simplified to avoid import errors
  try {
    if (process.env.POSTGRES_URL || process.env.DIRECT_POSTGRES_URL) {
      const { createClient } = await import("@vercel/postgres")
      const client = createClient()
      const result = await client.query("SELECT NOW()")
      healthStatus.services.postgres = { status: "ok", error: null }
    } else {
      healthStatus.services.postgres = {
        status: "not_configured",
        error: "Postgres URL not configured",
      }
    }
  } catch (error) {
    healthStatus.services.postgres = {
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    }
  }

  // Check AI service
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined")
    }
    healthStatus.services.ai = { status: "ok", error: null }
  } catch (error) {
    healthStatus.services.ai = {
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    }
  }

  // If any service is down, return a 503 status
  const isHealthy = Object.values(healthStatus.services).every(
    (service) => service.status === "ok" || service.status === "not_configured" || service.status === "degraded",
  )

  return NextResponse.json(healthStatus, { status: isHealthy ? 200 : 503 })
}
