import { NextResponse } from "next/server"
import { put, del } from "@vercel/blob"

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      return NextResponse.json({
        status: "error",
        message: "Missing Blob token",
        details: "BLOB_READ_WRITE_TOKEN not found",
      })
    }

    // Test upload and delete
    const testContent = "test-content-" + Date.now()
    const testFilename = `test-${Date.now()}.txt`

    const blob = await put(testFilename, testContent, {
      access: "public",
      token,
    })

    // Clean up test file
    await del(blob.url, { token })

    return NextResponse.json({
      status: "healthy",
      message: "Blob storage working correctly",
      details: "Upload and delete operations successful",
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Blob storage check failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
