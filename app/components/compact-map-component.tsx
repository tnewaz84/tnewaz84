"use client"

import { useEffect, useState } from "react"

// Default center
const defaultCenter = {
  lat: 20,
  lng: 0,
}

interface CompactMapComponentProps {
  locations: any[]
}

export default function CompactMapComponent({ locations }: CompactMapComponentProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Dynamically import Leaflet only on client-side
    const loadMap = async () => {
      try {
        // Import Leaflet and related modules
        const L = (await import("leaflet")).default
        await import("leaflet/dist/leaflet.css")

        // Create custom icon
        const customIcon = new L.Icon({
          iconUrl: "/map-marker.png",
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -24],
        })

        // Make sure the map container exists
        const mapContainer = document.getElementById("compact-map")
        if (!mapContainer) return

        // Initialize map
        const map = L.map("compact-map").setView([defaultCenter.lat, defaultCenter.lng], 2)

        // Add tile layer
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }).addTo(map)

        // Add markers for each location
        locations.forEach((location) => {
          const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
            icon: customIcon,
          }).addTo(map)

          // Create popup content
          const popupContent = document.createElement("div")
          popupContent.innerHTML = `
            <div class="p-2 max-w-xs">
              <h3 class="font-bold">${location.city}</h3>
              <p class="text-sm mb-2">${location.niche} Services</p>
              <a 
                href="/locations/${location.country}/${location.slug}"
                class="text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                View Details
              </a>
            </div>
          `

          marker.bindPopup(popupContent)
        })

        setMapLoaded(true)
      } catch (error) {
        console.error("Error loading map:", error)
      }
    }

    loadMap()

    // Cleanup function
    return () => {
      const mapContainer = document.getElementById("compact-map")
      if (mapContainer) {
        mapContainer.innerHTML = ""
      }
    }
  }, [locations])

  return <div id="compact-map" style={{ height: "100%", width: "100%" }}></div>
}
