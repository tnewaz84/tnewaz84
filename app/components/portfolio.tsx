"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollAnimation } from "./scroll-animation"

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "web-development", "e-commerce", "seo", "ai-solutions"]

  const works = [
    {
      id: 1,
      title: "Water Damage Repair",
      category: "web-development",
      image:
        "https://sjc.microlink.io/a85ZjOTe3oHz0BOMiZ44_1hiPIx_kT_qiY80dQ7UBsUtvHL_YXyJuUAp6F5uoGch9_Z8jj12nnyCYQlbPTeOig.jpeg",
      url: "http://waterdamagerepair.pro/",
      description:
        "A professional website for emergency water damage restoration services in Colorado Springs with 24/7 response capabilities.",
    },
    {
      id: 2,
      title: "Culinary Experience",
      category: "web-development",
      image:
        "https://sjc.microlink.io/4ugSWDOwAvEgKTmEkuzpg78sOqT6x6u4T7DM6U6ratFZ4z11GnJdRgVLgTf4ld8TVsnhdES1MbRYUyfLgG6TTw.jpeg",
      url: "https://www.culinaryexperience.pro/",
      description:
        "An elegant website for Flamingo Pete's private chef and catering services featuring professional food photography and intuitive booking system.",
    },
    {
      id: 3,
      title: "Epic Fences Pueblo",
      category: "web-development",
      image: "/modern-fencing-website.png",
      url: "https://www.epicfencespueblo.com/",
      description: "A responsive website for a fencing company in Pueblo with modern design and service showcase.",
    },
    {
      id: 4,
      title: "1395 Zero Seven",
      category: "web-development",
      image: "/business-website-3d-typography.png",
      url: "http://1395zeroseven.pro/",
      description: "A dynamic business website featuring 3D typography and a clean, professional aesthetic.",
    },
    {
      id: 5,
      title: "E-commerce SEO Campaign",
      category: "seo",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-18%20at%2011.44.15%E2%80%AFPM-2jqy6BGQ4CrW3uMOI4vdNTB8XYIO6D.png",
      description:
        "Strategic SEO implementation that generated $8.85K in revenue with 66 transactions in just two weeks.",
      stats: [
        { label: "Revenue", value: "$8,853.62" },
        { label: "Transactions", value: "66" },
        { label: "Revenue per User", value: "$0.57" },
      ],
    },
    {
      id: 6,
      title: "AI-Powered Customer Service",
      category: "ai-solutions",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/483597129_642187501748028_4996090730570525978_n-OW6OMaFJ400fjpQqvdKlOssgsi9AA1.png",
      url: "https://v0-epicferncesllc.vercel.app/",
      description:
        "Custom AI chatbot solution that provides instant customer support, answers questions, and helps with service inquiries 24/7.",
    },
  ]

  const filteredWorks = works.filter((work) => (selectedCategory === "all" ? true : work.category === selectedCategory))

  return (
    <section className="bg-black py-20" id="portfolio">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeUp">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">Client Success Stories</h2>
            <p className="text-gray-400 mb-8">
              Browse through a selection of projects where I've helped businesses overcome digital challenges and
              achieve remarkable growth through strategic solutions.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.1}>
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm capitalize font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-white text-black border border-white font-bold"
                    : "bg-white text-black border border-white hover:bg-white/90"
                }`}
              >
                {category.replace("-", " ")}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" staggerChildren={0.1} delay={0.2}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => (
              <div key={work.id}>
                <Card className="overflow-hidden bg-zinc-900 h-full">
                  <CardContent className="p-0">
                    <div className="group relative">
                      <img
                        src={work.image || "/placeholder.svg"}
                        alt={work.title || "Project image"}
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                          e.currentTarget.onerror = null
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-6">
                        <h3 className="text-xl font-semibold text-white text-center mb-2">
                          {work.title || "Untitled Project"}
                        </h3>
                        <p className="text-sm text-gray-300 text-center mb-4">
                          {work.description || "No description available"}
                        </p>

                        {work.stats && Array.isArray(work.stats) && work.stats.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 w-full mb-4">
                            {work.stats.map((stat, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <span className="text-white font-bold text-sm">{stat?.value || "0"}</span>
                                <span className="text-gray-400 text-xs">{stat?.label || "Stat"}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {work.url && (
                          <a
                            href={work.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white bg-primary/90 hover:bg-primary px-4 py-2 rounded-md transition-colors"
                          >
                            Visit Site <span className="text-xs">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.3}>
          <div className="mx-auto max-w-3xl text-center mt-20">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
              Turning Challenges Into Opportunities
            </h2>
            <p className="text-gray-400 mb-8">
              Tanvir Newaz isn't just a digital marketer or developer – he's a growth architect who combines technical
              expertise, creative design, and data-driven strategies to deliver results. From SEO optimization to
              AI-powered solutions, Tanvir builds systems that drive sustainable growth.
            </p>

            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl mt-12">The Cost of Inaction</h2>
            <p className="text-gray-400 mb-4">
              The longer you wait, the harder it becomes to catch up. Here's what's at stake:
            </p>
            <ul className="text-gray-400 text-left list-disc pl-6 mb-8">
              <li className="mb-2">
                Lost revenue: Every day your website isn't optimized, you lose potential customers.
              </li>
              <li className="mb-2">Wasted time: Inefficient systems drain your team's productivity.</li>
              <li className="mb-2">Missed opportunities: Competitors are leveraging AI and data to outpace you.</li>
              <li className="mb-2">Brand erosion: A weak online presence damages credibility and customer trust.</li>
            </ul>

            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl mt-12">
              How Tanvir Solves Your Problems
            </h2>
            <p className="text-gray-400">
              Tanvir is your one-stop solution for digital growth, delivering results through data-driven strategies,
              AI-powered solutions, and technical expertise.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
