"use client"

import type React from "react"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// Only register plugins if GSAP is available
if (typeof gsap !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  } catch (error) {
    console.error("Error registering GSAP plugins:", error)
  }
}

export { gsap, ScrollTrigger, SplitText }

// Hook for basic GSAP animation
export const useGsapAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  animation: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const anim = animation(element)

    return () => {
      anim.kill()
    }
  }, dependencies)
}

// Hook for GSAP ScrollTrigger
export const useGsapScrollTrigger = (
  elementRef: React.RefObject<HTMLElement>,
  animation: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  triggerOptions: ScrollTrigger.Vars = {},
  dependencies: any[] = [],
) => {
  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const anim = animation(element)

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      animation: anim,
      toggleActions: "play none none reverse",
      ...triggerOptions,
    })

    return () => {
      scrollTrigger.kill()
      anim.kill()
    }
  }, dependencies)
}

// Text reveal animation
export const createTextRevealAnimation = (element: HTMLElement) => {
  const splitText = new SplitText(element, { type: "words,chars" })

  return gsap.timeline().from(splitText.chars, {
    opacity: 0,
    y: 20,
    rotationX: -90,
    stagger: 0.02,
    duration: 0.8,
    ease: "power4.out",
  })
}

// Staggered fade in animation
export const createStaggeredFadeIn = (elements: HTMLElement[] | NodeListOf<Element>) => {
  return gsap.timeline().from(elements, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out",
  })
}

// Parallax effect
export const createParallaxEffect = (element: HTMLElement, strength = 0.5) => {
  return ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      gsap.to(element, {
        y: self.progress * 100 * strength,
        ease: "none",
        overwrite: "auto",
      })
    },
  })
}
