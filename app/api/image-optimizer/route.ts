import { type NextRequest, NextResponse } from "next/server"
import sharp from "sharp"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imageUrl = searchParams.get("url")
  const width = Number.parseInt(searchParams.get("width") || "800", 10)
  const height = Number.parseInt(searchParams.get("height") || "600", 10)
  const quality = Number.parseInt(searchParams.get("quality") || "80", 10)
  const format = searchParams.get("format") || "webp"

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing image URL" }, { status: 400 })
  }

  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
    }

    const buffer = await response.arrayBuffer()

    // Process the image with sharp
    let processedImage = sharp(Buffer.from(buffer)).resize(width, height, { fit: "inside", withoutEnlargement: true })

    // Apply format
    switch (format) {
      case "webp":
        processedImage = processedImage.webp({ quality })
        break
      case "avif":
        processedImage = processedImage.avif({ quality })
        break
      case "png":
        processedImage = processedImage.png({ quality: quality / 100 })
        break
      case "jpeg":
      case "jpg":
      default:
        processedImage = processedImage.jpeg({ quality })
    }

    // Get the optimized image buffer
    const optimizedBuffer = await processedImage.toBuffer()

    // Return the optimized image
    return new NextResponse(optimizedBuffer, {
      headers: {
        "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Image optimization error:", error)
    return NextResponse.json({ error: "Failed to optimize image" }, { status: 500 })
  }
}
