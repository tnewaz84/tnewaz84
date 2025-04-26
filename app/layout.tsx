import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ScrollProvider } from "./components/scroll-provider"
import Header from "./components/header"
import Footer from "./components/footer"
import AIChatBot from "./components/ai-chat-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tanvir Newaz | Digital Growth Architect",
  description: "Google Certified Project Manager and Data-Driven SEO Specialist",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanvir%20newaz%20logo%20%281%29-TCjGk8KykAeFIutJcUZ0Yckm0nxBiA.png"
        />
        <meta name="google-site-verification" content="Fo3ZBazHn97bIm2HUzlSwOfw7HLl5rDShjkdBPEOYnk" />
      </head>
      <body className={inter.className}>
        <ScrollProvider>
          <Header />
          {children}
          <Footer />
          <AIChatBot />
        </ScrollProvider>
      </body>
    </html>
  )
}
