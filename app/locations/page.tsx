import Link from "next/link"
import { getAllLocationSlugs } from "../lib/location-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map component with no SSR to avoid hydration issues
const LocationsMap = dynamic(() => import("../components/locations-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export const metadata = {
  title: "Our Locations | Your Company Name",
  description:
    "Discover our services across multiple locations worldwide. Find the nearest office to get professional assistance tailored to your local needs.",
}

export default function LocationsPage() {
  const locations = getAllLocationSlugs()

  // Group locations by country
  const locationsByCountry: Record<string, string[]> = {}

  locations.forEach(({ country, city }) => {
    if (!locationsByCountry[country]) {
      locationsByCountry[country] = []
    }
    locationsByCountry[country].push(city)
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Global Locations</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12">
        We provide specialized services across multiple countries. Select a location below to learn more about our
        offerings in your area.
      </p>

      {/* Add the map component here */}
      <LocationsMap />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {Object.entries(locationsByCountry).map(([country, cities]) => (
          <Card key={country} className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="capitalize">{country}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {cities.map((city) => (
                  <li key={city}>
                    <Link
                      href={`/locations/${country}/${city}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{city}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
