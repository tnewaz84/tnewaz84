"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useScroll } from "./scroll-provider"
import Link from "next/link"
import CalendlyBooking from "./calendly-booking"

// Update the HeroProps interface to include a showAuthButtons prop
interface HeroProps {
  children?: React.ReactNode
  height?: string
  fullScreen?: boolean
  showAuthButtons?: boolean
  backgroundImage?: string
  backgroundImageAlt?: string
}

// Update the function signature to include the new props
export default function Hero({
  children,
  height = "100vh",
  fullScreen = true,
  showAuthButtons = false,
  backgroundImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coverletter.jpg-WHIEHshELtJoa4Silh1zNgawy2WLxh.jpeg",
  backgroundImageAlt = "Tanvir Newaz background image",
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollProgress } = useScroll()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setIsMounted(true)

    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize with debounce
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 100)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !isMounted) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = windowSize.width
    canvas.height = windowSize.height

    const particles: Particle[] = []
    // Adjust particle count based on screen size
    const particleCount = windowSize.width < 768 ? 50 : 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      originalY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalY = this.y
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update(scrollProgress: number) {
        this.x += this.speedX
        this.y += this.speedY

        // Add subtle movement based on scroll position
        this.y = this.originalY + scrollProgress * 50

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId: number
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update(scrollProgress)
        particle.draw()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [scrollProgress, windowSize, isMounted])

  // Calculate parallax effect based on scroll
  const parallaxY = scrollProgress * 400 // Move down as user scrolls

  return (
    <div className={`relative w-full overflow-hidden`} style={{ height }}>
      {/* Background with fixed color */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.15,
          transform: `translateY(${parallaxY * 0.5}px)`,
        }}
        role="img"
        aria-label={backgroundImageAlt}
      ></div>

      {/* Particle animation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-transparent" aria-hidden="true"></canvas>

      {/* Content with parallax effect */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
        style={{
          transform: `translateY(${parallaxY * 0.3}px)`,
        }}
      >
        {children || (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl px-4"
          >
            <motion.h1
              className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Tanvir Newaz, Google Certified Project Manager and Data-Driven SEO Specialist
            </motion.h1>
            <motion.p
              className="max-w-[600px] mx-auto text-base sm:text-lg md:text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Digital Growth Architect
            </motion.p>

            {showAuthButtons && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/forum/register"
                  className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/forum/login"
                  className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 flex flex-col items-center justify-center min-h-[60vh]">
        {children}

        {showAuthButtons && (
          <div className="mt-8">
            <CalendlyBooking buttonText="Book a Free Consultation" />
          </div>
        )}
      </div>
    </div>
  )
}
