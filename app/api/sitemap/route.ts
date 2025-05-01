import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tanvirnewaz.com"
  const currentDate = new Date().toISOString()

  const pages = [
    "/",
    "/blog",
    "/seo-analyzer",
    "/search-console-analyzer",
    "/ad-management",
    "/streaming",
    "/ninjam",
    "/privacy-policy",
    "/refund-policy",
    "/publication-policies",
    "/blockchain-calculator",
    "/make-money-online",
    "/design-tshirt",
    "/3d-tshirt-designer",
    "/forum",
    "/forum/login",
    "/forum/register",
    "/forum/chat",
    "/forum/new-post",
    "/forum/profile",
    "/stream-viewer",
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
