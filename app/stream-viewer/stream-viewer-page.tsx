"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Hero from "../components/hero"
import { Loader2 } from "lucide-react"

export default function StreamViewerPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Playback ID derived from the stream key (19a5-grao-xfbs-eboo)
  const playbackId = "19a5grao"

  useEffect(() => {
    // Simulate loading the player
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Live Stream</h1>
            <p className="text-gray-300 mb-8 text-center">
              Watch our live broadcast and stay connected with our latest content and events.
            </p>
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="aspect-video flex items-center justify-center bg-zinc-800">
                <Loader2 className="h-12 w-12 animate-spin text-white/70" />
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src={`https://lvpr.tv?v=${playbackId}`}
                  allowFullScreen
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                ></iframe>
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Live Broadcast</h2>
              <p className="text-gray-400 mb-4">
                Welcome to our live stream! If the stream hasn't started yet, please check back later or refresh the
                page.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">Digital Marketing</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">SEO Tips</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">Live Q&A</span>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">About This Stream</h3>
            <p className="text-gray-300 mb-4">
              Join us for expert insights on digital marketing strategies, SEO optimization techniques, and answers to
              your most pressing questions about growing your online presence.
            </p>
            <p className="text-gray-300">
              Our live streams typically cover topics like keyword research, content strategy, technical SEO, and the
              latest industry trends to help your business thrive in the digital landscape.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Want to learn more about our streaming services?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/streaming"
                className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                Explore Streaming Platform
              </a>
              <a
                href="/#contact"
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

