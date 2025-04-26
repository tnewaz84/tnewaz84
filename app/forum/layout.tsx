import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forum | Tanvir Newaz",
  description: "Join our community forum and chat with other members",
}

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
