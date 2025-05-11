"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { deleteImage } from "@/app/actions/upload"
import ImageUpload from "@/app/components/image-upload"
import { useToast } from "@/hooks/use-toast"
import { Copy, Trash2, FileText, ImageIcon } from "lucide-react"

interface MediaLibraryProps {
  initialImages: string[]
  initialDocuments: string[]
}

export default function MediaLibrary({ initialImages, initialDocuments }: MediaLibraryProps) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [documents, setDocuments] = useState<string[]>(initialDocuments)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const handleImageUpload = (url: string) => {
    setImages((prev) => [url, ...prev])
  }

  const handleDocumentUpload = (url: string) => {
    setDocuments((prev) => [url, ...prev])
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copied",
      description: "The URL has been copied to your clipboard.",
      variant: "default",
    })
  }

  const handleDeleteMedia = async (url: string) => {
    setIsDeleting(url)

    try {
      const formData = new FormData()
      formData.append("url", url)

      const result = await deleteImage(formData)

      if (result.success) {
        // Remove from state
        if (url.includes("/images/")) {
          setImages((prev) => prev.filter((item) => item !== url))
        } else {
          setDocuments((prev) => prev.filter((item) => item !== url))
        }

        toast({
          title: "Deleted successfully",
          description: "The file has been deleted.",
          variant: "default",
        })
      } else {
        toast({
          title: "Delete failed",
          description: result.error || "There was an error deleting the file.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting the file.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <Tabs defaultValue="images" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="images" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Images
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Documents
        </TabsTrigger>
        <TabsTrigger value="upload" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload
        </TabsTrigger>
      </TabsList>

      <TabsContent value="images" className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Images ({images.length})</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((url) => (
            <Card key={url} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative group">
                  <img src={url || "/placeholder.svg"} alt="Media" className="w-full h-40 object-cover" />

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="icon" onClick={() => handleCopyUrl(url)} className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteMedia(url)}
                        disabled={isDeleting === url}
                        className="h-8 w-8"
                      >
                        {isDeleting === url ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <p className="text-xs text-gray-500 truncate">{url.split("/").pop()}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {images.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No images found. Upload some images to get started.
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Documents ({documents.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((url) => (
            <Card key={url}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium truncate">{url.split("/").pop()}</p>
                      <p className="text-xs text-gray-500 truncate">{url}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleCopyUrl(url)} className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMedia(url)}
                      disabled={isDeleting === url}
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                    >
                      {isDeleting === url ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {documents.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No documents found. Upload some documents to get started.
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="upload" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <ImageUpload
              onUploadComplete={handleImageUpload}
              label="Select an image to upload"
              buttonText="Click to upload image"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
            <ImageUpload
              onUploadComplete={handleDocumentUpload}
              label="Select a document to upload"
              buttonText="Click to upload document"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
