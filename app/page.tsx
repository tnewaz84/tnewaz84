import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import client components with loading fallbacks
const DynamicHomePage = dynamic(() => import("./home-page"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black"></div>,
})

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
      <DynamicHomePage />
    </Suspense>
  )
}
