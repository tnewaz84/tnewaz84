"use client"

import React from "react"

import { useRef, type ReactNode, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useScroll } from "./scroll-provider"

interface ScrollAnimationProps {
  children: ReactNode
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  animation?: "fadeIn" | "fadeUp" | "fadeRight" | "fadeLeft" | "scale" | "stagger"
  className?: string
  staggerChildren?: number
  staggerDelay?: number
}

export function ScrollAnimation({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.2,
  animation = "fadeUp",
  className = "",
  staggerChildren = 0.1,
  staggerDelay = 0,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()
  const { scrollProgress } = useScroll()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    stagger: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      if (once) {
        setHasAnimated(true)
      }
    } else if (!isInView && !once && hasAnimated) {
      controls.start("hidden")
      setHasAnimated(false)
    }
  }, [isInView, controls, once, hasAnimated])

  const selectedAnimation = animations[animation]

  const childVariants = animation === "stagger" ? animations.stagger : undefined

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedAnimation}
      transition={{
        duration,
        delay: delay + scrollProgress * 0.1, // Slightly adjust delay based on scroll progress
        ease: "easeOut",
        staggerChildren: animation === "stagger" ? staggerChildren : 0,
        delayChildren: animation === "stagger" ? staggerDelay : 0,
      }}
      className={className}
    >
      {animation === "stagger" && childVariants
        ? React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child
            return (
              <motion.div variants={childVariants} transition={{ duration: duration * 0.8 }}>
                {child}
              </motion.div>
            )
          })
        : children}
    </motion.div>
  )
}
