"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RedisStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    async function checkRedisStatus() {
      try {
        const controller = new AbortController()
        timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

        const response = await fetch("/api/redis-test", {
          signal: controller.signal,
        })

        if (!isMounted) return

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setStatus("connected")
          setMessage("Redis is connected")
        } else {
          setStatus("error")
          setMessage(`Redis connection failed: ${data.error}`)
        }
      } catch (error) {
        if (!isMounted) return

        console.error("Redis status check failed:", error)
        setStatus("error")
        setError(error as Error)

        if ((error as Error).name === "AbortError") {
          setMessage("Connection timed out")
        } else {
          setMessage(`Failed to check Redis status: ${(error as Error).message}`)
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    checkRedisStatus()

    return () => {
      isMounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // Fallback for development environments
  if (process.env.NODE_ENV === "development" && status === "error") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="cursor-help">
              Redis (Dev Mode)
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redis connection not available in development mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={status === "connected" ? "default" : status === "loading" ? "outline" : "destructive"}
            className="cursor-help"
          >
            Redis {status === "loading" ? "Checking..." : status === "connected" ? "Connected" : "Error"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
          {error && status === "error" && (
            <p className="text-xs text-red-400 mt-1">
              {error.name}: {error.message}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
