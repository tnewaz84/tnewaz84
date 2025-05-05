"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

interface GSAPAnimationsProps {
  targetSection?: string
  children?: React.ReactNode
}

export default function GSAPAnimations({ targetSection = ".hero-section", children }: GSAPAnimationsProps) {
  const animationContainerRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)
  const textRevealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Create floating elements animation
    const floatingElements = floatingElementsRef.current?.querySelectorAll(".floating-element")

    if (floatingElements && floatingElements.length > 0) {
      floatingElements.forEach((element, index) => {
        // Random starting position
        gsap.set(element, {
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          opacity: 0.3 + Math.random() * 0.7,
          scale: 0.5 + Math.random() * 0.5,
        })

        // Create floating animation
        gsap.to(element, {
          duration: 3 + Math.random() * 5,
          x: "+=30",
          y: "+=30",
          rotation: Math.random() * 360,
          opacity: 0.4 + Math.random() * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        })
      })

      // Create scroll-triggered animation for floating elements
      ScrollTrigger.create({
        trigger: targetSection,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(floatingElements, {
            y: self.progress * 100,
            scale: 0.5 + self.progress * 0.5,
            stagger: 0.05,
            overwrite: "auto",
            duration: 0.3,
          })
        },
      })
    }

    // Text reveal animation
    if (textRevealRef.current) {
      const textElement = textRevealRef.current
      const originalText = textElement.getAttribute("data-text") || ""

      gsap.set(textElement, { text: "" })

      ScrollTrigger.create({
        trigger: targetSection,
        start: "top 80%",
        onEnter: () => {
          gsap.to(textElement, {
            duration: 2,
            text: originalText,
            ease: "none",
            delay: 0.5,
          })
        },
        once: true,
      })
    }

    // Clean up animations
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [targetSection])

  return (
    <div ref={animationContainerRef} className="gsap-animations">
      {/* Floating elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="floating-element absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Text reveal element */}
      <div
        ref={textRevealRef}
        data-text="Transforming digital presence through data-driven strategies"
        className="text-reveal absolute bottom-10 left-0 right-0 text-center text-white/70 text-lg font-light"
      />

      {children}
    </div>
  )
}
