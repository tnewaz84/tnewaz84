"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import ErrorBoundary from "./components/error-boundary"
import Hero from "./components/hero"
import ScrollingLogos from "./components/scrolling-logos"
import WhyChooseUs from "./components/why-choose-us"
import Portfolio from "./components/portfolio"
import Pricing from "./components/pricing"
import ConsultationSection from "./components/consultation-section"
import Contact from "./components/contact"
import SEOAnalyzerCTA from "./components/seo-analyzer-cta"
import GSAPAnimations from "./components/gsap-animations"

// Dynamically import components that might cause hydration issues
const AIChatBot = dynamic(() => import("./components/ai-chat-bot"), {
  ssr: false,
  loading: () => <div className="h-80 w-full bg-zinc-900 animate-pulse rounded-lg"></div>,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ErrorBoundary>
        <Hero className="hero-section">
          <GSAPAnimations />
          {/* Keep existing Hero content */}
        </Hero>
      </ErrorBoundary>

      <ErrorBoundary>
        <ScrollingLogos />
      </ErrorBoundary>

      <ErrorBoundary>
        <WhyChooseUs />
      </ErrorBoundary>

      <ErrorBoundary>
        <Portfolio />
      </ErrorBoundary>

      <ErrorBoundary>
        <Pricing />
      </ErrorBoundary>

      <ErrorBoundary>
        <ConsultationSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Ask Our AI Assistant</h2>
          <div className="max-w-md mx-auto">
            <Suspense fallback={<div className="h-80 w-full bg-zinc-900 animate-pulse rounded-lg"></div>}>
              <AIChatBot />
            </Suspense>
          </div>
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <SEOAnalyzerCTA />
      </ErrorBoundary>

      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
    </div>
  )
}
