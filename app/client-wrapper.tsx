"use client"

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the HomePage component with ssr: false
const DynamicHomePage = dynamic(() => import("./home-page"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black"></div>,
})

export default function ClientWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="min-h-screen bg-black"></div>
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
      <DynamicHomePage />
    </Suspense>
  )
}
