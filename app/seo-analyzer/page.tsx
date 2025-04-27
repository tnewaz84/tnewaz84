import SEOAnalyzerPage from "./seo-analyzer-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEO Analyzer Tool | Tanvir Newaz",
  description:
    "Get a free comprehensive SEO audit for your website. Discover optimization opportunities and improve your search rankings with actionable insights.",
  openGraph: {
    title: "SEO Analyzer Tool | Tanvir Newaz",
    description:
      "Get a free comprehensive SEO audit for your website. Discover optimization opportunities and improve your search rankings with actionable insights.",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seo-analyzer-social-Rl9Ik8KykAeFIutJcUZ0YckmCnxBiA.png",
        width: 1200,
        height: 630,
        alt: "SEO Analyzer Tool by Tanvir Newaz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Analyzer Tool | Tanvir Newaz",
    description:
      "Get a free comprehensive SEO audit for your website. Discover optimization opportunities and improve your search rankings with actionable insights.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seo-analyzer-social-Rl9Ik8KykAeFIutJcUZ0YckmCnxBiA.png",
    ],
  },
}

export default function Page() {
  return <SEOAnalyzerPage />
}
