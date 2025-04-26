"use client"

import { useState } from "react"
import Hero from "../components/hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Play, LinkIcon, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StreamingPageClient() {
  // Pre-configured channel information
  const livepeerChannel = {
    name: "Pre-configured Channel",
    ingestUrl: "rtmp://rtmp.livepeer.com/live",
    streamKey: "19a5-grao-xfbs-eboo",
    playbackId: "19a5grao",
  }

  // Simple state for copy feedback
  const [copied, setCopied] = useState<string | null>(null)

  // Copy to clipboard function
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-center">Multi-Platform Streaming</h1>
            <p className="text-gray-300 mb-8 text-center">
              Create and manage live streaming channels across multiple platforms including Livepeer, BIGO Live, and
              Kik. Connect with your audience wherever they are.
            </p>
          </div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Your Streaming Platforms</h2>

          <Tabs defaultValue="livepeer" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="livepeer">Livepeer</TabsTrigger>
              <TabsTrigger value="bigo">BIGO Live</TabsTrigger>
              <TabsTrigger value="kik">Kik</TabsTrigger>
            </TabsList>

            <TabsContent value="livepeer">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>{livepeerChannel.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <LinkIcon className="h-4 w-4 mr-2 text-blue-400" />
                      Ingest URL
                    </h3>
                    <div className="flex items-center justify-between bg-zinc-800 p-3 rounded-md">
                      <code className="text-sm text-gray-300">{livepeerChannel.ingestUrl}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(livepeerChannel.ingestUrl, "ingest")}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {copied === "ingest" ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <LinkIcon className="h-4 w-4 mr-2 text-purple-400" />
                      Stream Key
                    </h3>
                    <div className="flex items-center justify-between bg-zinc-800 p-3 rounded-md">
                      <code className="text-sm text-gray-300">{livepeerChannel.streamKey}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(livepeerChannel.streamKey, "key")}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {copied === "key" ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Playback</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                        onClick={() => window.open(`https://lvpr.tv?v=${livepeerChannel.playbackId}`, "_blank")}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Stream
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                        onClick={() => copyToClipboard(`https://lvpr.tv?v=${livepeerChannel.playbackId}`, "url")}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {copied === "url" ? "Copied!" : "Copy URL"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bigo">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>BIGO Live Streaming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center p-4">
                    <img
                      src="https://play-lh.googleusercontent.com/OhZSLjRDLvFLqtDp9G_ErNQUiOucy4yvl3YUTZOl0vVtKCpHPfGiK_EUEpEWVPG2X3M"
                      alt="BIGO Live Logo"
                      className="h-24 w-24 rounded-xl"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">About BIGO Live</h3>
                    <p className="text-gray-300 text-sm">
                      BIGO Live is a leading live streaming platform that allows you to showcase your talents, connect
                      with friends, and earn rewards through virtual gifts.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Getting Started</h3>
                    <ol className="list-decimal pl-5 text-sm text-gray-300 space-y-2">
                      <li>Download the BIGO Live app from the App Store or Google Play</li>
                      <li>Create an account and complete your profile</li>
                      <li>Tap the "Go Live" button to start streaming</li>
                      <li>Share your stream link with your audience</li>
                    </ol>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      className="bg-[#FFCB5B] text-white hover:bg-[#FFCB5B]/90"
                      onClick={() => window.open("https://www.bigo.tv/", "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit BIGO Live
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kik">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Kik Messaging</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center p-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tnewaz%20%281%29.jpg-oADrvKKm2T5R5WOSPCEop7sZlqDY6a.jpeg"
                      alt="Kik Logo"
                      className="h-24 w-24 rounded-full"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">About Kik</h3>
                    <p className="text-gray-300 text-sm">
                      Kik is a popular messaging app that allows you to connect with friends and share content. While
                      not primarily a streaming platform, you can share videos and engage with your audience through
                      group chats.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Using Kik for Content Sharing</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
                      <li>Create a public group for your followers</li>
                      <li>Share recorded content and updates</li>
                      <li>Use Kik codes to make it easy for fans to find you</li>
                      <li>Engage directly with your audience through chat</li>
                    </ul>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      className="bg-[#5AC8FA] text-white hover:bg-[#5AC8FA]/90"
                      onClick={() => window.open("https://www.kik.com/", "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Kik
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="bg-zinc-900 p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-bold mb-4">Multi-Platform Streaming Strategy</h3>
            <p className="text-gray-300 mb-4">
              Maximize your reach by streaming to multiple platforms simultaneously. Here's how to create an effective
              multi-platform strategy:
            </p>
            <ol className="list-decimal pl-5 space-y-4 text-gray-300">
              <li>
                <p className="font-medium mb-1">Choose the right platforms for your audience</p>
                <p className="text-sm text-gray-400">
                  Different platforms attract different demographics. Livepeer offers professional streaming
                  capabilities, BIGO Live is popular for entertainment and talent showcasing, while Kik provides direct
                  messaging engagement.
                </p>
              </li>
              <li>
                <p className="font-medium mb-1">Use a stream splitter</p>
                <p className="text-sm text-gray-400">
                  Tools like OBS Studio or Streamlabs can send your stream to multiple platforms simultaneously using
                  stream keys from each service.
                </p>
              </li>
              <li>
                <p className="font-medium mb-1">Engage across platforms</p>
                <p className="text-sm text-gray-400">
                  Consider using a chat aggregator to see and respond to comments from all platforms in one place.
                </p>
              </li>
              <li>
                <p className="font-medium mb-1">Optimize content for each platform</p>
                <p className="text-sm text-gray-400">
                  Each platform has different video quality requirements and audience expectations. Tailor your approach
                  accordingly.
                </p>
              </li>
            </ol>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Need Custom Streaming Solutions?</h3>
            <p className="text-gray-300 mb-6">
              Looking for help setting up multi-platform streaming, branded experiences, or enterprise-grade streaming
              infrastructure? Contact us for custom streaming solutions tailored to your business needs.
            </p>
            <Button asChild className="bg-white text-black hover:bg-white/90">
              <a href="/#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
