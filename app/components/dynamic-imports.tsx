"use client"
import { Loader2 } from "lucide-react"

// Create a client-side only dynamic import for html2canvas
export function loadHtml2Canvas() {
  return import("html2canvas")
}

// Create a loading component
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  )
}
