"use client"

import { useState } from "react"
import Hero from "../components/hero"
import { motion } from "framer-motion"
import { ScrollAnimation } from "../components/scroll-animation"
import { Calendar, ExternalLink, Search, Linkedin, FileText } from "lucide-react"

// Blog post data structure
type BlogPost = {
  title: string
  excerpt: string
  date: string
  url: string
  image: string
  source: "Medium" | "LinkedIn"
}

// Medium articles
const mediumPosts: BlogPost[] = [
  {
    title: "Data-Driven SEO: How to Dominate Your Competitors in 2025",
    excerpt:
      "Learn how to leverage data-driven SEO strategies to outperform your competition and drive more business in 2025.",
    date: "Feb 27, 2024",
    url: "https://medium.com/@SEOExpertgulshanBD/data-driven-seo-how-to-dominate-your-competitors-in-2025-and-get-your-business-phone-ringing-60c0e9b2b8e0",
    image: "/placeholder.svg?height=400&width=600",
    source: "Medium",
  },
  {
    title: "The Forex Trading Blueprint: Uncover the USD/JPY Strategies of the Elite",
    excerpt:
      "In the dynamic world of forex trading, understanding the nuances of key currency pairs like USD/JPY can make the difference between success and failure.",
    date: "May 24, 2024",
    url: "https://medium.com/@SEOExpertgulshanBD/the-forex-trading-blueprint-uncover-the-usd-jpy-strategies-of-the-elite-a8b9c7d6e3f2",
    image: "/placeholder.svg?height=400&width=600",
    source: "Medium",
  },
  {
    title: "Unveil the Secrets to Mastering AUD/USD Trades! Insider Analysis Revealed!",
    excerpt: "Discover expert insights and strategies for successful AUD/USD trading with this comprehensive analysis.",
    date: "May 21, 2024",
    url: "https://medium.com/@SEOExpertgulshanBD/unveil-the-secrets-to-mastering-aud-usd-trades-insider-analysis-revealed-b7c8d9e5a4f3",
    image: "/placeholder.svg?height=400&width=600",
    source: "Medium",
  },
]

// LinkedIn posts
const linkedinPosts: BlogPost[] = [
  {
    title: "The Future of SEO: AI and Machine Learning",
    excerpt:
      "As AI continues to evolve, SEO strategies must adapt. Here's how AI and machine learning are reshaping the SEO landscape and what you need to know to stay ahead.",
    date: "June 10, 2024",
    url: "https://www.linkedin.com/in/tanvir-newaz/",
    image: "/placeholder.svg?height=400&width=600",
    source: "LinkedIn",
  },
  {
    title: "5 Common SEO Mistakes That Are Killing Your Rankings",
    excerpt:
      "Many businesses are unknowingly sabotaging their SEO efforts. Learn about the most common mistakes and how to fix them to improve your search rankings.",
    date: "June 5, 2024",
    url: "https://www.linkedin.com/in/tanvir-newaz/",
    image: "/placeholder.svg?height=400&width=600",
    source: "LinkedIn",
  },
  {
    title: "Local SEO Success Story: How I Helped a Small Business Increase Foot Traffic by 200%",
    excerpt:
      "A case study on implementing effective local SEO strategies that dramatically increased visibility and customer visits for a local business.",
    date: "May 28, 2024",
    url: "https://www.linkedin.com/in/tanvir-newaz/",
    image: "/placeholder.svg?height=400&width=600",
    source: "LinkedIn",
  },
]

// Combine all posts
const allPosts = [...mediumPosts, ...linkedinPosts].sort((a, b) => {
  // Sort by date (newest first)
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSource, setSelectedSource] = useState<"All" | "Medium" | "LinkedIn">("All")

  // Filter posts based on search query and selected source
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSource = selectedSource === "All" || post.source === selectedSource

    return matchesSearch && matchesSource
  })

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Digital Marketing Insights</h1>
            <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
              Expert strategies, tips, and analysis to help your business thrive in the digital landscape. Read my
              latest articles on Medium and LinkedIn for in-depth SEO and digital marketing knowledge.
            </p>
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        {/* Profile Links */}
        <ScrollAnimation animation="fadeUp">
          <div className="mb-12 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://medium.com/@SEOExpertgulshanBD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              <FileText className="h-5 w-5" /> View All Medium Articles
            </a>
            <a
              href="https://www.linkedin.com/in/tanvir-newaz/recent-activity/all/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0A66C2]/90 transition-colors"
            >
              <Linkedin className="h-5 w-5" /> View LinkedIn Activity
            </a>
          </div>
        </ScrollAnimation>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Medium", "LinkedIn"] as const).map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedSource === source ? "bg-white text-black" : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <ScrollAnimation animation="stagger" staggerChildren={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <a key={index} href={post.url} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-zinc-900 rounded-xl overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:translate-y-[-5px]">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute top-3 right-3 text-white text-xs px-2 py-1 rounded-full flex items-center ${
                        post.source === "Medium" ? "bg-black/70" : "bg-[#0A66C2]/70"
                      }`}
                    >
                      {post.source === "Medium" ? (
                        <FileText className="h-3 w-3 mr-1" />
                      ) : (
                        <Linkedin className="h-3 w-3 mr-1" />
                      )}
                      {post.source}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-white/90">{post.title}</h3>
                    <p className="text-gray-400 mb-4 flex-1">{post.excerpt}</p>
                    <span className="text-white font-medium group-hover:underline flex items-center">
                      Read on {post.source} <ExternalLink className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </ScrollAnimation>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a
                href="https://medium.com/@SEOExpertgulshanBD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                <FileText className="h-5 w-5" /> View Medium Profile
              </a>
              <a
                href="https://www.linkedin.com/in/tanvir-newaz/recent-activity/all/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0A66C2]/90 transition-colors"
              >
                <Linkedin className="h-5 w-5" /> View LinkedIn Activity
              </a>
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <ScrollAnimation animation="fadeUp" delay={0.3}>
          <div className="mt-20 bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300 mb-6">
                Get the latest digital marketing insights, tips, and strategies delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                />
                <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  )
}
