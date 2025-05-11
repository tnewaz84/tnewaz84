export interface Service {
  name: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface LocationData {
  country: string
  city: string
  slug: string
  title: string
  niche: string
  primaryService: string
  secondaryService: string
  clientName: string
  introduction: string
  services: Service[]
  faqs: FAQ[]
  cityFacts: string
  address: string
  phone: string
  email: string
  hours: string
  mapEmbed?: string
  directionsUrl?: string
  gmbCid?: string
  metaTitle: string
  metaDescription: string
}
