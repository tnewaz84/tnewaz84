"use client"

import { useEffect } from "react"
import { CalendarClock } from "lucide-react"

interface CalendlyBookingProps {
  url: string
  className?: string
  buttonText?: string
  showIcon?: boolean
}

export default function CalendlyBooking({
  url = "https://calendly.com/data-driven-seo/1hour",
  className = "",
  buttonText = "Book a Consultation",
  showIcon = true,
}: CalendlyBookingProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up
      document.body.removeChild(script)
    }
  }, [])

  const openCalendly = () => {
    // @ts-ignore - Calendly is loaded via script
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: url,
      })
      return false
    }
  }

  return (
    <button
      onClick={openCalendly}
      className={`inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors ${className}`}
    >
      {showIcon && <CalendarClock className="h-5 w-5" />}
      {buttonText}
    </button>
  )
}
