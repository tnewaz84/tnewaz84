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

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export default function LocationsMap() {
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
    <div className="w-full my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Global Presence</h2>
      <p className="text-lg text-center max-w-3xl mx-auto mb-8">
        We dominate Google search results in these locations, providing top-tier services to clients worldwide.
      </p>

      <div className="rounded-lg overflow-hidden border-2 border-primary/20 h-[600px]">
        <MapComponent locations={locations} />
      </div>

      <div className="mt-6 flex justify-center">
        <Link href="/locations">
          <Button className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> View All Locations
          </Button>
        </Link>
      </div>
    </div>
  )
}
