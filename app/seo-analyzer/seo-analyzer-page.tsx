"use client"

import SEOAuditTool from "./seo-audit-tool"
import Hero from "../components/hero"
import { motion } from "framer-motion"

export default function SEOAnalyzerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">SEO Analyzer Tool</h1>
            <p className="text-gray-300 mb-8 text-center">
              Get a comprehensive SEO analysis of your website. Enter your URL below to identify optimization
              opportunities and improve your search engine rankings.
            </p>
            <SEOAuditTool />
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mt-12 bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">How This Tool Works</h3>
            <p className="text-gray-300 mb-4">Our SEO analyzer examines key elements of your website including:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
              <li>Title tag optimization and length</li>
              <li>Meta description presence and quality</li>
              <li>Header structure (H1-H4) analysis</li>
              <li>Internal and external link evaluation</li>
              <li>Keyword usage and density</li>
              <li>Mobile responsiveness indicators</li>
              <li>Page load speed estimation</li>
            </ul>
            <p className="text-gray-300">
              The analysis provides actionable insights to help you optimize your website for better search engine
              visibility.
            </p>
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

