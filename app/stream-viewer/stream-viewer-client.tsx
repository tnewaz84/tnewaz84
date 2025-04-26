"use client"

import { useState, useEffect } from "react"
import Hero from "../components/hero"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink } from "lucide-react"

export default function StreamViewerClient() {
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
          <div>
            <h1 className="text-4xl font-bold mb-4 text-center">Live Stream</h1>
            <p className="text-gray-300 mb-8 text-center">
              Watch our live broadcast and stay connected with our latest content and events.
            </p>
          </div>
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

          <div className="mt-12 bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Follow Us on Multiple Platforms</h3>
            <p className="text-gray-300 mb-6">
              We stream across multiple platforms to reach our audience wherever they are. Follow us on these platforms
              to never miss a broadcast:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-zinc-800 p-4 rounded-lg text-center">
                <img
                  src="https://play-lh.googleusercontent.com/OhZSLjRDLvFLqtDp9G_ErNQUiOucy4yvl3YUTZOl0vVtKCpHPfGiK_EUEpEWVPG2X3M"
                  alt="BIGO Live Logo"
                  className="h-16 w-16 mx-auto mb-3 rounded-lg"
                />
                <h4 className="font-bold mb-2">BIGO Live</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Join our interactive streams with live reactions and virtual gifts
                </p>
                <Button
                  size="sm"
                  className="bg-[#FFCB5B] text-black hover:bg-[#FFCB5B]/90 w-full"
                  onClick={() => window.open("https://www.bigo.tv/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Follow on BIGO
                </Button>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg text-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tnewaz%20%281%29.jpg-oADrvKKm2T5R5WOSPCEop7sZlqDY6a.jpeg"
                  alt="Kik Logo"
                  className="h-16 w-16 mx-auto mb-3 rounded-full"
                />
                <h4 className="font-bold mb-2">Kik</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Join our Kik group for exclusive content and direct messaging
                </p>
                <Button
                  size="sm"
                  className="bg-[#5AC8FA] text-black hover:bg-[#5AC8FA]/90 w-full"
                  onClick={() => window.open("https://www.kik.com/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join on Kik
                </Button>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg text-center">
                <img
                  src="https://assets.livepeer.org/icon-192x192.png"
                  alt="Livepeer Logo"
                  className="h-16 w-16 mx-auto mb-3 rounded-lg"
                />
                <h4 className="font-bold mb-2">Livepeer</h4>
                <p className="text-sm text-gray-400 mb-3">High-quality, reliable streams with professional features</p>
                <Button
                  size="sm"
                  className="bg-[#00EB88] text-black hover:bg-[#00EB88]/90 w-full"
                  onClick={() => window.open(`https://lvpr.tv?v=${playbackId}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Watch on Livepeer
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Want to learn more about our streaming services?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <a href="/streaming">Explore Streaming Platform</a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="/#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

