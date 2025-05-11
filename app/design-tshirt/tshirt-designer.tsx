"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Hero from "../components/hero"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Eye, Edit2, ChevronLeft, Plus, LayersIcon } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { loadHtml2Canvas } from "@/app/components/dynamic-imports"

// Add the sample design image to the TSHIRT_COLORS array
const TSHIRT_COLORS = [
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
  { name: "Navy", value: "#0A1657" },
  { name: "Red", value: "#E71D36" },
  { name: "Green", value: "#2E933C" },
  { name: "Yellow", value: "#F9C80E" },
  { name: "Purple", value: "#6B2D5C" },
  { name: "Gray", value: "#6D6A75" },
]

// Add a sample design image URL
const SAMPLE_DESIGNS = ["/placeholder.svg?key=tq05b"]

export default function TShirtDesigner() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [tshirtColor, setTshirtColor] = useState("#FFFFFF")
  const [imageScale, setImageScale] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [imageRotation, setImageRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState("front")
  const [editMode, setEditMode] = useState(true)
  const [showMobileInterface, setShowMobileInterface] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const tshirtRef = useRef<HTMLDivElement>(null)
  const designAreaRef = useRef<HTMLDivElement>(null)

  const isMobile = useMediaQuery("(max-width: 768px)")

  // Set mounted state after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
    setShowMobileInterface(isMobile)

    // Set a sample design for demonstration
    if (!uploadedImage) {
      setUploadedImage(SAMPLE_DESIGNS[0])
    }
  }, [isMobile, uploadedImage])

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PNG or JPG image")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setError(null)

    // Create a URL for the uploaded image
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string)
        // Reset position, scale and rotation when new image is uploaded
        setImagePosition({ x: 0, y: 0 })
        setImageScale(1)
        setImageRotation(0)
      }
    }
    reader.readAsDataURL(file)
  }

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Handle image drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!uploadedImage) return

    setIsDragging(true)

    if ("touches" in e) {
      // Touch event
      setDragStart({
        x: e.touches[0].clientX - imagePosition.x,
        y: e.touches[0].clientY - imagePosition.y,
      })
    } else {
      // Mouse event
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      })
    }
  }

  // Handle image dragging
  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !uploadedImage) return

    let newX, newY

    if ("touches" in e) {
      // Touch event
      newX = e.touches[0].clientX - dragStart.x
      newY = e.touches[0].clientY - dragStart.y
    } else {
      // Mouse event
      newX = e.clientX - dragStart.x
      newY = e.clientY - dragStart.y
    }

    // Limit the dragging area to the t-shirt bounds
    const tshirtBounds = designAreaRef.current?.getBoundingClientRect()
    const imageBounds = imageRef.current?.getBoundingClientRect()

    if (tshirtBounds && imageBounds) {
      const maxX = tshirtBounds.width / 2 - imageBounds.width / 2
      const maxY = tshirtBounds.height / 2 - imageBounds.height / 2

      newX = Math.max(-maxX, Math.min(newX, maxX))
      newY = Math.max(-maxY, Math.min(newY, maxY))
    }

    setImagePosition({ x: newX, y: newY })
  }

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Handle image removal
  const handleRemoveImage = () => {
    setUploadedImage(null)
    setImagePosition({ x: 0, y: 0 })
    setImageScale(1)
    setImageRotation(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Manual download function without html2canvas
  const handleManualDownload = () => {
    if (!uploadedImage) return

    // Create a download link for the original image
    const link = document.createElement("a")
    link.download = `custom-tshirt-design-${Date.now()}.png`
    link.href = uploadedImage
    link.click()
  }

  // Handle download with dynamic import of html2canvas
  const handleDownload = async () => {
    if (!designAreaRef.current || !uploadedImage) return

    setIsDownloading(true)
    setError(null)

    try {
      // Dynamically import html2canvas using our client-side helper
      const html2canvasModule = await loadHtml2Canvas().catch((err) => {
        console.error("Failed to load html2canvas:", err)
        throw new Error("Could not load the design tool. Using fallback method.")
      })

      // If import successful, use html2canvas
      if (html2canvasModule.default) {
        const canvas = await html2canvasModule.default(designAreaRef.current, {
          backgroundColor: null,
          useCORS: true,
          scale: 2, // Higher scale for better quality
          logging: false, // Disable logging
        })

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL("image/png")

        // Create a download link
        const link = document.createElement("a")
        link.download = `custom-tshirt-design-${Date.now()}.png`
        link.href = dataUrl
        link.click()
      }
    } catch (error) {
      console.error("Error generating image:", error)
      setError("There was an error generating your design. Using original image instead.")
      // Fallback to downloading the original image
      handleManualDownload()
    } finally {
      setIsDownloading(false)
    }
  }

  // Toggle between edit and view modes
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  // Render the mobile interface
  const renderMobileInterface = () => {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Top navigation */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <button className="p-2">
            <ChevronLeft size={24} />
          </button>

          <button className="p-2">
            <Info size={24} />
          </button>

          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`p-3 ${editMode ? "bg-olive-600 text-white" : "bg-white"}`}
              onClick={() => setEditMode(true)}
            >
              <Edit2 size={20} />
            </button>
            <button
              className={`p-3 ${!editMode ? "bg-olive-600 text-white" : "bg-white"}`}
              onClick={() => setEditMode(false)}
            >
              <Eye size={20} />
            </button>
          </div>

          <button className="px-6 py-2 bg-lime-400 rounded-md font-semibold" onClick={handleDownload}>
            Save
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex justify-center p-2 bg-gray-100">
          <Tabs defaultValue="front" className="w-full max-w-md">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger
                value="front"
                className="rounded-full data-[state=active]:bg-olive-700 data-[state=active]:text-white"
              >
                Front side
              </TabsTrigger>
              <TabsTrigger
                value="back"
                className="rounded-full data-[state=active]:bg-olive-700 data-[state=active]:text-white"
              >
                Back side
              </TabsTrigger>
              <TabsTrigger
                value="neck"
                className="rounded-full data-[state=active]:bg-olive-700 data-[state=active]:text-white"
              >
                Neck label inner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="front" className="mt-0">
              {/* T-shirt preview */}
              <div className="bg-gray-100 p-4 flex justify-center">
                <div ref={tshirtRef} className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
                  {/* T-shirt outline */}
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 400"
                    fill={tshirtColor}
                    stroke="black"
                    strokeWidth="1"
                    className="absolute inset-0"
                  >
                    <path d="M75,50 L50,80 L25,70 L25,150 L50,350 L250,350 L275,150 L275,70 L250,80 L225,50 Z" />
                    <path d="M75,50 L150,80 L225,50" stroke="black" strokeWidth="1" fill="none" />
                    <ellipse cx="150" cy="50" rx="25" ry="10" fill="#DDDDDD" stroke="black" strokeWidth="1" />
                  </svg>

                  {/* Design area */}
                  <div
                    ref={designAreaRef}
                    className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed border-gray-400 flex items-center justify-center"
                  >
                    {uploadedImage && (
                      <div
                        className="absolute cursor-move"
                        style={{
                          transform: `translate(-50%, -50%) translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${imageRotation}deg)`,
                        }}
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDrag}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDrag}
                        onTouchEnd={handleDragEnd}
                      >
                        <img
                          ref={imageRef}
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded design"
                          className="max-w-full max-h-full object-contain"
                          style={{
                            transform: `scale(${imageScale})`,
                          }}
                          crossOrigin="anonymous"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="back">
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                Back side design coming soon
              </div>
            </TabsContent>

            <TabsContent value="neck">
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                Neck label design coming soon
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom navigation */}
        <div className="mt-auto border-t bg-white">
          <div className="flex justify-around items-center p-4">
            <button className="flex flex-col items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="text-sm mt-1">Variants</span>
            </button>

            <button className="bg-olive-800 w-14 h-14 rounded-full flex items-center justify-center -mt-8">
              <Plus size={24} color="white" />
            </button>

            <button className="flex flex-col items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <LayersIcon size={24} />
              </div>
              <span className="text-sm mt-1">Layers</span>
            </button>
          </div>

          {/* Color controls */}
          <div className="flex justify-around p-4 border-t">
            <button className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <ChevronLeft size={24} />
            </button>

            <button className="w-10 h-10 bg-gray-500 rounded-full border-2 border-white" />

            <button className="w-10 h-10 bg-gray-700 rounded-sm" />
          </div>
        </div>
      </div>
    )
  }

  // Render the desktop interface
  const renderDesktopInterface = () => {
    return (
      <main className="min-h-screen bg-black text-white">
        <Hero height="auto" fullScreen={false}>
          <div className="py-32 w-full max-w-4xl mx-auto">
            <div className="opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards]">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                Design Your Own T-Shirt Online – Make It Yours!
              </h1>
              <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                Ever wanted a t-shirt that's 100% you? Now you can create it in just minutes! Whether it's for personal
                style, your brand, or a special occasion, our easy-to-use online designer makes custom tees effortless.
              </p>
            </div>
          </div>
        </Hero>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-zinc-900">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Settle for Ordinary? Make It Personal!</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="text-blue-400 text-2xl mb-3">✔</div>
                <h3 className="text-xl font-semibold mb-2">Endless Creativity</h3>
                <p className="text-gray-300">Upload your own design, add text, or create from scratch.</p>
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="text-blue-400 text-2xl mb-3">✔</div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-300">Soft, durable fabrics with vibrant, long-lasting prints.</p>
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="text-blue-400 text-2xl mb-3">✔</div>
                <h3 className="text-xl font-semibold mb-2">No Minimums, No Limits</h3>
                <p className="text-gray-300">Order one for yourself or in bulk for your crew.</p>
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="text-blue-400 text-2xl mb-3">✔</div>
                <h3 className="text-xl font-semibold mb-2">Lightning-Fast Delivery</h3>
                <p className="text-gray-300">Get your custom tee shipped straight to your door.</p>
              </div>
            </div>

            <div className="text-center mb-12">
              <Button
                onClick={() => document.getElementById("designer-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg"
              >
                Create Your Custom Tee Now
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works (It's So Easy!)</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1️⃣
                </div>
                <h3 className="text-xl font-semibold mb-2">Pick your style & color</h3>
                <p className="text-gray-300">Choose from various t-shirt styles and colors.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2️⃣
                </div>
                <h3 className="text-xl font-semibold mb-2">Add your design</h3>
                <p className="text-gray-300">Upload your design, text, or logo in seconds.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3️⃣
                </div>
                <h3 className="text-xl font-semibold mb-2">Preview & tweak</h3>
                <p className="text-gray-300">Adjust until your design is perfect.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4️⃣
                </div>
                <h3 className="text-xl font-semibold mb-2">Place your order</h3>
                <p className="text-gray-300">Hit "Order" – and we'll handle the rest!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Vision Section */}
        <section className="py-16 bg-zinc-900">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Vision. Your Brand. Your Tee.</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Whether you're launching a brand, repping your business, or making a bold fashion statement, our custom
                t-shirts help you stand out.
              </p>
            </div>

            <div className="text-center mb-8">
              <p className="text-2xl font-bold text-blue-400 mb-6">🔥 Ready to design? Let's do this! 🔥</p>
              <Button
                onClick={() => document.getElementById("designer-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg"
              >
                Create Your Custom Tee Now
              </Button>
            </div>
          </div>
        </section>

        {/* Designer Section */}
        <section id="designer-section" className="py-16 bg-black">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Design Your T-Shirt</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* T-shirt preview area */}
              <div className="bg-zinc-900 rounded-xl p-6 flex items-center justify-center">
                <div
                  ref={tshirtRef}
                  className="relative w-full max-w-md h-[500px] mx-auto flex items-center justify-center"
                  style={{
                    backgroundColor: tshirtColor === "#FFFFFF" ? "#f5f5f5" : tshirtColor,
                  }}
                >
                  {/* Design area - this is what we'll capture for download */}
                  <div
                    ref={designAreaRef}
                    className="relative w-[200px] h-[250px] flex items-center justify-center perspective-[1000px]"
                  >
                    {uploadedImage && (
                      <div
                        className="absolute top-1/2 left-1/2 cursor-move perspective-[800px]"
                        style={{
                          transform: `translate(-50%, -50%) translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${imageRotation}deg)`,
                        }}
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDrag}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDrag}
                        onTouchEnd={handleDragEnd}
                      >
                        <div
                          className="transition-transform duration-300 ease-out transform-gpu"
                          style={{
                            transform: `rotateY(${imagePosition.x * 0.1}deg) rotateX(${-imagePosition.y * 0.1}deg)`,
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <img
                            ref={imageRef}
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Uploaded design"
                            className="max-w-[200px] max-h-[200px] object-contain shadow-lg"
                            style={{
                              transform: `scale(${imageScale}) translateZ(20px)`,
                              filter: "drop-shadow(0 10px 8px rgba(0, 0, 0, 0.5))",
                            }}
                            crossOrigin="anonymous"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* T-shirt outline overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 400 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M150,50 L100,100 L50,80 L50,200 L100,450 L300,450 L350,200 L350,80 L300,100 L250,50 Z"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path d="M150,50 L200,80 L250,50" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Controls area */}
              <div className="bg-zinc-900 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Customize Your Design</h2>

                {/* Image upload */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">1. Upload Your Image</h3>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={handleUploadClick} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      {uploadedImage ? "Change Image" : "Upload Image"}
                    </Button>

                    {uploadedImage && (
                      <Button onClick={handleRemoveImage} variant="destructive">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Remove
                      </Button>
                    )}
                  </div>

                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                  <p className="text-gray-400 text-sm mt-2">Supported formats: PNG, JPG. Max size: 5MB</p>
                </div>

                {/* T-shirt color selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">2. Choose T-Shirt Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {TSHIRT_COLORS.map((color) => (
                      <TooltipProvider key={color.value}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className={`w-10 h-10 rounded-full border-2 ${tshirtColor === color.value ? "border-white" : "border-transparent"}`}
                              style={{ backgroundColor: color.value }}
                              onClick={() => setTshirtColor(color.value)}
                              aria-label={`Select ${color.name} color`}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>

                {/* Image adjustments - only show if an image is uploaded */}
                {uploadedImage && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">3. Adjust Your Design</h3>

                    {/* Scale slider */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="scale-slider" className="text-sm">
                          Size
                        </Label>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setImageScale(Math.max(0.5, imageScale - 0.1))}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                          </Button>
                          <span className="mx-2 text-sm">{Math.round(imageScale * 100)}%</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setImageScale(Math.min(2, imageScale + 0.1))}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                          </Button>
                        </div>
                      </div>
                      <Slider
                        id="scale-slider"
                        min={0.5}
                        max={2}
                        step={0.01}
                        value={[imageScale]}
                        onValueChange={(value) => setImageScale(value[0])}
                      />
                    </div>

                    {/* Position controls */}
                    <div className="mb-4">
                      <Label className="text-sm block mb-2">Position</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-400">Horizontal</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <polyline points="5 9 2 12 5 15"></polyline>
                              <polyline points="9 5 12 2 15 5"></polyline>
                              <polyline points="15 19 12 22 9 19"></polyline>
                              <polyline points="19 9 22 12 19 15"></polyline>
                              <line x1="2" y1="12" x2="22" y2="12"></line>
                              <line x1="12" y1="2" x2="12" y2="22"></line>
                            </svg>
                          </div>
                          <Slider
                            min={-100}
                            max={100}
                            step={1}
                            value={[imagePosition.x]}
                            onValueChange={(value) => setImagePosition({ ...imagePosition, x: value[0] })}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-400">Vertical</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <line x1="12" y1="19" x2="12" y2="5"></line>
                              <polyline points="5 12 12 5 19 12"></polyline>
                            </svg>
                          </div>
                          <Slider
                            min={-100}
                            max={100}
                            step={1}
                            value={[imagePosition.y]}
                            onValueChange={(value) => setImagePosition({ ...imagePosition, y: value[0] })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rotation slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="rotation-slider" className="text-sm">
                          Rotation
                        </Label>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 text-gray-400"
                          >
                            <path d="M23 4v6h-6"></path>
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                          </svg>
                          <span className="text-sm">{imageRotation}°</span>
                        </div>
                      </div>
                      <Slider
                        id="rotation-slider"
                        min={-180}
                        max={180}
                        step={1}
                        value={[imageRotation]}
                        onValueChange={(value) => setImageRotation(value[0])}
                      />
                    </div>
                  </div>
                )}

                {/* Download button - only enable if an image is uploaded */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">4. Save Your Design</h3>
                  <Button
                    onClick={uploadedImage ? handleManualDownload : undefined}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!uploadedImage || isDownloading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    {isDownloading ? "Processing..." : "Download Design"}
                  </Button>
                  <p className="text-gray-400 text-sm mt-2">
                    {uploadedImage
                      ? "Click to download your custom t-shirt design"
                      : "Upload an image to create your design first"}
                  </p>
                  <p className="text-yellow-400 text-sm mt-4 font-semibold">Minimum order: 25 pieces</p>
                </div>
              </div>
            </div>

            {/* Instructions and tips */}
            <div className="mt-12 bg-zinc-900 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Design Tips</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Best Image Types</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Use transparent PNG files for best results</li>
                    <li>High contrast images work well on all t-shirt colors</li>
                    <li>Aim for at least 300 DPI for print-quality designs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sizing Guidelines</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Standard print area: 12" × 14" (30cm × 35cm)</li>
                    <li>Keep important elements away from the edges</li>
                    <li>Consider how the design will look when worn</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Color Combinations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Light designs work best on dark shirts</li>
                    <li>Dark designs work best on light shirts</li>
                    <li>Consider complementary colors for visual impact</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ordering Information</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>
                      <strong>Minimum order: 25 pieces</strong>
                    </li>
                    <li>Bulk discounts available for orders over 100 pieces</li>
                    <li>Production time: 7-10 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (!isMounted) {
    return null // Avoid rendering until client-side to prevent hydration issues
  }

  return showMobileInterface ? renderMobileInterface() : renderDesktopInterface()
}
