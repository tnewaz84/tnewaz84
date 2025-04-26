import SEOAnalyzerPage from "./seo-analyzer-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEO Analyzer Tool | Tanvir Newaz",
  description: "Get a free SEO audit for your website and discover optimization opportunities",
}

export default function Page() {
  return <SEOAnalyzerPage />
}

