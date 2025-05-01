"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SketchPicker } from "react-color"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, Type, Layers, Palette, Save, RotateCw, ZoomIn, Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import * as THREE from "three"

// Types for our design elements
type DesignElement = {
  id: string
  type: "image" | "text"
  content: string
  position: { x: number; y: number }
  scale: number
  rotation: number
  color?: string
  fontFamily?: string
  fontSize?: number
}

// T-shirt model component
function TShirtModel({
  color,
  designElements,
  isRotating,
}: {
  color: string
  designElements: DesignElement[]
  isRotating: boolean
}) {
  // Use a placeholder model if the GLB file isn't available yet
  const modelPath = "/t-shirt-model.glb"
  const { scene } = useGLTF(modelPath)
  const textureRef = useRef<HTMLCanvasElement | null>(null)

  // Create a canvas for the texture
  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 1024
    textureRef.current = canvas
    return () => {
      textureRef.current = null
    }
  }, [])

  // Update the texture when design elements change
  useEffect(() => {
    if (!textureRef.current) return

    const canvas = textureRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw design elements
    designElements.forEach((element) => {
      if (element.type === "image" && element.content) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = element.content
        img.onload = () => {
          if (!textureRef.current) return
          const ctx = textureRef.current.getContext("2d")
          if (!ctx) return

          // Calculate position (centered by default)
          const x = canvas.width / 2 + element.position.x * canvas.width - (img.width * element.scale) / 2
          const y = canvas.height / 2 + element.position.y * canvas.height - (img.height * element.scale) / 2

          // Save context state
          ctx.save()

          // Move to the center of where we want to draw the image
          ctx.translate(x + (img.width * element.scale) / 2, y + (img.height * element.scale) / 2)

          // Rotate around this center point
          ctx.rotate((element.rotation * Math.PI) / 180)

          // Draw the image with its center at the origin
          ctx.drawImage(
            img,
            -(img.width * element.scale) / 2,
            -(img.height * element.scale) / 2,
            img.width * element.scale,
            img.height * element.scale,
          )

          // Restore context state
          ctx.restore()

          // Update the texture
          updateTexture()
        }
      } else if (element.type === "text" && element.content) {
        if (!textureRef.current) return
        const ctx = textureRef.current.getContext("2d")
        if (!ctx) return

        // Set text properties
        ctx.font = `${element.fontSize || 48}px ${element.fontFamily || "Arial"}`
        ctx.fillStyle = element.color || "#000000"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Calculate position
        const x = canvas.width / 2 + element.position.x * canvas.width
        const y = canvas.height / 2 + element.position.y * canvas.height

        // Save context state
        ctx.save()

        // Move to the position where we want to draw the text
        ctx.translate(x, y)

        // Rotate around this point
        ctx.rotate((element.rotation * Math.PI) / 180)

        // Scale the text
        ctx.scale(element.scale, element.scale)

        // Draw the text centered at the origin
        ctx.fillText(element.content, 0, 0)

        // Restore context state
        ctx.restore()

        // Update the texture
        updateTexture()
      }
    })
  }, [designElements])

  // Function to update the texture on the 3D model
  const updateTexture = () => {
    if (!textureRef.current || !scene) return

    // Find the t-shirt mesh in the scene
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        // Create a new texture from the canvas
        const texture = new THREE.Texture(textureRef.current)
        texture.needsUpdate = true

        // Apply the texture to the material
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if (mat instanceof THREE.Material) {
              mat.map = texture
              mat.color.set(color)
              mat.needsUpdate = true
            }
          })
        } else if (child.material instanceof THREE.Material) {
          child.material.map = texture
          child.material.color.set(color)
          child.material.needsUpdate = true
        }
      }
    })
  }

  // Update the color when it changes
  useEffect(() => {
    if (!scene) return

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if (mat instanceof THREE.Material) {
              mat.color.set(color)
              mat.needsUpdate = true
            }
          })
        } else if (child.material instanceof THREE.Material) {
          child.material.color.set(color)
          child.material.needsUpdate = true
        }
      }
    })
  }, [color, scene])

  // Create a fallback mesh if the model fails to load
  const fallbackMesh = () => {
    return (
      <mesh>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }

  return scene ? (
    <primitive
      object={scene}
      scale={[1.5, 1.5, 1.5]}
      position={[0, -1, 0]}
      rotation={[0, isRotating ? performance.now() * 0.0005 : 0, 0]}
    />
  ) : (
    fallbackMesh()
  )
}

