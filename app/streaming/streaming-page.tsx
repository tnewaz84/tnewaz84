"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Hero from "../components/hero"
import { ScrollAnimation } from "../components/scroll-animation"
import { createStreamingChannel, getStreamingChannels, type StreamChannel } from "./actions"
import { Loader2, Plus, Video, Key, Link, Play, AlertCircle } from "lucide-react"

export default function StreamingPage() {
  const [channels, setChannels] = useState<StreamChannel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch existing channels on page load
  useEffect(() => {
    async function fetchChannels() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getStreamingChannels()
        setChannels(data)
      } catch (err) {
        setError("Failed to load streaming channels. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChannels()
  }, [])

  // Handle creating a new channel
  const handleCreateChannel = async () => {
    try {
      setIsCreating(true)
      setError(null)
      const newChannel = await createStreamingChannel()
      setChannels((prev) => [newChannel, ...prev])
    } catch (err) {
      setError("Failed to create a new streaming channel. Please try again later.")
      console.error(err)
    } finally {
      setIsCreating(false)
    }
  }

  // Helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  // Add a pre-configured channel to the UI (without affecting the API data)
  const allChannels = [
    {
      id: "pre-configured",
      name: "Pre-configured Channel",
      ingest: {
        url: "rtmp://rtmp.livepeer.com/live",
      },
      streamKey: "19a5-grao-xfbs-eboo",
      playbackId: "19a5grao",
      createdAt: new Date().toISOString(),
      status: "idle",
    },
    ...channels,
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Multi-Channel Streaming Platform</h1>
            <p className="text-gray-300 mb-8 text-center">
              Create and manage live streaming channels for your business, events, or personal content. Our platform
              leverages Livepeer technology for reliable, high-quality streaming.
            </p>
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <ScrollAnimation animation="fadeUp">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Your Streaming Channels</h2>
              <button
                onClick={handleCreateChannel}
                disabled={isCreating}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Create New Channel
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-900/50 rounded-md p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-white/70" />
                <p className="text-gray-300">Loading your streaming channels...</p>
              </div>
            ) : allChannels.length === 0 ? (
              <div className="bg-zinc-900 rounded-lg p-8 text-center">
                <Video className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-bold mb-2">No Streaming Channels Yet</h3>
                <p className="text-gray-400 mb-6">
                  Create your first streaming channel to get started with live broadcasting.
                </p>
                <button
                  onClick={handleCreateChannel}
                  disabled={isCreating}
                  className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
                >
                  {isCreating ? "Creating..." : "Create Your First Channel"}
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {allChannels.map((channel) => (
                  <div key={channel.id} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{channel.name || "Unnamed Channel"}</h3>
                        <p className="text-sm text-gray-400">Created: {new Date(channel.createdAt).toLocaleString()}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          channel.status === "active"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}
                      >
                        {channel.status === "active" ? "Live" : "Idle"}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-zinc-800 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <Link className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-sm font-medium">Ingest URL</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(channel.ingest?.url || "")}
                            className="text-xs text-blue-400 hover:underline"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-sm text-gray-300 break-all">{channel.ingest?.url || "N/A"}</p>
                      </div>

                      <div className="bg-zinc-800 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <Key className="h-4 w-4 mr-2 text-purple-400" />
                            <span className="text-sm font-medium">Stream Key</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(channel.streamKey)}
                            className="text-xs text-blue-400 hover:underline"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-sm text-gray-300 break-all">{channel.streamKey}</p>
                      </div>

                      <div className="bg-zinc-800 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <Play className="h-4 w-4 mr-2 text-green-400" />
                            <span className="text-sm font-medium">Playback ID</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(channel.playbackId)}
                            className="text-xs text-blue-400 hover:underline"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-sm text-gray-300 break-all">{channel.playbackId}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800">
                      <h4 className="text-sm font-medium mb-2">Playback URL</h4>
                      <div className="flex gap-4">
                        <a
                          href={`https://lvpr.tv?v=${channel.playbackId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline text-sm flex items-center"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Watch Stream
                        </a>
                        <button
                          onClick={() => copyToClipboard(`https://lvpr.tv?v=${channel.playbackId}`)}
                          className="text-blue-400 hover:underline text-sm flex items-center"
                        >
                          <Link className="h-4 w-4 mr-1" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.3}>
          <div className="max-w-4xl mx-auto mt-16 bg-zinc-900 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">How to Start Streaming</h3>
            <ol className="list-decimal pl-5 space-y-4 text-gray-300">
              <li>
                <p className="font-medium mb-1">Create a new streaming channel</p>
                <p className="text-sm text-gray-400">
                  Click the "Create New Channel" button above to generate a new streaming channel with unique
                  credentials.
                </p>
              </li>
              <li>
                <p className="font-medium mb-1">Set up your streaming software</p>
                <p className="text-sm text-gray-400">
                  Configure OBS Studio, Streamlabs, or any RTMP-compatible streaming software with your Ingest URL and
                  Stream Key.
                </p>
              </li>
              <li>
                <p className="font-medium mb-1">Start your broadcast</p>
                <p className="text-sm text-gray-400">
                  Begin streaming from your software. Your stream will be processed and made available through the
                  playback URL.
                </p>
              </li>
              <li>
                <p className="font-medium mb-1">Share your stream</p>
                <p className="text-sm text-gray-400">
                  Copy the playback URL and share it with your audience. They can watch your stream from any device with
                  a web browser.
                </p>
              </li>
            </ol>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.4}>
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Need Custom Streaming Solutions?</h3>
            <p className="text-gray-300 mb-6">
              Looking for branded streaming experiences, multi-camera setups, or enterprise-grade streaming
              infrastructure? Contact us for custom streaming solutions tailored to your business needs.
            </p>
            <a
              href="/#contact"
              className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  )
}

