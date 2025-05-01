import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/postgres"

export async function GET() {
  try {
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
