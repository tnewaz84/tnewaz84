"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Add event listener with debounce
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 100)
    }

    window.addEventListener("scroll", debouncedHandleScroll)

    // Initial check
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    {
      name: "Tools",
      children: [
        { name: "SEO Analyzer", path: "/seo-analyzer" },
        { name: "Search Console Analyzer", path: "/search-console-analyzer" },
        { name: "Ad Management", path: "/ad-management" },
        { name: "Blockchain Calculator", path: "/blockchain-calculator" },
        { name: "Make Money Online", path: "/make-money-online" },
        { name: "T-Shirt Designer", path: "/design-tshirt" },
        { name: "3D T-Shirt Designer", path: "/3d-tshirt-designer" },
      ],
    },
    {
      name: "Services",
      children: [
        { name: "Streaming", path: "/streaming" },
        { name: "NinJam", path: "/ninjam" },
      ],
    },
    { name: "Forum", path: "/forum" },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            Tanvir Newaz
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`flex items-center text-sm font-medium ${
                        link.children.some((child) => isActive(child.path))
                          ? "text-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link
                          href={child.path}
                          className={`w-full px-3 py-2 text-sm ${
                            isActive(child.path)
                              ? "bg-zinc-800 text-white"
                              : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium ${
                    isActive(link.path) ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name} className="space-y-2">
                    <div className="font-medium text-white">{link.name}</div>
                    <div className="pl-4 space-y-2 border-l border-zinc-700">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.path}
                          className={`block text-sm ${
                            isActive(child.path) ? "text-white font-medium" : "text-gray-300 hover:text-white"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`text-sm font-medium ${
                      isActive(link.path) ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
