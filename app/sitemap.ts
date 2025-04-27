import type { MetadataRoute } from "next"
import { BASE_URL } from "@/app/lib/constants"
import { query } from "@/lib/postgres" // Using the postgres utility we created earlier

// Function to get products from the database
async function getProducts(sqlQuery: string) {
  try {
    const result = await query(sqlQuery, [])
    return result.rows || []
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
    return []
  }
}

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000
  const end = start + 50000

  // Get products from database
  const products = await getProducts(`SELECT id, updated_at as date FROM products WHERE id BETWEEN ${start} AND ${end}`)

  // Create static routes
  const routes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/seo-analyzer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search-console-analyzer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/design-tshirt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ad-management`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/streaming`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blockchain-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/make-money-online`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ] as MetadataRoute.Sitemap

  // If this is the first sitemap (id=0), include the static routes
  if (id === 0) {
    return [
      ...routes,
      ...products.map((product) => ({
        url: `${BASE_URL}/product/${product.id}`,
        lastModified: new Date(product.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ]
  }

  // For other sitemaps, just include the products
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date(product.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))
}
