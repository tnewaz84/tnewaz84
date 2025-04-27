import type { MetadataRoute } from "next"
import { BASE_URL } from "./lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
