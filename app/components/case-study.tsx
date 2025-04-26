"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ScrollingLogos from "./scrolling-logos"

export default function CaseStudy() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shopify%20Optimization2-Ea03RYFwnJ5VgSG8GdRDqN0Mz8Gzux.jpeg",
      alt: "January analytics showing $6.27K revenue with 49 transactions",
      caption: "January 2021: The starting point with $6.27K monthly revenue",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shopify%20Optimization1-sHPdBHJHv3AedJwn8bcIScBMfzQ273.jpeg",
      alt: "October analytics showing $3.83K revenue with mobile as top device category",
      caption: "October 2022: Mobile optimization driving 65.67% growth in mobile revenue",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shopify%20Optimization3-YcmCa61mjwUV3uPCxqndAHdPJ02fRC.jpeg",
      alt: "October-November analytics showing $14.2K revenue with 269.67% growth",
      caption: "October-November 2023: Significant growth to $14.2K with 269.67% increase",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shopify%20Optimization4-nHwyFYxq1KSn4l1xTulDuVnZj3kkMa.jpeg",
      alt: "November analytics showing $20.4K revenue with 219.32% growth",
      caption: "November 2023: Peak performance with $20.4K revenue, a 219.32% increase",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <section className="py-20 bg-black" id="case-study">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            Case Study: E-Commerce Transformation
          </h2>
          <p className="text-xl text-gray-300 font-semibold mb-2">
            Transforming a Jewelry Store into an E-Commerce Powerhouse: A 2.5-Year Journey
          </p>
          <p className="text-sm text-gray-400 mb-8">Jan 2021 - Nov 2023</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative bg-zinc-900 rounded-lg p-4 shadow-xl">
            <div className="relative aspect-[9/16] overflow-hidden rounded-lg">
              <img
                src={images[currentSlide].src || "/placeholder.svg"}
                alt={images[currentSlide].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-center text-gray-300">
                {images[currentSlide].caption}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-zinc-600"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">The Challenge:</h3>
              <p className="text-gray-300">
                Starting with modest monthly revenues of just $6.27K (January snapshot), the brand faced the typical
                hurdles of building awareness, scaling traffic, and converting visitors in a crowded market.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">The Strategy:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold">Referral Power:</span> Focused on referral programs, leading to a
                  massive $9.75K channel revenue spike in November.
                </li>
                <li>
                  <span className="font-semibold">SEO Excellence:</span> Organic search optimization yielded over $4.25K
                  in additional monthly revenue through high-intent traffic.
                </li>
                <li>
                  <span className="font-semibold">Social Media Growth:</span> Amplified content strategies saw social
                  media contributing $2.59K with a 129.85% growth rate.
                </li>
                <li>
                  <span className="font-semibold">Data-Driven Insights:</span> Continuously monitored key metrics,
                  identifying winning campaigns and channels for reinvestment.
                </li>
                <li>
                  <span className="font-semibold">Customer Experience:</span> Enhanced mobile responsiveness and
                  streamlined checkout flow to improve revenue-per-user (hitting $0.93 in January and consistently
                  growing).
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">The Results:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold">Revenue Growth:</span> Achieved a stunning $20.4K monthly revenue
                  milestone in November—a 219.32% increase compared to prior periods.
                </li>
                <li>
                  <span className="font-semibold">Transactions:</span> Boosted conversion rates, leading to a 220%
                  transaction growth in peak months.
                </li>
                <li>
                  <span className="font-semibold">Channel Diversification:</span> Referral and organic channels emerged
                  as top drivers, accounting for 70%+ of monthly sales.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add the scrolling logos component */}
      <ScrollingLogos />
    </section>
  )
}
