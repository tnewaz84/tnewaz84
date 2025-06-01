"use client"

import dynamic from "next/dynamic"

// Dynamically import the map component with no SSR to avoid hydration issues
const GlobalPresenceMap = dynamic(() => import("./global-presence-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export default function LocationsSectionClient() {
  return <GlobalPresenceMap />
}
