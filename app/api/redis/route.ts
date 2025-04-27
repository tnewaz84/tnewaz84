import { type NextRequest, NextResponse } from "next/server"
import { getCache, setCache } from "@/lib/redis"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get("action")
  const key = searchParams.get("key")

  if (!key) {
    return NextResponse.json({ success: false, error: "Key is required" }, { status: 400 })
  }

  try {
    if (action === "get") {
      const data = await getCache(key)
      return NextResponse.json({ success: true, data })
    } else {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Redis operation failed:", error)
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, key, value } = body

    if (!key) {
      return NextResponse.json({ success: false, error: "Key is required" }, { status: 400 })
    }

    if (action === "set") {
      if (value === undefined) {
        return NextResponse.json({ success: false, error: "Value is required" }, { status: 400 })
      }

      await setCache(key, value)
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Redis operation failed:", error)
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
