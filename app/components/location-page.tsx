import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"
import type { Location } from "../lib/location-types"
import CompactMapComponent from "./compact-map-component"

interface LocationPageProps {
  location: Location
}

export default function LocationPage({ location }: LocationPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {location.city}, {location.country}
          </h1>
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            <p>{location.address}</p>
          </div>
          <div className="flex items-center mb-4">
            <Phone className="h-5 w-5 mr-2 text-primary" />
            <p>{location.phone}</p>
          </div>
          <div className="flex items-center mb-6">
            <Mail className="h-5 w-5 mr-2 text-primary" />
            <p>{location.email}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About Our {location.city} Office</h2>
            <p className="text-gray-700 mb-4">{location.description}</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span>Clients</span>
                <span className="font-semibold">{location.clients}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Team Members</span>
                <span className="font-semibold">{location.teamSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Ranking Improvement</span>
                <span className="font-semibold">{location.rankingImprovement}%</span>
              </div>
            </div>
          </div>

          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Contact This Office
          </Button>
        </div>

        <div>
          <div className="h-[300px] mb-6 bg-gray-200 rounded-lg overflow-hidden">
            <CompactMapComponent
              lat={location.lat}
              lng={location.lng}
              title={`${location.city}, ${location.country}`}
            />
          </div>

          <h2 className="text-xl font-semibold mb-3">Local Success Stories</h2>
          <div className="space-y-4">
            {location.successStories?.map((story, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{story.clientName}</h3>
                <p className="text-sm text-gray-600 mb-2">{story.industry}</p>
                <p className="text-gray-700">{story.description}</p>
                <p className="text-primary font-medium mt-2">{story.result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
