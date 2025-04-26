"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Linkedin, FileText } from "lucide-react"

export default function BlogPostPage({ slug }: { slug: string }) {
  // Determine if this is a LinkedIn post based on the slug
  const isLinkedIn = slug.includes("linkedin")
  const redirectUrl = isLinkedIn
    ? "https://www.linkedin.com/in/tanvir-newaz/recent-activity/all/"
    : "https://medium.com/@SEOExpertgulshanBD"

  // Use a safer approach for client-side redirection
  useEffect(() => {
    // Redirect after a short delay to ensure component is mounted
    const timer = setTimeout(() => {
      window.location.href = redirectUrl
    }, 1500)

    return () => clearTimeout(timer)
  }, [redirectUrl])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl mb-4">Redirecting to {isLinkedIn ? "LinkedIn" : "Medium"}...</p>
        <p className="mb-6">If you are not redirected automatically, please click the link below:</p>
        <a
          href={redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${
            isLinkedIn ? "bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90" : "bg-white text-black hover:bg-white/90"
          }`}
        >
          {isLinkedIn ? (
            <>
              <Linkedin className="h-5 w-5" /> Go to LinkedIn
            </>
          ) : (
            <>
              <FileText className="h-5 w-5" /> Go to Medium
            </>
          )}
        </a>
        <div className="mt-6">
          <Link href="/blog" className="text-blue-400 hover:underline">
            Return to blog index
          </Link>
        </div>
      </div>
    </div>
  )
}
