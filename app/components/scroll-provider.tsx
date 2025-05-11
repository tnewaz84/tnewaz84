"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface ScrollContextType {
  scrollY: number
  scrollDirection: "up" | "down"
  scrollProgress: number
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollDirection: "down",
  scrollProgress: 0,
})

export const useScroll = () => useContext(ScrollContext)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const scrollY = window.scrollY || 0
      const windowHeight = window.innerHeight || 1
      const documentHeight = document.documentElement?.scrollHeight || document.body?.scrollHeight || 1

      // Calculate scroll progress safely
      const maxScroll = documentHeight - windowHeight
      const progress = maxScroll <= 0 ? 0 : scrollY / maxScroll

      setScrollProgress(progress)
    }

    // Initial call
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollDirection, scrollProgress }}>{children}</ScrollContext.Provider>
  )
}
