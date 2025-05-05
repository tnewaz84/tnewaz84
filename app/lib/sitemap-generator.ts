interface SitemapEntry {
  url: string
  lastModified?: Date
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

export async function generateSitemapEntries(
  baseUrl: string,
  paths: string[],
  options: {
    lastModified?: Date
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
    priority?: number
  } = {},
): Promise<SitemapEntry[]> {
  const { lastModified = new Date(), changeFrequency = "weekly", priority = 0.7 } = options

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}

export async function fetchDynamicRoutes(fetcher: () => Promise<string[]>): Promise<string[]> {
  try {
    return await fetcher()
  } catch (error) {
    console.error("Error fetching dynamic routes for sitemap:", error)
    return []
  }
}