// Fallback component for loading state
function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <span className="ml-2 text-xl font-medium">Loading 3D Model...</span>
    </div>
  )
}

// Main component
export default function TShirtDesigner3D() {
  const [color, setColor] = useState("#ffffff")
  const [designElements, setDesignElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isRotating, setIsRotating] = useState(true)
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(1)
  const [activeTab, setActiveTab] = useState("upload")
  const [textInput, setTextInput] = useState("")
  const [textColor, setTextColor] = useState("#000000")
  const [textFont, setTextFont] = useState("Arial")
  const [textSize, setTextSize] = useState(48)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      })
      return
    }

    // Create a URL for the uploaded image
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        // Add the image to design elements
        const newElement: DesignElement = {
          id: `image-${Date.now()}`,
          type: "image",
          content: event.target.result as string,
          position: { x: 0, y: 0 },
          scale: 0.5,
          rotation: 0,
        }
        setDesignElements([...designElements, newElement])
        setSelectedElement(newElement.id)
        toast({
          title: "Image uploaded",
          description: "Your image has been added to the design",
        })
      }
    }
    reader.readAsDataURL(file)
  }

  // Handle text addition
  const handleAddText = () => {
    if (!textInput.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to add",
        variant: "destructive",
      })
      return
    }

    const newElement: DesignElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: textInput,
      position: { x: 0, y: 0 },
      scale: 1,
      rotation: 0,
      color: textColor,
      fontFamily: textFont,
      fontSize: textSize,
    }
    setDesignElements([...designElements, newElement])
    setSelectedElement(newElement.id)
    setTextInput("")
    toast({
      title: "Text added",
      description: "Your text has been added to the design",
    })
  }

  // Handle element selection
  const handleSelectElement = (id: string) => {
    setSelectedElement(id)
  }

  // Handle element deletion
  const handleDeleteElement = (id: string) => {
    setDesignElements(designElements.filter((element) => element.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
    toast({
      title: "Element deleted",
      description: "The design element has been removed",
    })
  }

  // Handle element position change
  const handlePositionChange = (axis: "x" | "y", value: number) => {
    if (!selectedElement) return

    setDesignElements(
      designElements.map((element) => {
        if (element.id === selectedElement) {
          return {
            ...element,
            position: {
              ...element.position,
              [axis]: value,
            },
          }
        }
        return element
      }),
    )
  }

  // Handle element scale change
  const handleScaleChange = (value: number) => {
    if (!selectedElement) return

    setDesignElements(
      designElements.map((element) => {
        if (element.id === selectedElement) {
          return {
            ...element,
            scale: value,
          }
        }
        return element
      }),
    )
  }

  // Handle element rotation change
  const handleRotationChange = (value: number) => {
    if (!selectedElement) return

    setDesignElements(
      designElements.map((element) => {
        if (element.id === selectedElement) {
          return {
            ...element,
            rotation: value,
          }
        }
        return element
      }),
    )
  }

  // Handle text color change
  const handleTextColorChange = (color: string) => {
    if (!selectedElement) {
      setTextColor(color)
      return
    }

    setDesignElements(
      designElements.map((element) => {
        if (element.id === selectedElement && element.type === "text") {
          return {
            ...element,
            color,
          }
        }
        return element
      }),
    )
  }

  // Handle text font change
  const handleTextFontChange = (font: string) => {
    if (!selectedElement) {
      setTextFont(font)
      return
    }

    setDesignElements(
      designElements.map((element) => {
        if (element.id === selectedElement && element.type === "text") {
          return {
            ...element,
            fontFamily: font,
          }
        }
        return element
      }),
    )
  }

  // Handle text size change
  const handleTextSizeChange = (size: number) => {
    if (!selectedElement) {
      setTextSize(size)
      return
    }

    setDesignElements(
      designElements.map((element) => {
        if (element.id === selectedElement && element.type === "text") {
          return {
            ...element,
            fontSize: size,
          }
        }
        return element
      }),
    )
  }

  // Handle design export
  const handleExportDesign = () => {
    // Capture the canvas
    const canvas = document.querySelector("canvas")
    if (!canvas) return

    try {
      // Create a download link
      const link = document.createElement("a")
      link.download = `tshirt-design-${Date.now()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()

      toast({
        title: "Design exported",
        description: "Your design has been downloaded as a PNG image",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your design. Please try again.",
        variant: "destructive",
      })
      console.error("Export error:", error)
    }
  }

  // Get the selected element
  const getSelectedElement = () => {
    return designElements.find((element) => element.id === selectedElement)
  }

  // T-shirt color options
  const tshirtColors = [
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Navy", value: "#0a192f" },
    { name: "Red", value: "#e11d48" },
    { name: "Green", value: "#16a34a" },
    { name: "Blue", value: "#2563eb" },
    { name: "Purple", value: "#7e22ce" },
    { name: "Yellow", value: "#eab308" },
    { name: "Gray", value: "#6b7280" },
  ]

  // Font options
  const fontOptions = [
    { name: "Arial", value: "Arial" },
    { name: "Times New Roman", value: "Times New Roman" },
    { name: "Courier New", value: "Courier New" },
    { name: "Georgia", value: "Georgia" },
    { name: "Verdana", value: "Verdana" },
    { name: "Impact", value: "Impact" },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">3D T-Shirt Designer</h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Create stunning custom t-shirts with our interactive 3D designer. Upload images, add text, and see your
            creation from all angles in real-time.
          </p>
        </div>
      </section>

      {/* Designer Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Design Tools Panel */}
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Design Tools</h2>

                  {/* Design Tools Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="upload" className="flex flex-col items-center">
                        <Upload className="h-4 w-4 mb-1" />
                        <span className="text-xs">Upload</span>
                      </TabsTrigger>
                      <TabsTrigger value="text" className="flex flex-col items-center">
                        <Type className="h-4 w-4 mb-1" />
                        <span className="text-xs">Text</span>
                      </TabsTrigger>
                      <TabsTrigger value="layers" className="flex flex-col items-center">
                        <Layers className="h-4 w-4 mb-1" />
                        <span className="text-xs">Layers</span>
                      </TabsTrigger>
                      <TabsTrigger value="colors" className="flex flex-col items-center">
                        <Palette className="h-4 w-4 mb-1" />
                        <span className="text-xs">Colors</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Upload Tab */}
                    <TabsContent value="upload" className="mt-0">
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <Upload className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-400 mb-2">Drag and drop an image or click to browse</p>
                          <Button onClick={() => fileInputRef.current?.click()}>Upload Image</Button>
                          <p className="text-xs text-gray-500 mt-2">Supported formats: PNG, JPG, SVG. Max size: 5MB.</p>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Text Tab */}
                    <TabsContent value="text" className="mt-0">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="text-input">Text Content</Label>
                          <Textarea
                            id="text-input"
                            placeholder="Enter your text here"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            className="resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="font-select">Font</Label>
                          <Select value={textFont} onValueChange={handleTextFontChange}>
                            <SelectTrigger id="font-select">
                              <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                              {fontOptions.map((font) => (
                                <SelectItem key={font.value} value={font.value}>
                                  {font.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="text-size">Font Size</Label>
                          <div className="flex items-center space-x-2">
                            <Slider
                              id="text-size"
                              min={12}
                              max={120}
                              step={1}
                              value={[textSize]}
                              onValueChange={(value) => handleTextSizeChange(value[0])}
                            />
                            <span className="w-12 text-center">{textSize}px</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Text Color</Label>
                          <div className="flex items-center space-x-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-10 h-10 p-0 border-2"
                                  style={{ backgroundColor: textColor }}
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 border-none bg-transparent">
                                <SketchPicker
                                  color={textColor}
                                  onChange={(color) => handleTextColorChange(color.hex)}
                                  disableAlpha
                                />
                              </PopoverContent>
                            </Popover>
                            <span className="text-sm">{textColor}</span>
                          </div>
                        </div>

                        <Button onClick={handleAddText} className="w-full">
                          Add Text to Design
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Layers Tab */}
                    <TabsContent value="layers" className="mt-0">
                      <div className="space-y-4">
                        {designElements.length === 0 ? (
                          <p className="text-gray-400 text-center py-4">
                            No design elements yet. Add images or text to get started.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {designElements.map((element) => (
                              <div
                                key={element.id}
                                className={`flex items-center justify-between p-2 rounded-md ${
                                  selectedElement === element.id ? "bg-blue-900 border border-blue-700" : "bg-zinc-800"
                                }`}
                                onClick={() => handleSelectElement(element.id)}
                              >
                                <div className="flex items-center">
                                  {element.type === "image" ? (
                                    <img
                                      src={element.content || "/placeholder.svg"}
                                      alt="Design element"
                                      className="w-8 h-8 object-contain mr-2"
                                    />
                                  ) : (
                                    <Type className="w-5 h-5 mr-2" />
                                  )}
                                  <span className="text-sm truncate max-w-[150px]">
                                    {element.type === "text" ? element.content : `Image ${element.id.split("-")[1]}`}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteElement(element.id)
                                  }}
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
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                  </svg>
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {selectedElement && (
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <h3 className="text-lg font-medium mb-3">Element Properties</h3>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Position X</Label>
                                <div className="flex items-center space-x-2">
                                  <Slider
                                    min={-0.5}
                                    max={0.5}
                                    step={0.01}
                                    value={[getSelectedElement()?.position.x || 0]}
                                    onValueChange={(value) => handlePositionChange("x", value[0])}
                                  />
                                  <span className="w-12 text-center">
                                    {(getSelectedElement()?.position.x || 0).toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Position Y</Label>
                                <div className="flex items-center space-x-2">
                                  <Slider
                                    min={-0.5}
                                    max={0.5}
                                    step={0.01}
                                    value={[getSelectedElement()?.position.y || 0]}
                                    onValueChange={(value) => handlePositionChange("y", value[0])}
                                  />
                                  <span className="w-12 text-center">
                                    {(getSelectedElement()?.position.y || 0).toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Scale</Label>
                                <div className="flex items-center space-x-2">
                                  <Slider
                                    min={0.1}
                                    max={2}
                                    step={0.01}
                                    value={[getSelectedElement()?.scale || 1]}
                                    onValueChange={(value) => handleScaleChange(value[0])}
                                  />
                                  <span className="w-12 text-center">
                                    {(getSelectedElement()?.scale || 1).toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Rotation</Label>
                                <div className="flex items-center space-x-2">
                                  <Slider
                                    min={-180}
                                    max={180}
                                    step={1}
                                    value={[getSelectedElement()?.rotation || 0]}
                                    onValueChange={(value) => handleRotationChange(value[0])}
                                  />
                                  <span className="w-12 text-center">{getSelectedElement()?.rotation || 0}°</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Colors Tab */}
                    <TabsContent value="colors" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">T-Shirt Color</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {tshirtColors.map((tColor) => (
                            <button
                              key={tColor.value}
                              className={`w-full h-12 rounded-md border-2 ${
                                color === tColor.value ? "border-white" : "border-transparent"
                              }`}
                              style={{ backgroundColor: tColor.value }}
                              onClick={() => setColor(tColor.value)}
                              aria-label={`Select ${tColor.name} color`}
                            />
                          ))}
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                          <h3 className="text-lg font-medium mb-3">Custom Color</h3>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full h-12 border-2"
                                style={{ backgroundColor: color }}
                              >
                                {color}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 border-none bg-transparent">
                              <SketchPicker color={color} onChange={(color) => setColor(color.hex)} disableAlpha />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Export Section */}
              <Card className="bg-zinc-900 border-zinc-800 mt-4">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Export Design</h2>
                  <Button onClick={handleExportDesign} className="w-full bg-green-600 hover:bg-green-700">
                    <Save className="mr-2 h-4 w-4" />
                    Download Design
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Your design will be exported as a high-resolution PNG image.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 3D Preview Panel */}
            <div className="lg:col-span-2">
              <Card className="bg-zinc-900 border-zinc-800 h-[600px]">
                <CardContent className="p-0 h-full">
                  {/* 3D Canvas */}
                  <div className="relative h-full">
                    <Canvas shadows>
                      <Suspense fallback={<LoadingFallback />}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
                        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                        <TShirtModel color={color} designElements={designElements} isRotating={isRotating} />
                        <OrbitControls
                          enablePan={true}
                          enableZoom={true}
                          enableRotate={true}
                          autoRotate={isRotating}
                          autoRotateSpeed={autoRotateSpeed}
                        />
                      </Suspense>
                    </Canvas>

                    {/* Controls Overlay */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="auto-rotate" className="text-sm">
                            Auto-Rotate
                          </Label>
                          <Switch id="auto-rotate" checked={isRotating} onCheckedChange={setIsRotating} />
                        </div>

                        {isRotating && (
                          <div className="flex items-center space-x-2">
                            <RotateCw className="h-4 w-4" />
                            <Slider
                              min={0.5}
                              max={5}
                              step={0.5}
                              value={[autoRotateSpeed]}
                              onValueChange={(value) => setAutoRotateSpeed(value[0])}
                              className="w-24"
                            />
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <ZoomIn className="h-4 w-4" />
                          <span className="text-xs">Scroll to zoom</span>
                        </div>

                        <Button variant="outline" size="sm" className="text-xs">
                          <Camera className="h-3 w-3 mr-1" />
                          AR View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* T-Shirt Style Selection */}
              <Card className="bg-zinc-900 border-zinc-800 mt-4">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">T-Shirt Style</h3>
                      <p className="text-sm text-gray-400">Select the style of your t-shirt</p>
                    </div>
                    <Select defaultValue="crewneck">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crewneck">Crewneck</SelectItem>
                        <SelectItem value="vneck">V-Neck</SelectItem>
                        <SelectItem value="tanktop">Tank Top</SelectItem>
                        <SelectItem value="longsleeve">Long Sleeve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Powerful Design Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="text-blue-400 text-2xl mb-3">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Real-Time 3D Preview</h3>
              <p className="text-gray-300">See your design from every angle with our interactive 3D preview.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="text-blue-400 text-2xl mb-3">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-300">Design on any device with our responsive interface.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="text-blue-400 text-2xl mb-3">🖼️</div>
              <h3 className="text-xl font-semibold mb-2">High-Quality Export</h3>
              <p className="text-gray-300">Download your design in high resolution for perfect prints.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="text-blue-400 text-2xl mb-3">👕</div>
              <h3 className="text-xl font-semibold mb-2">Multiple Styles</h3>
              <p className="text-gray-300">Choose from various t-shirt styles to match your preference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Your T-Shirt</h3>
              <p className="text-gray-300">Upload images, add text, and customize colors using our intuitive tools.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Preview in 3D</h3>
              <p className="text-gray-300">See your design from all angles with our interactive 3D preview.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Order Your Custom Tee</h3>
              <p className="text-gray-300">
                Place your order and receive your custom-designed t-shirt at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">What file formats can I upload?</h3>
              <p className="text-gray-300">
                You can upload PNG, JPG, and SVG files. For best results, we recommend using PNG files with
                transparency.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">What is the minimum order quantity?</h3>
              <p className="text-gray-300">
                Our minimum order quantity is 25 pieces per design. Bulk discounts are available for orders over 100
                pieces.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">How long does production and shipping take?</h3>
              <p className="text-gray-300">
                Production typically takes 7-10 business days. Shipping time depends on your location, but usually
                ranges from 3-7 business days.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Can I save my design and come back later?</h3>
              <p className="text-gray-300">
                Yes, you can save your design and return to it later. Simply create an account and your designs will be
                saved to your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-blue-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Custom T-Shirt?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Start designing now and bring your creative vision to life with our 3D t-shirt designer.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg"
          >
            Start Designing Now
          </Button>
        </div>
      </section>
    </main>
  )
}
