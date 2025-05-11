"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { getAllLocationSlugs, getLocationData } from "../lib/location-data"

// Location coordinates mapping
const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  dhaka: { lat: 23.8103, lng: 90.4125 },
  jakarta: { lat: -6.2088, lng: 106.8456 },
  lagos: { lat: 6.5244, lng: 3.3792 },
  sydney: { lat: -33.8688, lng: 151.2093 },
  "new-york": { lat: 40.7128, lng: -74.006 },
}

// Dynamically import the compact map component with SSR disabled
const CompactMapComponent = dynamic(() => import("./compact-map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export default function GlobalPresenceMap() {
  const [locations, setLocations] = useState<any[]>([])

  useEffect(() => {
    // Get all location data
    const locationSlugs = getAllLocationSlugs()
    const locationsData = locationSlugs
      .map(({ country, city }) => {
        const locationData = getLocationData(country, city)
        return {
          ...locationData,
          coordinates: locationCoordinates[city.toLowerCase()] || { lat: 0, lng: 0 },
        }
      })
      .filter((location) => location !== undefined)

    setLocations(locationsData)
  }, [])

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-bold mb-4">Our Global Presence</h2>

      <div className="rounded-lg overflow-hidden border-2 border-primary/20 h-[400px]">
        <CompactMapComponent locations={locations} />
      </div>

      <div className="mt-4 flex justify-end">
        <Link href="/locations">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> View All Locations
          </Button>
        </Link>
      </div>
    </div>
  )
}
