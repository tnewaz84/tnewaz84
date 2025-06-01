"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapComponentProps {
  locations: any[]
  center?: [number, number]
  zoom?: number
}

export default function MapComponent({ locations, center = [20, 0], zoom = 2 }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Initialize map only if it hasn't been initialized yet
    if (!mapInstanceRef.current && mapRef.current) {
      // Create map instance
      const map = L.map(mapRef.current).setView(center, zoom)
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
      locations.forEach((location) => {
        if (location.coordinates) {
          L.marker([location.coordinates.lat, location.coordinates.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(
              `<b>${location.city}</b><br>
               ${location.niche} Services<br>
               <a href="/locations/${location.country}/${location.slug}">View Details</a>`,
            )
        }
      })
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [locations, center, zoom])

  return <div ref={mapRef} className="w-full h-[500px] rounded-lg overflow-hidden" />
}
