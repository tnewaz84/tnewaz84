"use client"

import Hero from "../components/hero"
import { motion } from "framer-motion"
import SearchConsoleAnalyzerTool from "./search-console-analyzer-tool"

export default function SearchConsoleAnalyzerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Search Console Analyzer</h1>
            <p className="text-gray-300 mb-8 text-center">
              Upload your Google Search Console data to discover keyword opportunities, identify content gaps, and
              optimize your SEO strategy with AI-powered insights.
            </p>
            <SearchConsoleAnalyzerTool />
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mt-12 bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">How This Tool Works</h3>
            <p className="text-gray-300 mb-4">
              Our Search Console Analyzer uses advanced machine learning to process your Google Search Console data and
              provide actionable insights:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
              <li>Semantic keyword clustering to identify related search terms</li>
              <li>Performance metrics analysis (clicks, impressions, CTR, position)</li>
              <li>Identification of high-potential keyword opportunities</li>
              <li>Content gap analysis based on search patterns</li>
              <li>Ranking improvement recommendations</li>
            </ul>
            <p className="text-gray-300">
              Simply export your data from Google Search Console as a CSV file and upload it to get started.
            </p>
          </div>

          <div className="mt-8 bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">How to Export Your Search Console Data</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300 mb-4">
              <li>
                Log in to{" "}
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Google Search Console
                </a>
              </li>
              <li>Select your property</li>
              <li>Click on "Performance" in the left sidebar</li>
              <li>Set your desired date range (3 months recommended)</li>
              <li>Click the export button (↓) at the top right</li>
              <li>Select "CSV" from the dropdown menu</li>
              <li>Upload the downloaded file to our analyzer</li>
            </ol>
          </div>

          <div className="mt-8 bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Need Professional SEO Analysis?</h3>
            <p className="text-gray-300 mb-4">
              While this tool provides valuable insights, professional SEO requires expertise and a comprehensive
              strategy. Let Tanvir Newaz help you optimize your website for maximum visibility and conversions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="/#pricing"
                className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors text-center"
              >
                View SEO Packages
              </a>
              <a
                href="/#contact"
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors text-center"
              >
                Get a Custom Analysis
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

