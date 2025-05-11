"use client"

import { useRef, useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface GsapScrollAnimationProps {
  children: ReactNode
  animation?: "fadeIn" | "fadeUp" | "fadeRight" | "fadeLeft" | "scale" | "stagger"
  delay?: number
  duration?: number
  stagger?: number
  threshold?: number
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  once?: boolean
  className?: string
  childSelector?: string
}

export function GsapScrollAnimation({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  threshold = 0.2,
  start = "top bottom-=100",
  end = "bottom top",
  scrub = false,
  markers = false,
  once = true,
  className = "",
  childSelector,
}: GsapScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Fix: Get direct children elements without using the invalid selector
      let elements

      if (childSelector) {
        // If a specific child selector is provided, use it
        elements = containerRef.current?.querySelectorAll(childSelector)
      } else {
        // Otherwise, get all direct children using Array.from
        elements = containerRef.current ? Array.from(containerRef.current.children) : []
      }

      if (!elements || elements.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Apply different animations based on the animation prop
      if (animation === "stagger") {
        tl.fromTo(
          elements,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
        )
      } else if (animation === "fadeUp") {
        tl.fromTo(elements, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      } else if (animation === "fadeRight") {
        tl.fromTo(elements, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      } else if (animation === "fadeLeft") {
        tl.fromTo(elements, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      } else if (animation === "scale") {
        tl.fromTo(elements, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" })
      } else {
        // Default animation (fadeIn)
        tl.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [animation, childSelector, delay, duration, end, markers, once, scrub, stagger, start, threshold])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
