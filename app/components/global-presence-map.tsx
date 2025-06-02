"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'
// import { locationData } from "../lib/location-data"

// Create an array of location data for the map
const mapLocations = [
  { city: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, clients: 45, rankingImprovement: 78 },
  { city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, clients: 32, rankingImprovement: 65 },
  { city: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792, clients: 28, rankingImprovement: 82 },
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, clients: 53, rankingImprovement: 71 },
  { city: "New York", country: "USA", lat: 40.7128, lng: -74.006, clients: 67, rankingImprovement: 85 },
]

// Location coordinates mapping
const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  dhaka: { lat: 23.8103, lng: 90.4125 },
  jakarta: { lat: -6.2088, lng: 106.8456 },
  lagos: { lat: 6.5244, lng: 3.3792 },
  sydney: { lat: -33.8688, lng: 151.2093 },
  "new-york": { lat: 40.7128, lng: -74.006 },
}

export default function GlobalPresenceMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Initialize map only if it hasn't been initialized yet
    if (!mapInstanceRef.current && mapRef.current) {
      // Create map instance
      const map = L.map(mapRef.current).setView([20, 0], 2)
      mapInstanceRef.current = map

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Custom icon
      const customIcon = L.icon({
        iconUrl: "/map-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      })

      // Add markers for each location
      mapLocations.forEach((location) => {
        L.marker([location.lat, location.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `<b>${location.city}, ${location.country}</b><br>
             ${location.clients} clients<br>
             ${location.rankingImprovement}% avg. ranking improvement`,
          )
      })
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-bold mb-4">Our Global Presence</h2>

      <div className="rounded-lg overflow-hidden border-2 border-primary/20 h-[400px]">
        <div ref={mapRef} className="w-full h-[400px] rounded-lg overflow-hidden" />
      </div>

      <div className="mt-4 flex justify-end">
        <a href="/locations">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> View All Locations
          </Button>
        </a>
      </div>
    </div>
  )
}
