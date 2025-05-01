import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Collect system information
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memoryUsage: process.memoryUsage(),
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
        VERCEL_REGION: process.env.VERCEL_REGION,
      },
      envVarsPresent: {
        // Database connections
        NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,

        // Redis
        UPSTASH_REDIS_URL: !!process.env.UPSTASH_REDIS_URL,
        KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,

        // Postgres
        POSTGRES_URL: !!process.env.POSTGRES_URL,
        DIRECT_POSTGRES_URL: !!process.env.DIRECT_POSTGRES_URL,

        // AI
        GROQ_API_KEY: !!process.env.GROQ_API_KEY,

        // Site
        NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      status: "ok",
      message: "Debug information collected successfully",
      data: systemInfo,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to collect debug information",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
