"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ErrorBoundary({ children, fallback = <DefaultErrorFallback /> }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught in error boundary:", error)
      setError(error.error || new Error("Unknown error occurred"))
      setHasError(true)

      // Report to monitoring service if available
      // reportError(error)
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return typeof fallback === "function" ? fallback({ error, reset: () => setHasError(false) }) : fallback
  }

  return <>{children}</>
}

function DefaultErrorFallback({
  error,
  reset,
}: {
  error?: Error | null
  reset?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-800 p-4 rounded-md mb-6 max-w-md overflow-auto">
          <p className="font-mono text-sm">{error.message}</p>
        </div>
      )}
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        {reset && (
          <Button variant="outline" onClick={reset}>
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}
