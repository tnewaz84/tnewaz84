import Link from "next/link"
import { RedisStatus } from "./redis-status"
import { Component, type ErrorInfo, type ReactNode } from "react"

// Simple error boundary for client components
class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Component error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Tanvir Newaz</h3>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">Digital Growth Architect</p>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              Helping businesses grow online with data-driven strategies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/tanvirnewaz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 text-sm sm:text-base"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/tanvirnewaz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 text-sm sm:text-base"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/#services" className="hover:text-gray-300">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-gray-300">
                  Website Design
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-gray-300">
                  Content Strategy
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-gray-300">
                  Analytics & Reporting
                </Link>
              </li>
              <li>
                <Link href="/seo-analyzer" className="hover:text-gray-300">
                  SEO Analyzer Tool
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Company</h3>
            <ul className="grid grid-cols-2 gap-1 sm:gap-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-gray-300">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/publication-policies" className="hover:text-gray-300">
                  Publication Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2 mt-6">
          <ErrorBoundary fallback={<span className="text-xs text-gray-500">Status unavailable</span>}>
            <RedisStatus />
          </ErrorBoundary>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Tanvir Newaz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
