"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface CompactMapProps {
  lat: number
  lng: number
  zoom?: number
  title?: string
}

export default function CompactMapComponent({ lat, lng, zoom = 13, title }: CompactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Initialize map only if it hasn't been initialized yet
    if (!mapInstanceRef.current && mapRef.current) {
      // Create map instance
      const map = L.map(mapRef.current).setView([lat, lng], zoom)
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

      // Add marker
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map)

      // Add popup if title is provided
      if (title) {
        marker.bindPopup(`<b>${title}</b>`).openPopup()
      }
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [lat, lng, zoom, title])

  return <div ref={mapRef} className="w-full h-[300px] rounded-lg overflow-hidden" />
}
