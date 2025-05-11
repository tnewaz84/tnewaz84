"use client"

import { useState } from "react"
import type { LocationData } from "../lib/location-types"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface LocationPageProps {
  locationData: LocationData
}

export default function LocationPage({ locationData }: LocationPageProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">{locationData.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">{locationData.introduction}</p>

            <h2 className="text-3xl font-bold mt-12 mb-6">
              Quality/Reputable {locationData.niche} Services Offered In {locationData.city}!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {locationData.services.map((service, index) => (
                <Card key={index} className="border-2 border-primary/20 hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                    <p>{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="my-12">
              <h3 className="text-2xl font-bold mb-6">
                FAQ About {locationData.niche} in {locationData.city}
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {locationData.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold mb-4">About {locationData.city}</h3>
              <p>{locationData.cityFacts}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-24">
            <Card className="border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary text-primary-foreground p-4">
                  <h3 className="text-xl font-bold">Contact Us in {locationData.city}</h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{locationData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{locationData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{locationData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground">{locationData.hours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Find Us in {locationData.city}</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {locationData.mapEmbed ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: locationData.mapEmbed }}
                    className="w-full h-full"
                    onLoad={() => setMapLoaded(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Map not available</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <a
                  href={
                    locationData.directionsUrl ||
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationData.address)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Get directions to our {locationData.city} location
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
