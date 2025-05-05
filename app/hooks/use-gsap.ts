"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseGSAPOptions {
  scrollTrigger?: boolean
  animateOnMount?: boolean
}

export function useGSAP<T extends HTMLElement>(
  animationFunction: (element: T, tl: gsap.core.Timeline) => void,
  dependencies: any[] = [],
  options: UseGSAPOptions = { scrollTrigger: false, animateOnMount: true },
) {
  const elementRef = useRef<T>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Create a new GSAP context to ensure proper cleanup
    contextRef.current = gsap.context(() => {
      // Create a new timeline
      timelineRef.current = gsap.timeline({
        paused: !options.animateOnMount,
        scrollTrigger: options.scrollTrigger
          ? {
              trigger: elementRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          : undefined,
      })

      // Run the animation function
      animationFunction(elementRef.current, timelineRef.current)
    }, elementRef)

    // Clean up
    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, dependencies)

  return {
    ref: elementRef,
    play: () => timelineRef.current?.play(),
    pause: () => timelineRef.current?.pause(),
    restart: () => timelineRef.current?.restart(),
    reverse: () => timelineRef.current?.reverse(),
  }
}
