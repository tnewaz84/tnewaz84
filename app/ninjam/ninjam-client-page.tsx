"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Hero from "../components/hero"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Play,
  Pause,
  SkipForward,
  Mic,
  MicOff,
  Users,
  Music,
  Volume2,
  VolumeX,
  MessageSquare,
  Send,
  Download,
  Info,
} from "lucide-react"
import { connectToNinjamServer, disconnectFromServer } from "./actions"

export default function NinjamClientPage() {
  // State for connection
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [serverAddress, setServerAddress] = useState("ninjam.server.example.com:2049")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)

  // State for audio
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([75])
  const [bpm, setBpm] = useState(120)
  const [currentBeat, setCurrentBeat] = useState(1)
  const [totalBeats, setTotalBeats] = useState(16)

  // State for chat
  const [messages, setMessages] = useState<{ user: string; message: string; timestamp: string }[]>([
    {
      user: "System",
      message: "Welcome to Ninjam! Connect to a server to start jamming.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [messageInput, setMessageInput] = useState("")

  // State for users
  const [users, setUsers] = useState<{ id: string; name: string; instrument: string; isPlaying: boolean }[]>([])

  // Refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current)
      }
    }
  }, [])

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Handle connection to server
  const handleConnect = async () => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      // In a real implementation, this would connect to an actual Ninjam server
      // For demo purposes, we'll simulate a connection
      const result = await connectToNinjamServer(serverAddress, username)

      if (result.success) {
        setIsConnected(true)
        // Add connection message to chat
        setMessages((prev) => [
          ...prev,
          {
            user: "System",
            message: `Connected to ${serverAddress}`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ])

        // Add some demo users
        setUsers([
          { id: "1", name: "GuitarHero42", instrument: "Guitar", isPlaying: true },
          { id: "2", name: "BassMaster", instrument: "Bass", isPlaying: true },
          { id: "3", name: "DrummerGirl", instrument: "Drums", isPlaying: false },
          { id: "4", name: username, instrument: "Unknown", isPlaying: false },
        ])

        // Start metronome
        startMetronome()
      } else {
        setError(result.error || "Failed to connect to server")
      }
    } catch (err) {
      console.error("Error connecting to server:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  // Handle disconnection from server
  const handleDisconnect = async () => {
    try {
      await disconnectFromServer()

      // Stop metronome
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current)
        metronomeIntervalRef.current = null
      }

      setIsConnected(false)
      setIsPlaying(false)
      setUsers([])

      // Add disconnection message to chat
      setMessages((prev) => [
        ...prev,
        {
          user: "System",
          message: "Disconnected from server",
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    } catch (err) {
      console.error("Error disconnecting from server:", err)
    }
  }

  // Start/stop metronome
  const startMetronome = () => {
    if (metronomeIntervalRef.current) {
      clearInterval(metronomeIntervalRef.current)
    }

    const beatDuration = 60000 / bpm / 4 // 16th notes

    metronomeIntervalRef.current = setInterval(() => {
      setCurrentBeat((prev) => {
        const nextBeat = (prev % totalBeats) + 1

        // Play metronome sound on beat 1, 5, 9, 13 (quarter notes)
        if (nextBeat % 4 === 1 && !isMuted && isPlaying && audioContextRef.current) {
          playMetronomeSound(nextBeat === 1 ? 880 : 440) // Higher pitch on beat 1
        }

        return nextBeat
      })
    }, beatDuration)

    setIsPlaying(true)
  }

  const stopMetronome = () => {
    if (metronomeIntervalRef.current) {
      clearInterval(metronomeIntervalRef.current)
      metronomeIntervalRef.current = null
    }

    setIsPlaying(false)
  }

  // Play metronome sound
  const playMetronomeSound = (frequency: number) => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.type = "sine"
    oscillator.frequency.value = frequency

    gainNode.gain.value = (volume[0] / 100) * 0.2 // Adjust volume

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.start()
    oscillator.stop(audioContextRef.current.currentTime + 0.05) // Short duration
  }

  // Handle sending chat messages
  const handleSendMessage = () => {
    if (!messageInput.trim() || !isConnected) return

    // Add message to chat
    setMessages((prev) => [
      ...prev,
      {
        user: username,
        message: messageInput,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])

    // Clear input
    setMessageInput("")

    // Simulate response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          user: "GuitarHero42",
          message: "Nice playing! Let's try a different rhythm.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    }, 3000)
  }

  // Handle keydown for chat
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Ninjam Music Collaboration</h1>
            <p className="text-gray-300 mb-8 text-center">
              Play music in sync with others around the world. Our Ninjam server keeps everyone on beat for seamless
              real-time collaboration.
            </p>
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {!isConnected ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Connect to the Streaming Network</CardTitle>
                <CardDescription className="text-gray-400">Enter your details to join a jam session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Server Address</label>
                  <Input
                    value={serverAddress}
                    onChange={(e) => setServerAddress(e.target.value)}
                    placeholder="server:port"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-900/50 rounded-md p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full bg-white text-black hover:bg-white/90"
                >
                  {isConnecting ? "Connecting..." : "Connect to Server"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main jam interface */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Jam Session</CardTitle>
                      <Button variant="destructive" size="sm" onClick={handleDisconnect}>
                        Disconnect
                      </Button>
                    </div>
                    <CardDescription className="text-gray-400">
                      Connected to {serverAddress} as {username}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Metronome visualization */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-gray-400">BPM: {bpm}</div>
                        <div className="text-sm text-gray-400">
                          Beat: {currentBeat}/{totalBeats}
                        </div>
                      </div>
                      <div className="grid grid-cols-16 gap-1 mb-4">
                        {Array.from({ length: totalBeats }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-8 rounded-sm ${
                              i + 1 === currentBeat ? "bg-green-500" : (i + 1) % 4 === 1 ? "bg-zinc-700" : "bg-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Transport controls */}
                    <div className="flex justify-center space-x-4 mb-6">
                      <Button
                        variant="outline"
                        size="icon"
                        className={`rounded-full ${isPlaying ? "bg-green-900/30 text-green-400 border-green-800" : "bg-zinc-800 border-zinc-700"}`}
                        onClick={() => (isPlaying ? stopMetronome() : startMetronome())}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-zinc-800 border-zinc-700"
                        onClick={() => setCurrentBeat(1)}
                      >
                        <SkipForward className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className={`rounded-full ${isMuted ? "bg-red-900/30 text-red-400 border-red-800" : "bg-zinc-800 border-zinc-700"}`}
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-zinc-800 border-zinc-700"
                        onClick={() => {
                          // Toggle microphone
                          const updatedUsers = [...users]
                          const userIndex = updatedUsers.findIndex((u) => u.name === username)
                          if (userIndex >= 0) {
                            updatedUsers[userIndex].isPlaying = !updatedUsers[userIndex].isPlaying
                            setUsers(updatedUsers)
                          }
                        }}
                      >
                        {users.find((u) => u.name === username)?.isPlaying ? (
                          <Mic className="h-5 w-5 text-green-400" />
                        ) : (
                          <MicOff className="h-5 w-5" />
                        )}
                      </Button>
                    </div>

                    {/* Volume control */}
                    <div className="flex items-center space-x-4 mb-6">
                      <Volume2 className="h-5 w-5 text-gray-400" />
                      <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                      <span className="text-sm text-gray-400 w-8 text-right">{volume[0]}%</span>
                    </div>

                    {/* Tabs for different settings */}
                    <Tabs defaultValue="mixer">
                      <TabsList className="grid grid-cols-6 mb-4">
                        <TabsTrigger value="mixer">Mixer</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="record">Record</TabsTrigger>
                        <TabsTrigger value="facebook">Facebook</TabsTrigger>
                        <TabsTrigger value="youtube">YouTube</TabsTrigger>
                        <TabsTrigger value="twitch">Twitch</TabsTrigger>
                      </TabsList>

                      <TabsContent value="mixer" className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {users.map((user) => (
                            <div key={user.id} className="bg-zinc-800 p-3 rounded-md">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium truncate">{user.name}</span>
                                <div
                                  className={`h-2 w-2 rounded-full ${user.isPlaying ? "bg-green-500" : "bg-red-500"}`}
                                />
                              </div>
                              <div className="text-xs text-gray-400 mb-2">{user.instrument}</div>
                              <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="settings" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">BPM</label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={bpm}
                                onChange={(e) => {
                                  const newBpm = Number.parseInt(e.target.value)
                                  if (newBpm >= 40 && newBpm <= 240) {
                                    setBpm(newBpm)
                                    if (isPlaying) {
                                      stopMetronome()
                                      setTimeout(startMetronome, 10)
                                    }
                                  }
                                }}
                                className="bg-zinc-800 border-zinc-700 text-white"
                              />
                              <Button
                                variant="outline"
                                className="bg-zinc-800 border-zinc-700"
                                onClick={() => {
                                  setBpm(120)
                                  if (isPlaying) {
                                    stopMetronome()
                                    setTimeout(startMetronome, 10)
                                  }
                                }}
                              >
                                Reset
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Beats Per Measure</label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={totalBeats / 4}
                                onChange={(e) => {
                                  const newBeats = Number.parseInt(e.target.value)
                                  if (newBeats >= 1 && newBeats <= 16) {
                                    setTotalBeats(newBeats * 4)
                                  }
                                }}
                                className="bg-zinc-800 border-zinc-700 text-white"
                              />
                              <Button
                                variant="outline"
                                className="bg-zinc-800 border-zinc-700"
                                onClick={() => setTotalBeats(16)}
                              >
                                Reset
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Instrument</label>
                            <select className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md p-2">
                              <option value="guitar">Guitar</option>
                              <option value="bass">Bass</option>
                              <option value="drums">Drums</option>
                              <option value="keyboard">Keyboard</option>
                              <option value="vocals">Vocals</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Audio Input</label>
                            <select className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md p-2">
                              <option value="default">Default Input</option>
                              <option value="mic1">Microphone 1</option>
                              <option value="mic2">Microphone 2</option>
                              <option value="line1">Line In 1</option>
                            </select>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="record" className="space-y-4">
                        <div className="bg-zinc-800 p-4 rounded-md">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-white">Recording Options</h3>
                            <Button variant="outline" size="sm" className="bg-red-900/30 text-red-400 border-red-800">
                              Start Recording
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="record-local" className="rounded bg-zinc-700" />
                              <label htmlFor="record-local" className="text-sm">
                                Record local audio
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="record-remote" className="rounded bg-zinc-700" checked />
                              <label htmlFor="record-remote" className="text-sm">
                                Record remote audio
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="record-mixed" className="rounded bg-zinc-700" checked />
                              <label htmlFor="record-mixed" className="text-sm">
                                Record mixed audio
                              </label>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-zinc-700">
                            <h4 className="text-sm font-medium mb-2 text-white">Previous Recordings</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center bg-zinc-700 p-2 rounded-md">
                                <span className="text-sm">Jam_Session_2023-06-19.wav</span>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex justify-between items-center bg-zinc-700 p-2 rounded-md">
                                <span className="text-sm">Blues_Jam_2023-06-18.wav</span>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="facebook" className="space-y-4">
                        <div className="bg-zinc-800 p-4 rounded-md">
                          <div className="flex items-center justify-center p-4">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png"
                              alt="Facebook Logo"
                              className="h-24 w-24 rounded-xl"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-white">Facebook Live Streaming</h3>
                            <p className="text-gray-300 text-sm">
                              Stream directly to your Facebook profile, page, or group. Reach your audience on one of
                              the world's largest social platforms.
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-zinc-700">
                            <Button className="w-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90">
                              Connect Facebook Account
                            </Button>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="youtube" className="space-y-4">
                        <div className="bg-zinc-800 p-4 rounded-md">
                          <div className="flex items-center justify-center p-4">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png"
                              alt="YouTube Logo"
                              className="h-24 w-24 rounded-xl"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-white">YouTube Live</h3>
                            <p className="text-gray-300 text-sm">
                              Stream to YouTube and reach your subscribers. Take advantage of YouTube's powerful
                              discovery features and chat functionality.
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-zinc-700">
                            <Button className="w-full bg-[#FF0000] text-white hover:bg-[#FF0000]/90">
                              Connect YouTube Account
                            </Button>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="twitch" className="space-y-4">
                        <div className="bg-zinc-800 p-4 rounded-md">
                          <div className="flex items-center justify-center p-4">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/1200px-Twitch_logo.svg.png"
                              alt="Twitch Logo"
                              className="h-24 w-24 rounded-xl"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-white">Twitch Streaming</h3>
                            <p className="text-gray-300 text-sm">
                              Connect to Twitch and stream to the premier platform for gamers and creative content.
                              Engage with viewers through Twitch's interactive features.
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-zinc-700">
                            <Button className="w-full bg-[#9146FF] text-white hover:bg-[#9146FF]/90">
                              Connect Twitch Account
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Chat and users sidebar */}
              <div className="space-y-6">
                {/* Users list */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center text-white">
                        <Users className="h-5 w-5 mr-2" />
                        Users ({users.length})
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center justify-between bg-zinc-800 p-2 rounded-md">
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full ${user.isPlaying ? "bg-green-500" : "bg-red-500"} mr-2`}
                            />
                            <span>{user.name}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-400">
                            <Music className="h-3 w-3 mr-1" />
                            {user.instrument}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Chat */}
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-white">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div
                      ref={chatContainerRef}
                      className="h-[300px] overflow-y-auto p-4 space-y-2 border-b border-zinc-800"
                    >
                      {messages.map((msg, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center">
                            <span className="font-medium">{msg.user}</span>
                            <span className="text-xs text-gray-400 ml-2">{msg.timestamp}</span>
                          </div>
                          <p className="text-gray-300">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 flex items-center space-x-2">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-zinc-800 border-zinc-700"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">How to Use Ninjam</h3>
                <p className="text-gray-300 mb-4">
                  Ninjam (Network Jam) allows musicians to play together in real-time over the internet. Here's how to
                  get started:
                </p>
                <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                  <li>
                    <p className="font-medium">Connect your audio interface or microphone to your computer</p>
                    <p className="text-sm text-gray-400">
                      For the best experience, use a low-latency audio interface with ASIO drivers.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Connect to a Ninjam server</p>
                    <p className="text-sm text-gray-400">
                      Enter the server address and your username, then click "Connect to Server".
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Adjust your settings</p>
                    <p className="text-sm text-gray-400">
                      Set your BPM, instrument type, and audio input in the Settings tab.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Start jamming!</p>
                    <p className="text-sm text-gray-400">
                      Press the Play button to start the metronome and begin playing along with others.
                    </p>
                  </li>
                </ol>

                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <h4 className="font-bold mb-2 text-white">For Advanced Users</h4>
                  <p className="text-gray-300 mb-4">
                    For a more professional setup, you can download and install the full Ninjam client software:
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.cockos.com/ninjam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Ninjam Client
                    </a>
                    <a
                      href="https://github.com/wahjam/wahjam2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Wahjam (Alternative Client)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Need help setting up your own Ninjam server?</p>
            <a
              href="/#contact"
              className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

