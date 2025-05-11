"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
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
            <a href="/" className="flex items-center">
              <div className="relative w-[50px] h-[50px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanvir%20newaz%20logo%20%281%29-TCjGk8KykAeFIutJcUZ0Yckm0nxBiA.png"
                  alt="Tanvir Newaz Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="ml-2 text-xl font-semibold text-white">Tanvir Newaz</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center justify-center">
            <ul className="flex space-x-8">
              <li>
                <a href="/" className="text-white hover:text-gray-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#services" className="text-white hover:text-gray-300 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/design-tshirt" className="text-white hover:text-gray-300 transition-colors">
                  T-Shirt Designer
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-white hover:text-gray-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/blog" className="text-white hover:text-gray-300 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/seo-analyzer" className="text-white hover:text-gray-300 transition-colors">
                  SEO Analyzer
                </a>
              </li>
              <li>
                <a href="/search-console-analyzer" className="text-white hover:text-gray-300 transition-colors">
                  Search Console
                </a>
              </li>
              <li>
                <a href="/ad-management" className="text-white hover:text-gray-300 transition-colors">
                  Ad Management
                </a>
              </li>
              <li>
                <a href="/streaming" className="text-white hover:text-gray-300 transition-colors">
                  Streaming
                </a>
              </li>
              <li>
                <a href="/ninjam" className="text-white hover:text-gray-300 transition-colors">
                  Ninjam
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-white hover:text-gray-300 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Phone Number */}
          <div className="hidden md:flex items-center">
            <a href="tel:+12012924983" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              <span>+1-201-292-4983</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4">
            <nav>
              <ul className="flex flex-col space-y-4">
                <li>
                  <a
                    href="/"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/#services"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/design-tshirt"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    T-Shirt Designer
                  </a>
                </li>
                <li>
                  <a
                    href="/#pricing"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/seo-analyzer"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    SEO Analyzer
                  </a>
                </li>
                <li>
                  <a
                    href="/search-console-analyzer"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Search Console
                  </a>
                </li>
                <li>
                  <a
                    href="/ad-management"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Ad Management
                  </a>
                </li>
                <li>
                  <a
                    href="/streaming"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Streaming
                  </a>
                </li>
                <li>
                  <a
                    href="/ninjam"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Ninjam
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="block text-white hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-6">
              <a href="tel:+12012924983" className="flex items-center text-white hover:text-gray-300 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1-201-292-4983</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
