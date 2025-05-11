import type { Metadata } from "next"
import { listBlobFiles } from "@/lib/blob-storage"
import MediaLibrary from "./media-library"

export const metadata: Metadata = {
  title: "Media Library | Admin Dashboard",
  description: "Manage your media files and uploads",
}

export default async function MediaPage() {
  // Fetch images from Vercel Blob
  const imageUrls = await listBlobFiles("images")

  // Fetch documents from Vercel Blob
  const documentUrls = await listBlobFiles("documents")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Media Library</h1>
      <MediaLibrary initialImages={imageUrls} initialDocuments={documentUrls} />
    </div>
  )
}
