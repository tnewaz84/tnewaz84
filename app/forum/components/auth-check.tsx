"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      console.log("User not authenticated, redirecting to login")
      router.push("/forum/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
