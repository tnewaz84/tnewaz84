import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sitemap Test | Artist Portfolio",
  description: "Testing the sitemap functionality",
}

export default function SitemapTestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Sitemap Test</h1>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Sitemap Information</h2>
        <p className="mb-4">
          This page demonstrates the sitemap functionality. The sitemap is automatically generated and includes all
          important pages of the website.
        </p>

        <div className="mb-4">
          <h3 className="mb-2 text-lg font-medium">Sitemap URLs:</h3>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <Link href="/api/sitemap" className="text-blue-600 hover:underline dark:text-blue-400">
                Dynamic Sitemap API
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="text-blue-600 hover:underline dark:text-blue-400">
                Static Sitemap XML
              </Link>
            </li>
          </ul>
        </div>

        <p>
          The sitemap includes static routes and dynamically generated routes from the database. It helps search engines
          discover and index all pages of your website.
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Image Optimization</h2>
        <p className="mb-4">
          This website uses advanced image optimization techniques to ensure fast loading times and optimal user
          experience.
        </p>

        <div className="mb-4">
          <h3 className="mb-2 text-lg font-medium">Image Optimization Features:</h3>
          <ul className="list-inside list-disc space-y-1">
            <li>Automatic responsive images</li>
            <li>Lazy loading for better performance</li>
            <li>WebP and AVIF format support</li>
            <li>Blur placeholders for better UX</li>
            <li>Proper image metadata for SEO</li>
          </ul>
        </div>

        <p>
          Try the{" "}
          <Link
            href="/api/image-optimizer?url=https://images.unsplash.com/photo-1682687982501-1e58ab814714&width=500&height=300&format=webp"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Image Optimizer API
          </Link>{" "}
          to see the optimization in action.
        </p>
      </div>
    </div>
  )
}
