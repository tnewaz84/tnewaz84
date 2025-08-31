import type { MetadataRoute } from "next"
import { getAllLocationSlugs } from "./lib/location-data"
import { BASE_URL } from "./lib/constants"

// Helper function to format date consistently
const formatDate = (date: Date = new Date()): string => {
  return date.toISOString()
}

// Get current date for lastModified
const currentDate = new Date()
// Get date 7 days ago for recently updated content
const recentDate = new Date()
recentDate.setDate(recentDate.getDate() - 7)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BASE_URL

  let locationSlugs: { country: string; city: string }[] = []
  try {
    locationSlugs = getAllLocationSlugs()
  } catch (error) {
    console.error("Error fetching location slugs:", error)
    // Continue with empty array if there's an error
  }

  // Main pages with high priority
  const mainPages = [
    {
      url: baseUrl,
      lastModified: formatDate(currentDate),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: formatDate(recentDate),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ]

  // Service pages with high-medium priority
  const servicePages = [
    {
      url: `${baseUrl}/seo-analyzer`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search-console-analyzer`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ad-management`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/streaming`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blockchain-calculator`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/design-tshirt`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/stream-viewer`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ninjam`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ]

  // Location pages with medium priority
  const locationPages = [
    {
      url: `${baseUrl}/locations`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...locationSlugs.map(({ country, city }) => ({
      url: `${baseUrl}/locations/${country}/${city}`,
      lastModified: formatDate(currentDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]

  // Forum pages with medium priority
  const forumPages = [
    {
      url: `${baseUrl}/forum`,
      lastModified: formatDate(recentDate),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/forum/login`,
      lastModified: formatDate(currentDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/forum/register`,
      lastModified: formatDate(currentDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/forum/new-post`,
      lastModified: formatDate(currentDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/forum/chat`,
      lastModified: formatDate(currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/forum/profile`,
      lastModified: formatDate(currentDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Legal and policy pages with lower priority
  const policyPages = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: formatDate(currentDate),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: formatDate(currentDate),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/publication-policies`,
      lastModified: formatDate(currentDate),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ]

  // Combine all pages
  return [...mainPages, ...servicePages, ...locationPages, ...forumPages, ...policyPages]
}
