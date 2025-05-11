"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

interface GsapTextAnimationProps {
  children: React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span"
  className?: string
  animation?: "chars" | "words" | "lines" | "fade" | "slide"
  delay?: number
  duration?: number
  stagger?: number
  threshold?: number
  once?: boolean
}

export default function GsapTextAnimation({
  children,
  as: Component = "div",
  className = "",
  animation = "chars",
  delay = 0,
  duration = 1,
  stagger = 0.02,
  threshold = 0.2,
  once = true,
}: GsapTextAnimationProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    const ctx = gsap.context(() => {
      const element = containerRef.current
      if (!element) return

      if (animation === "chars") {
        // Split text into characters if needed
        let chars
        try {
          chars = SplitText ? new SplitText(element, { type: "chars" }).chars : element.textContent?.split("") || []
        } catch (error) {
          console.error("Error splitting text:", error)
          return
        }

        gsap.fromTo(
          chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      } else if (animation === "words") {
        // Split text into words if needed
        let words
        try {
          words = SplitText ? new SplitText(element, { type: "words" }).words : element.textContent?.split(" ") || []
        } catch (error) {
          console.error("Error splitting text:", error)
          return
        }

        gsap.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      } else {
        // Default fade animation
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay || 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [animation, delay])

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  )
}
