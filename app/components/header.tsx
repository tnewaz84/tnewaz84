"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!isMounted) return

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, isMounted])

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/make-money-online", label: "Make Money" },
    { href: "/design-tshirt", label: "T-Shirt Designer" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/seo-analyzer", label: "SEO Analyzer" },
    { href: "/search-console-analyzer", label: "Search Console" },
    { href: "/ad-management", label: "Ad Management" },
    { href: "/streaming", label: "Streaming" },
    { href: "/ninjam", label: "Ninjam" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanvir%20newaz%20logo%20%281%29-TCjGk8KykAeFIutJcUZ0Yckm0nxBiA.png"
                  alt="Tanvir Newaz Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="ml-2 text-lg sm:text-xl font-semibold text-white">Tanvir Newaz</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center justify-center">
            <ul className="flex flex-wrap space-x-6 xl:space-x-8">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white hover:text-gray-300 transition-colors whitespace-nowrap">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Phone Number */}
          <div className="hidden md:flex items-center">
            <a href="tel:+12012924983" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              <span className="whitespace-nowrap">+1-201-292-4983</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white focus:outline-none menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-md mobile-menu overflow-y-auto max-h-[calc(100vh-80px)]"
          >
            <div className="container mx-auto px-4 py-4">
              <nav>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-white hover:text-gray-300 transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6">
                <a
                  href="tel:+12012924983"
                  className="flex items-center text-white hover:text-gray-300 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1-201-292-4983</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
