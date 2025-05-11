"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import GsapHero from "./components/gsap-hero"
// import GsapPortfolio from "./components/gsap-portfolio"
import GsapTextAnimation from "./components/gsap-text-animation"
import { GsapScrollAnimation } from "./components/gsap-scroll-animation"
import CaseStudy from "./components/case-study"
import Pricing from "./components/pricing"
import Contact from "./components/contact"
import Gallery from "./components/gallery"
import WhyChooseUs from "./components/why-choose-us"
import SeoAnalyzerCta from "./components/seo-analyzer-cta"
import ConsultationSection from "./components/consultation-section"
import dynamic from "next/dynamic"

// Dynamically import the LocationsSection component
const LocationsSection = dynamic(() => import("./components/locations-section"), {
  ssr: false,
})

export default function Page() {
  // Add state to track if we're on mobile and if component is mounted
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Check if we're on mobile on component mount and when window resizes
  useEffect(() => {
    setIsMounted(true)

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Don't render until component is mounted
  if (!isMounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with GSAP - Add conditional rendering */}
      {isMounted && <GsapHero showAuthButtons={true} />}

      {/* Build, Brand, Protect Section */}
      <WhyChooseUs />

      {/* Value Proposition Section with GSAP - Add conditional rendering */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          {isMounted && (
            <>
              <GsapTextAnimation
                as="h2"
                animation="words"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8"
              >
                I help founders build growth engines using SEO, dev, and data.
                <br className="hidden md:block" />
                <span className="block mt-2">
                  Not just traffic. Not just pretty websites. I build systems that convert and scale.
                </span>
              </GsapTextAnimation>

              <GsapTextAnimation
                as="p"
                animation="fade"
                delay={0.3}
                className="text-lg text-gray-300 max-w-3xl mx-auto"
              >
                My approach combines cutting-edge technology with proven marketing principles to help clients achieve
                measurable results and sustainable growth.
              </GsapTextAnimation>
            </>
          )}
        </div>
      </section>

      {/* Real Search Results Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto max-w-5xl px-4">
          <GsapTextAnimation
            as="h2"
            animation="chars"
            className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center"
          >
            Real Search Results
          </GsapTextAnimation>

          <GsapScrollAnimation animation="fadeUp" className="grid gap-6 md:gap-8">
            {!isMobile ? (
              <>
                <div className="bg-zinc-900 p-4 rounded-lg shadow-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/485087963_1152033056382378_3665350076210089696_n-5qu4ys3eCAJtp2qI6LG7HUw72eT6pO.png"
                    alt="Google search results showing Epic Fences LLC ranking #1"
                    className="w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg shadow-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/484631145_990426823058429_5463226980749305168_n-rT1iCHd4ONKtQ369xyA1V9EKvMheF5.png"
                    alt="Google search results for fence company in Canon City"
                    className="w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg shadow-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/485084124_1054949853085477_9177294864128396703_n-sEiEawzLadQXb6STliFeV4UJqBN380.png"
                    alt="Google search results for fence installer in Canon City"
                    className="w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </>
            ) : (
              // On mobile, only show one image to improve performance
              <div className="bg-zinc-900 p-4 rounded-lg shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/485087963_1152033056382378_3665350076210089696_n-5qu4ys3eCAJtp2qI6LG7HUw72eT6pO.png"
                  alt="Google search results showing Epic Fences LLC ranking #1"
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
                <p className="text-center text-sm mt-3 text-gray-400">Swipe for more examples</p>
              </div>
            )}
          </GsapScrollAnimation>
        </div>
      </section>

      {/* Locations Map Section */}
      <LocationsSection />

      {/* Join Our Community Section with GSAP */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          {isMounted && (
            <>
              <GsapTextAnimation as="h2" animation="chars" className="text-2xl md:text-3xl font-bold mb-6">
                Join Our Community
              </GsapTextAnimation>

              <GsapTextAnimation
                as="p"
                animation="fade"
                delay={0.2}
                className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Get exclusive access to our strategies and connect with other successful businesses. Learn from our
                community of entrepreneurs and digital growth experts.
              </GsapTextAnimation>

              <GsapScrollAnimation animation="stagger" className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/forum/register"
                  className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/forum/login"
                  className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
              </GsapScrollAnimation>
            </>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Portfolio Section with GSAP */}
      {/* {isMounted && <GsapPortfolio />} */}

      {/* Case Study Section */}
      <CaseStudy />

      {/* Pricing Section */}
      <Pricing />

      {/* Consultation Section */}
      <ConsultationSection />

      {/* SEO Analyzer CTA Section */}
      <SeoAnalyzerCta />

      {/* Contact Section */}
      <Contact />
    </main>
  )
}
