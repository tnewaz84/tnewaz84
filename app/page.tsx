"use client"

import Hero from "./components/hero"
import Portfolio from "./components/portfolio"
import CaseStudy from "./components/case-study"
import Pricing from "./components/pricing"
import Contact from "./components/contact"
import Gallery from "./components/gallery"
import WhyChooseUs from "./components/why-choose-us"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import SeoAnalyzerCta from "./components/seo-analyzer-cta"
import ConsultationSection from "./components/consultation-section"

export default function Page() {
  // Add state to track if we're on mobile and if component is mounted
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Check if we're on mobile on component mount and when window resizes
  useEffect(() => {
    // Set mounted state
    setIsMounted(true)

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize with debounce
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkIfMobile, 100)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  // Don't render until component is mounted
  if (!isMounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Hero showAuthButtons={true}>
        <div className="max-w-4xl px-4 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards] will-change-opacity will-change-transform">
          <h1 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-tight opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards] will-change-opacity will-change-transform">
            {isMobile ? (
              <>
                <span className="block mb-2">Tanvir Newaz,</span>
                <span className="block mb-2">Google Certified</span>
                <span className="block mb-2">Project Manager &</span>
                <span className="block">SEO Specialist</span>
              </>
            ) : (
              "Tanvir Newaz, Google Certified Project Manager and Data-Driven SEO Specialist"
            )}
          </h1>
          <p className="max-w-[600px] mx-auto text-base md:text-lg lg:text-xl text-gray-400 opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.2s_forwards] will-change-opacity will-change-transform">
            The Digital Growth Architect
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.3s_forwards] will-change-opacity will-change-transform">
            <Link
              href="/forum/register"
              className="bg-white text-black px-5 py-2.5 md:px-6 md:py-3 rounded-md font-medium hover:bg-white/90 transition-colors text-sm md:text-base"
            >
              Register
            </Link>
            <Link
              href="/forum/login"
              className="border border-white text-white px-5 py-2.5 md:px-6 md:py-3 rounded-md font-medium hover:bg-white/10 transition-colors text-sm md:text-base"
            >
              Login
            </Link>
          </div>
        </div>
      </Hero>

      {/* Build, Brand, Protect Section */}
      <WhyChooseUs />

      {/* Value Proposition Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards] will-change-opacity will-change-transform">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">
              I help founders build growth engines using SEO, dev, and data.
              <br className="hidden md:block" />
              <span className="block mt-2">
                Not just traffic. Not just pretty websites. I build systems that convert and scale.
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.2s_forwards] will-change-opacity will-change-transform">
              My approach combines cutting-edge technology with proven marketing principles to help clients achieve
              measurable results and sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section className="py-16 md:py-20 bg-zinc-900">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards] will-change-opacity will-change-transform">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center">Proven Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/20 p-2 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">43%</h3>
                </div>
                <p className="text-gray-300">Reduction in acquisition costs through optimized marketing funnels</p>
              </div>
              <div className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/20 p-2 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">78%</h3>
                </div>
                <p className="text-gray-300">Outperform competitor campaigns with data-driven strategies</p>
              </div>
              <div className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-md sm:col-span-2 md:col-span-1">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/20 p-2 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">100%</h3>
                </div>
                <p className="text-gray-300">Satisfaction guarantee with all services and solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Search Results Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center">Real Search Results</h2>
          <div className="grid gap-6 md:gap-8">
            {!isMobile ? (
              <>
                <div className="bg-zinc-900 p-4 rounded-lg shadow-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/485087963_1152033056382378_3665350076210089696_n-5qu4ys3eCAJtp2qI6LG7HUw72eT6pO.png"
                    alt="Google search results showing Epic Fences LLC ranking #1"
                    className="w-full rounded-lg shadow-lg"
                    loading="eager"
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
          </div>
        </div>
      </section>

      {/* Make Money Online Section */}
      <section className="py-16 md:py-20 bg-zinc-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards] will-change-opacity will-change-transform">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Make Money Online</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Discover multiple ways to earn money online, from passive income with blockchain networks to creating your
              own cryptocurrency and earning referral bonuses.
            </p>
            <Link
              href="/make-money-online"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Explore Money-Making Opportunities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Get exclusive access to our strategies and connect with other successful businesses. Learn from our
            community of entrepreneurs and digital growth experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Portfolio Section */}
      <Portfolio />

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
