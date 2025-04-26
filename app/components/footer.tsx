"use client"

import { Facebook, Github, Linkedin, Instagram, Twitter, PinIcon as PinterestIcon } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/tnewaz84",
      icon: <Facebook className="h-5 w-5" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/tnewaz84",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "Pinterest",
      url: "https://www.pinterest.com/tanvirSEOexpert/",
      icon: <PinterestIcon className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tanvir-newaz/",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/tnewaz84/",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      url: "https://x.com/tnewaz84",
      icon: <Twitter className="h-5 w-5" />,
    },
  ]

  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="relative w-[60px] h-[60px] mr-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanvir%20newaz%20logo%20%281%29-TCjGk8KykAeFIutJcUZ0Yckm0nxBiA.png"
                alt="Tanvir Newaz Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-white">Tanvir Newaz</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="mailto:tnewaz84@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              Email
            </a>
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
              Refund Policy
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-800 text-gray-400 hover:bg-white hover:text-black transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Tanvir Newaz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
