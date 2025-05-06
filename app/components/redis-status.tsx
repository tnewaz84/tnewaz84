"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RedisStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function checkRedisStatus() {
      try {
        const response = await fetch("/api/redis-test")
        const data = await response.json()

        if (data.success) {
          setStatus("connected")
          setMessage("Redis is connected")
        } else {
          setStatus("error")
          setMessage(`Redis connection failed: ${data.error}`)
        }
      } catch (error) {
        setStatus("error")
        setMessage(`Failed to check Redis status: ${(error as Error).message}`)
      }
    }

    checkRedisStatus()
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={status === "connected" ? "default" : "destructive"} className="cursor-help">
            Redis {status === "loading" ? "Checking..." : status === "connected" ? "Connected" : "Error"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
