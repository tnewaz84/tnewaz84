import LocationsClient from "./locations-client"

export const metadata = {
  title: "Our Locations | Your Company Name",
  description:
    "Discover our services across multiple locations worldwide. Find the nearest office to get professional assistance tailored to your local needs.",
}

export default function LocationsPage() {
  return <LocationsClient />
}
