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
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const totalHeight = document.body.scrollHeight - window.innerHeight

      // Update scroll position
      setScrollY(currentScrollY)

      // Determine scroll direction
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up")
      setLastScrollY(currentScrollY)

      // Calculate scroll progress (0 to 1)
      setScrollProgress(Math.min(Math.max(currentScrollY / totalHeight, 0), 1))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollDirection, scrollProgress }}>{children}</ScrollContext.Provider>
  )
}
