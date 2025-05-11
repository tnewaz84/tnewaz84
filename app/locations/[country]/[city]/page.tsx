import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LocationPage from "../../../components/location-page"
import { getLocationData } from "../../../lib/location-data"

type LocationPageProps = {
  params: {
    country: string
    city: string
  }
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { country, city } = params
  const locationData = getLocationData(country, city)

  if (!locationData) {
    return {
      title: "Location Not Found",
      description: "The requested location page could not be found.",
    }
  }

  return {
    title: locationData.metaTitle,
    description: locationData.metaDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/locations/${country}/${locationData.slug}`,
    },
  }
}

export default function CityLocationPage({ params }: LocationPageProps) {
  const { country, city } = params
  const locationData = getLocationData(country, city)

  if (!locationData) {
    notFound()
  }

  return <LocationPage locationData={locationData} />
}
