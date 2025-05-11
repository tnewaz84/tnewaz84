import { put, list, del } from "@vercel/blob"
import { nanoid } from "nanoid"

/**
 * Uploads a file to Vercel Blob Storage
 * @param file The file to upload
 * @param folder Optional folder path to organize files
 * @returns The URL of the uploaded file
 */
export async function uploadToBlob(file: File, folder = ""): Promise<string> {
  try {
    // Generate a unique filename with original extension
    const extension = file.name.split(".").pop() || ""
    const uniqueFilename = `${nanoid()}.${extension}`

    // Create path with optional folder
    const path = folder ? `${folder}/${uniqueFilename}` : uniqueFilename

    // Upload to Vercel Blob
    const { url } = await put(path, file, {
      access: "public",
      addRandomSuffix: false, // We're already using nanoid for uniqueness
    })

    return url
  } catch (error) {
    console.error("Error uploading to Blob storage:", error)
    throw new Error("Failed to upload file to storage")
  }
}

/**
 * Lists all files in a specific folder in Blob Storage
 * @param folder The folder path to list files from
 * @returns Array of file URLs
 */
export async function listBlobFiles(folder = ""): Promise<string[]> {
  try {
    const { blobs } = await list({ prefix: folder })
    return blobs.map((blob) => blob.url)
  } catch (error) {
    console.error("Error listing Blob storage files:", error)
    return []
  }
}

/**
 * Deletes a file from Blob Storage
 * @param url The URL of the file to delete
 * @returns Boolean indicating success
 */
export async function deleteFromBlob(url: string): Promise<boolean> {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error("Error deleting from Blob storage:", error)
    return false
  }
}

/**
 * Extracts the filename from a Blob URL
 * @param url The Blob URL
 * @returns The filename
 */
export function getFilenameFromBlobUrl(url: string): string {
  const urlParts = url.split("/")
  return urlParts[urlParts.length - 1]
}

/**
 * Checks if a URL is a Vercel Blob URL
 * @param url The URL to check
 * @returns Boolean indicating if it's a Blob URL
 */
export function isBlobUrl(url: string): boolean {
  return url.includes("vercel-storage.com") || url.includes("blob.vercel-storage.com")
}
