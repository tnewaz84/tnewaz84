import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if Postgres environment variables are available
    const hasPostgresUrl = !!process.env.POSTGRES_URL || !!process.env.POSTGRES_URL_NON_POOLING

    if (!hasPostgresUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Postgres connection not configured",
          error: "Missing POSTGRES_URL or POSTGRES_URL_NON_POOLING environment variable",
        },
        { status: 503 },
      )
    }

    // Only import and use the postgres client if we have the environment variables
    const { testDatabaseConnection } = await import("@/lib/postgres")
    const result = await testDatabaseConnection()

    return NextResponse.json(result)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error in API route",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
