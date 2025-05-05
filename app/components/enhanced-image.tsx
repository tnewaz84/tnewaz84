"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface EnhancedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  quality?: number
  sizes?: string
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  fill?: boolean
  loading?: "eager" | "lazy"
  onLoad?: () => void
}

export default function EnhancedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  priority = false,
  objectFit = "cover",
  quality = 75,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholder = "empty",
  blurDataURL,
  fill = false,
  loading = "lazy",
  onLoad,
}: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Generate a blur data URL for placeholder if not provided
  const defaultBlurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PC9zdmc+"

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true)
              observer.disconnect()
            }
          })
        },
        { rootMargin: "200px" },
      )

      observer.observe(imgRef.current)

      return () => {
        if (imgRef.current) {
          observer.disconnect()
        }
      }
    } else {
      setIsInView(true)
    }
  }, [priority])

  // Reset image source when src prop changes
  useEffect(() => {
    setImgSrc(src)
    setIsLoading(true)
  }, [src])

  // Handle image load and error events
  const handleImageLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  const handleImageError = () => {
    setImgSrc("/abstract-geometric-shapes.png")
    setIsLoading(false)
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: fill ? "100%" : "auto", height: fill ? "100%" : "auto" }}
    >
      {(isInView || priority) && (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          quality={quality}
          priority={priority}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
          style={{
            objectFit,
            width: fill ? "100%" : "auto",
            height: fill ? "100%" : "auto",
          }}
          fill={fill}
          loading={loading}
        />
      )}

      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 animate-pulse"
          aria-hidden="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
        </div>
      )}
    </div>
  )
}
