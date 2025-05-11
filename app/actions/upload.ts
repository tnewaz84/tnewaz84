"use server"

import { uploadToBlob, deleteFromBlob } from "@/lib/blob-storage"
import { revalidatePath } from "next/cache"

/**
 * Uploads an image to Vercel Blob Storage
 */
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." }
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File too large. Maximum size is 5MB." }
    }

    // Upload to Vercel Blob
    const url = await uploadToBlob(file, "images")

    // Revalidate paths that might display this image
    revalidatePath("/")
    revalidatePath("/blog")

    return { success: true, url }
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

/**
 * Deletes an image from Vercel Blob Storage
 */
export async function deleteImage(formData: FormData) {
  try {
    const url = formData.get("url") as string

    if (!url) {
      return { success: false, error: "No URL provided" }
    }

    // Delete from Vercel Blob
    const success = await deleteFromBlob(url)

    // Revalidate paths that might display this image
    revalidatePath("/")
    revalidatePath("/blog")

    return { success }
  } catch (error) {
    console.error("Error in deleteImage:", error)
    return { success: false, error: "Failed to delete image" }
  }
}

/**
 * Uploads a document to Vercel Blob Storage
 */
export async function uploadDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Only PDF and Word documents are allowed." }
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "File too large. Maximum size is 10MB." }
    }

    // Upload to Vercel Blob
    const url = await uploadToBlob(file, "documents")

    return { success: true, url }
  } catch (error) {
    console.error("Error in uploadDocument:", error)
    return { success: false, error: "Failed to upload document" }
  }
}
