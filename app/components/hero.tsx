"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useScroll } from "./scroll-provider"
import Link from "next/link"
import CalendlyBooking from "./calendly-booking"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

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
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollProgress } = useScroll()

  // Initialize particle animation
  useEffect(() => {
    setIsMounted(true)

    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

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

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update(scrollProgress)
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [scrollProgress])

  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window === "undefined") return

    // Initial animations when component mounts
    const tl = gsap.timeline()

    if (headingRef.current && subheadingRef.current && ctaRef.current) {
      tl.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .fromTo(
          subheadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
    }

    // Particle animation with GSAP
    if (canvasRef.current) {
      gsap.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.inOut" })
    }

    // Background parallax effect
    if (backgroundRef.current && heroRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(backgroundRef.current, {
            y: self.progress * 150,
            ease: "none",
            duration: 0.1,
          })
        },
      })
    }

    // Text reveal animation on scroll
    if (headingRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "30% top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(headingRef.current, {
            scale: 1 - self.progress * 0.1,
            opacity: 1 - self.progress * 0.5,
            duration: 0.1,
          })
        },
      })
    }

    // Clean up animations and ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.killTweensOf([headingRef.current, subheadingRef.current, ctaRef.current, backgroundRef.current])
    }
  }, [isMounted])

  // Calculate parallax effect based on scroll
  const parallaxY = scrollProgress * 400 // Move down as user scrolls

  return (
    <div ref={heroRef} className={`relative w-full overflow-hidden`} style={{ height }} data-scroll-section>
      {/* Background with fixed color */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Background image with parallax effect */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.15,
        }}
        role="img"
        aria-label={backgroundImageAlt}
      ></div>

      {/* Particle animation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-transparent" aria-hidden="true"></canvas>

      {/* Content with GSAP animations */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {children || (
          <div className="max-w-4xl">
            <h1
              ref={headingRef}
              className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl"
              data-gsap="heading"
            >
              Tanvir Newaz, Google Certified Project Manager and Data-Driven SEO Specialist
            </h1>
            <p
              ref={subheadingRef}
              className="max-w-[600px] mx-auto text-lg text-gray-400 sm:text-xl"
              data-gsap="subheading"
            >
              The Digital Growth Architect
            </p>

            {showAuthButtons && (
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mt-8" data-gsap="cta">
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
              </div>
            )}
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-[60vh]">
        {children}

        {showAuthButtons && (
          <div className="mt-8" ref={ctaRef}>
            <CalendlyBooking buttonText="Book a Free Consultation" />
          </div>
        )}
      </div>
    </div>
  )
}
