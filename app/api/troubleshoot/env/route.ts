import { NextResponse } from "next/server"

export async function GET() {
  const requiredVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "POSTGRES_URL",
    "UPSTASH_REDIS_URL",
    "KV_REST_API_URL",
    "KV_REST_API_TOKEN",
    "GROQ_API_KEY",
    "BLOB_READ_WRITE_TOKEN",
  ]

  const variables: Record<string, boolean> = {}

  requiredVars.forEach((varName) => {
    variables[varName] = !!process.env[varName]
  })

  return NextResponse.json({ variables })
}
