import { NextResponse } from "next/server"
import { fetchDynamicRoutes, generateSitemapEntries } from "@/app/lib/sitemap-generator"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tanvirnewaz.com"

  // This would typically come from your database
  const blogSlugs = await fetchDynamicRoutes(async () => {
    // In a real app, you would fetch these from your database
    // For example: const posts = await db.query('SELECT slug FROM posts')
    return ["/blog/post-1", "/blog/post-2", "/blog/post-3"]
  })

  const blogEntries = await generateSitemapEntries(baseUrl, blogSlugs, {
    changeFrequency: "monthly",
    priority: 0.6,
  })

  // Generate the XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogEntries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified?.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
