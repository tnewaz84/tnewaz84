import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tanvir Newaz</h3>
            <p className="mb-4">Digital Growth Architect</p>
            <p className="mb-4">Helping businesses grow online with data-driven strategies.</p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/tanvirnewaz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/tanvirnewaz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#seo" className="hover:text-gray-300">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/#web-design" className="hover:text-gray-300">
                  Website Design
                </Link>
              </li>
              <li>
                <Link href="/#content" className="hover:text-gray-300">
                  Content Strategy
                </Link>
              </li>
              <li>
                <Link href="/#analytics" className="hover:text-gray-300">
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
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact Us
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Tanvir Newaz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
