import SearchConsoleAnalyzerPage from "./search-console-analyzer-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Console Analyzer | Tanvir Newaz",
  description:
    "Analyze your Google Search Console data to uncover keyword opportunities and optimize your SEO strategy with our powerful data visualization tools.",
  openGraph: {
    title: "Search Console Analyzer | Tanvir Newaz",
    description:
      "Analyze your Google Search Console data to uncover keyword opportunities and optimize your SEO strategy with our powerful data visualization tools.",
    type: "website",
  },
}

export default function Page() {
  return <SearchConsoleAnalyzerPage />
}
