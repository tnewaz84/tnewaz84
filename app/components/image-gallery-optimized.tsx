"use client"

import { useState } from "react"
import EnhancedImage from "./enhanced-image"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    width: number
    height: number
  }[]
  className?: string
}

export default function ImageGalleryOptimized({ images, className = "" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105"
            onClick={() => setSelectedImage(index)}
          >
            <EnhancedImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="aspect-square object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
            />
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <EnhancedImage
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={images[selectedImage].width * 2}
              height={images[selectedImage].height * 2}
              className="max-h-[85vh] w-auto"
              objectFit="contain"
              priority
              quality={90}
            />
            <div className="bg-white p-4">
              <p className="text-lg font-medium">{images[selectedImage].alt}</p>
              <button
                className="mt-2 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
