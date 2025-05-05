interface ImageMetadata {
  url: string
  width: number
  height: number
  alt: string
  type?: string
}

export function generateImageMetadata(images: ImageMetadata[]) {
  return images.map((image) => ({
    url: image.url,
    width: image.width,
    height: image.height,
    alt: image.alt,
    type: image.type || inferImageType(image.url),
  }))
}

function inferImageType(url: string): string {
  const extension = url.split(".").pop()?.toLowerCase()

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg"
    case "png":
      return "image/png"
    case "webp":
      return "image/webp"
    case "avif":
      return "image/avif"
    case "gif":
      return "image/gif"
    case "svg":
      return "image/svg+xml"
    default:
      return "image/jpeg"
  }
}

export function generateOpenGraphImages(images: ImageMetadata[]) {
  return images.map((image) => ({
    url: image.url,
    width: image.width,
    height: image.height,
    alt: image.alt,
    type: image.type || inferImageType(image.url),
  }))
}
