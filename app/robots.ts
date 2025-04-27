import type { MetadataRoute } from "next"
import { BASE_URL } from "@/app/lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
