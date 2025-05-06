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
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    let splitText: SplitText | null = null
    let animation: gsap.core.Tween | gsap.core.Timeline | null = null

    // Create the animation based on the type
    const createAnimation = () => {
      if (!textRef.current) return null

      switch (animation) {
        case "chars":
          splitText = new SplitText(textRef.current, { type: "chars" })
          return gsap.from(splitText.chars, {
            opacity: 0,
            y: 20,
            rotationX: -90,
            stagger: stagger,
            duration: duration,
            ease: "power4.out",
            delay: delay,
          })

        case "words":
          splitText = new SplitText(textRef.current, { type: "words" })
          return gsap.from(splitText.words, {
            opacity: 0,
            y: 30,
            stagger: stagger * 3,
            duration: duration,
            ease: "power3.out",
            delay: delay,
          })

        case "lines":
          splitText = new SplitText(textRef.current, { type: "lines" })
          return gsap.from(splitText.lines, {
            opacity: 0,
            y: 50,
            stagger: stagger * 5,
            duration: duration,
            ease: "power2.out",
            delay: delay,
          })

        case "fade":
          return gsap.from(textRef.current, {
            opacity: 0,
            duration: duration,
            ease: "power2.out",
            delay: delay,
          })

        case "slide":
          return gsap.from(textRef.current, {
            opacity: 0,
            x: -50,
            duration: duration,
            ease: "power2.out",
            delay: delay,
          })

        default:
          return null
      }
    }

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: textRef.current,
      start: `top bottom-=${threshold * 100}%`,
      onEnter: () => {
        animation = createAnimation()
      },
      onLeaveBack: () => {
        if (!once && animation) {
          animation.reverse()
        }
      },
      onEnterBack: () => {
        if (!once && animation) {
          animation.play()
        }
      },
    })

    return () => {
      if (splitText) splitText.revert()
      if (animation) animation.kill()
      scrollTrigger.kill()
    }
  }, [animation, delay, duration, stagger, threshold, once, children])

  return (
    <Component ref={textRef} className={className}>
      {children}
    </Component>
  )
}
