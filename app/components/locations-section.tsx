import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the client component to avoid SSR issues with the map
const LocationsSectionClient = dynamic(() => import("./locations-section-client"), {
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export default function LocationsSection() {
  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Dominating Search Results Globally
        </h2>
        <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto mb-12">
          Our SEO expertise has helped businesses rank #1 in multiple locations around the world. See where we've made
          an impact.
        </p>

        <LocationsSectionClient />

        <div className="mt-10 text-center">
          <Link href="/locations">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <MapPin className="mr-2 h-5 w-5" /> Explore All Locations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
