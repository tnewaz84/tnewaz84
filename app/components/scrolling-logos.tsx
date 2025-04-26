"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ScrollAnimation } from "./scroll-animation"

interface LogoProps {
  src: string
  alt: string
}

const logos: LogoProps[] = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1200px-Google_Cloud_logo.svg.png",
    alt: "Google Cloud Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/1200px-Microsoft_Azure_Logo.svg.png",
    alt: "Microsoft Azure Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/1200px-Adobe_After_Effects_CC_icon.svg.png",
    alt: "Adobe Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    alt: "Meta Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1200px-OpenAI_Logo.svg.png",
    alt: "OpenAI Logo",
  },
]

export default function ScrollingLogos() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Create duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="py-12 bg-zinc-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeUp">
          <h3 className="text-center text-xl font-bold mb-8">Trusted by Industry Leaders</h3>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-zinc-700 flex-grow"></div>
              <span className="px-4 text-sm text-zinc-500">Our Enterprise Partners</span>
              <div className="h-px bg-zinc-700 flex-grow"></div>
            </div>

            <div ref={scrollRef} className="relative overflow-hidden py-6">
              <motion.div
                className="flex items-center gap-16"
                animate={{ x: [0, -1500] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 30,
                  ease: "linear",
                }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      className="h-12 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
