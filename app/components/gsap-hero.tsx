"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import CalendlyBooking from "./calendly-booking"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

interface GsapHeroProps {
  showAuthButtons?: boolean
  backgroundImage?: string
  backgroundImageAlt?: string
}

export default function GsapHero({
  showAuthButtons = false,
  backgroundImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coverletter.jpg-WHIEHshELtJoa4Silh1zNgawy2WLxh.jpeg",
  backgroundImageAlt = "Tanvir Newaz background image",
}: GsapHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  // Initialize particles
  useEffect(() => {
    if (!particlesRef.current) return

    const canvas = particlesRef.current
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

    let scrollProgress = 0

    // Update scroll progress
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      )
      scrollProgress = scrollTop / (docHeight - windowHeight)
    }

    window.addEventListener("scroll", updateScrollProgress)

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
      if (!particlesRef.current) return
      particlesRef.current.width = window.innerWidth
      particlesRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", updateScrollProgress)
    }
  }, [])

  // GSAP animations
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !buttonsRef.current || !heroRef.current) return

    // Create a timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Split text for character animation
    if (typeof window !== "undefined") {
      const titleSplit = new SplitText(titleRef.current, { type: "chars,words" })

      tl.from(titleSplit.chars, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.02,
        duration: 1,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.4",
        )
        .from(
          buttonsRef.current.children,
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.4",
        )
    }

    // Parallax effect on scroll
    gsap.to(heroRef.current, {
      backgroundPositionY: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      tl.kill()
    }
  }, [])

  return (
    <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Background with fixed color */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.15,
        }}
        role="img"
        aria-label={backgroundImageAlt}
      ></div>

      {/* Particle animation canvas */}
      <canvas ref={particlesRef} className="absolute inset-0 h-full w-full bg-transparent" aria-hidden="true"></canvas>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <h1 ref={titleRef} className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            Tanvir Newaz, Google Certified Project Manager and Data-Driven SEO Specialist
          </h1>
          <p ref={subtitleRef} className="max-w-[600px] mx-auto text-lg text-gray-400 sm:text-xl">
            The Digital Growth Architect
          </p>

          {showAuthButtons && (
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
              <CalendlyBooking buttonText="Book a Free Consultation" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
