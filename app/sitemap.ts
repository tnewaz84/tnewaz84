import type { MetadataRoute } from "next"
import { BASE_URL } from "@/app/lib/constants"

// Function to get products from the database with error handling and timeout
async function getProducts(sqlQuery: string) {
  try {
    // Import the query function dynamically to prevent build errors if it fails
    const postgres = await import("@/lib/postgres").catch(() => ({ query: null }))

    // If we couldn't import the query function, return an empty array
    if (!postgres.query) {
      console.log("Postgres module not available, skipping product fetch")
      return []
    }

    // Set a timeout for the database query
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database query timeout")), 5000)
    })

    // Race the query against the timeout
    const result = await Promise.race([postgres.query(sqlQuery, []), timeoutPromise]).catch((error) => {
      console.error("Error fetching products for sitemap:", error)
      return { rows: [] }
    })

    return result.rows || []
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
    return []
  }
}

export async function generateSitemaps() {
  // Return a smaller number of sitemaps to reduce build time
  return [{ id: 0 }]
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Create static routes that don't depend on database
  const routes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/seo-analyzer`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search-console-analyzer`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/design-tshirt`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ad-management`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/streaming`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blockchain-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/make-money-online`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]

  // Only try to fetch products if this is the first sitemap
  if (id === 0) {
    try {
      // Use a simpler query with a limit to prevent timeouts
      const products = await getProducts(`SELECT id, updated_at as date FROM products LIMIT 100`)

      // Add product URLs to the sitemap if any were found
      if (products && products.length > 0) {
        const productUrls = products.map((product) => ({
          url: `${BASE_URL}/product/${product.id}`,
          lastModified: new Date(product.date || Date.now()),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))

        return [...routes, ...productUrls]
      }
    } catch (error) {
      console.error("Failed to add products to sitemap:", error)
      // Continue with just the static routes
    }
  }

  // Return the static routes if we couldn't get products or this isn't the first sitemap
  return routes
}
