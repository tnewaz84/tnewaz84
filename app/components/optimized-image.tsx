"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { isBlobUrl } from "@/lib/blob-storage"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  priority = false,
  objectFit = "cover",
  quality = 75,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  // Determine if the image is from Vercel Blob Storage
  const isBlob = isBlobUrl(imgSrc)

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: "100%", height: "auto" }}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc("/abstract-geometric-shapes.png")
          setIsLoading(false)
        }}
        className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{
          objectFit,
          width: "100%",
          height: "auto",
        }}
        // If it's a Blob URL, we don't need to specify unoptimized
        // as Vercel's Image Optimization works with Blob Storage
        unoptimized={false}
      />
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800"
          aria-hidden="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
        </div>
      )}
    </div>
  )
}
