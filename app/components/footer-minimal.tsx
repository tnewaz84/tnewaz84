import Link from "next/link"

export default function FooterMinimal() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Tanvir Newaz</h3>
            <p className="text-sm text-gray-400">Digital Growth Architect</p>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/publication-policies" className="hover:text-gray-300">
                  Publication Policies
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Tanvir Newaz. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
