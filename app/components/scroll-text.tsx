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

interface ScrollTextProps {
  children: React.ReactNode
  stagger?: number
  duration?: number
  y?: number
  className?: string
}

export default function ScrollText({
  children,
  stagger = 0.05,
  duration = 0.8,
  y = 50,
  className = "",
}: ScrollTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<any>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Create a context for proper cleanup
    const ctx = gsap.context(() => {
      // Create SplitText instance
      splitRef.current = new SplitText(textRef.current, {
        type: "lines,words,chars",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
      })

      const { chars, lines } = splitRef.current

      // Set initial state
      gsap.set(chars, { y, opacity: 0 })

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power3.out",
          })
        },
        onLeaveBack: () => {
          gsap.to(chars, {
            y,
            opacity: 0,
            duration,
            stagger: stagger / 2,
            ease: "power3.in",
          })
        },
      })
    }, textRef)

    // Clean up
    return () => {
      ctx.revert()
      if (splitRef.current) {
        splitRef.current.revert()
      }
    }
  }, [stagger, duration, y])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
