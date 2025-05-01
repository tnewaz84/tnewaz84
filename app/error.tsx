"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md mb-8 max-w-md overflow-auto">
        <p className="font-mono text-sm text-red-400">{error.message}</p>
        {error.digest && <p className="font-mono text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>}
      </div>
      <div className="flex gap-4">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}
