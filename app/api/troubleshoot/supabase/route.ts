import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        status: "error",
        message: "Missing Supabase credentials",
        details: "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found",
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test connection with a simple query
    const { data, error } = await supabase.from("information_schema.tables").select("table_name").limit(1)

    if (error) {
      return NextResponse.json({
        status: "error",
        message: "Database connection failed",
        details: error.message,
      })
    }

    return NextResponse.json({
      status: "healthy",
      message: "Database connection successful",
      details: `Connected to ${supabaseUrl}`,
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Supabase check failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
