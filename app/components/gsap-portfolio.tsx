"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Portfolio item type
interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

// Sample portfolio data
const portfolioItems: PortfolioItem[] = [
  {
    id: "epic-fences",
    title: "Epic Fences LLC",
    description: "Complete SEO and web development for a fencing company, resulting in #1 rankings for key terms.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/485087963_1152033056382378_3665350076210089696_n-5qu4ys3eCAJtp2qI6LG7HUw72eT6pO.png",
    link: "https://epicfencesllc.com",
    tags: ["SEO", "Web Development", "Local Business"],
  },
  {
    id: "crypto-platform",
    title: "Cryptocurrency Trading Platform",
    description: "Developed a secure, high-performance trading platform with real-time data visualization.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=600&query=cryptocurrency%20trading%20platform",
    link: "#",
    tags: ["React", "Node.js", "WebSockets", "Fintech"],
  },
  {
    id: "ecommerce-optimization",
    title: "E-commerce Conversion Optimization",
    description: "Increased conversion rates by 43% through data-driven UX improvements and A/B testing.",
    image: "/ecommerce-analytics-dashboard.png",
    link: "#",
    tags: ["CRO", "Analytics", "E-commerce"],
  },
  {
    id: "saas-marketing",
    title: "SaaS Marketing Campaign",
    description: "Comprehensive digital marketing strategy that reduced CAC by 37% while increasing MRR.",
    image: "/saas-marketing-dashboard.png",
    link: "#",
    tags: ["SaaS", "Digital Marketing", "Growth Hacking"],
  },
]

export default function GsapPortfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !itemsRef.current) return

    // Heading animation
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    })

    // Staggered items animation
    const items = itemsRef.current.children
    gsap.from(items, {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: itemsRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    })

    // Hover animations for each item
    Array.from(items).forEach((item) => {
      const image = item.querySelector(".portfolio-image")
      const content = item.querySelector(".portfolio-content")

      if (!image || !content) return

      // Create hover animation
      const hoverTl = gsap.timeline({ paused: true })

      hoverTl
        .to(image, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          content,
          {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )

      // Add event listeners
      item.addEventListener("mouseenter", () => hoverTl.play())
      item.addEventListener("mouseleave", () => hoverTl.reverse())
    })

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-black" id="featured-projects">
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Featured Projects
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item) => (
            <a
              href={item.link}
              key={item.id}
              className="group block bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="portfolio-image w-full h-full transform transition-transform duration-500">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=600&query=project%20placeholder"
                      e.currentTarget.onerror = null
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ArrowUpRight className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="portfolio-content p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-zinc-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
