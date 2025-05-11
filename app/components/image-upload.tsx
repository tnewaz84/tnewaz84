"use client"

import type React from "react"

import { useState, useRef } from "react"
import { uploadImage } from "@/app/actions/upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void
  className?: string
  maxWidth?: number
  label?: string
  buttonText?: string
}

export default function ImageUpload({
  onUploadComplete,
  className = "",
  maxWidth = 400,
  label = "Upload Image",
  buttonText = "Select Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadImage(formData)

      if (result.success && result.url) {
        toast({
          title: "Upload successful",
          description: "Your image has been uploaded.",
          variant: "default",
        })

        if (onUploadComplete) {
          onUploadComplete(result.url)
        }
      } else {
        toast({
          title: "Upload failed",
          description: result.error || "There was an error uploading your image.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={className} style={{ maxWidth }}>
      <Label htmlFor="image-upload" className="block mb-2">
        {label}
      </Label>

      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-auto" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={clearPreview}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full h-32 border-dashed flex flex-col gap-2"
          disabled={isUploading}
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          ) : (
            <>
              <ImageIcon className="h-6 w-6" />
              <span>{buttonText}</span>
            </>
          )}
        </Button>
      )}

      {isUploading && <p className="text-sm text-center mt-2">Uploading...</p>}
    </div>
  )
}
