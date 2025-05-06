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
}: GsapScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const childrenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Animation configurations
    const animations = {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      },
      fadeRight: {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 },
      },
      fadeLeft: {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
      },
      scale: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      },
      stagger: {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0 },
      },
    }

    const selectedAnimation = animations[animation]
    let tween: gsap.core.Tween | gsap.core.Timeline

    if (animation === "stagger" && childrenRef.current) {
      // For stagger animation, animate each child
      const children = Array.from(childrenRef.current.children)
      tween = gsap.fromTo(children, selectedAnimation.from, {
        ...selectedAnimation.to,
        stagger: stagger,
        duration: duration,
        delay: delay,
        ease: "power3.out",
      })
    } else {
      // For other animations, animate the container
      tween = gsap.fromTo(elementRef.current, selectedAnimation.from, {
        ...selectedAnimation.to,
        duration: duration,
        delay: delay,
        ease: "power3.out",
      })
    }

    // Create ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers,
      toggleActions: once ? "play none none none" : "play reverse play reverse",
      animation: tween,
    })

    return () => {
      tween.kill()
      trigger.kill()
    }
  }, [animation, delay, duration, stagger, threshold, start, end, scrub, markers, once])

  return (
    <div ref={elementRef} className={className}>
      {animation === "stagger" ? <div ref={childrenRef}>{children}</div> : children}
    </div>
  )
}
