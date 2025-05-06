import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ScrollProvider } from "./components/scroll-provider"
import Header from "./components/header"
import Footer from "./components/footer"
import AIChatBot from "./components/ai-chat-bot"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tanvir Newaz | Digital Growth Architect",
  description:
    "Tanvir Newaz, Google Certified Project Manager and Data-Driven SEO Specialist. The Digital Growth Architect specializing in data-driven marketing strategies.",
  metadataBase: new URL("https://tanvirnewaz.com"),
  openGraph: {
    title: "Tanvir Newaz | Digital Growth Architect",
    description:
      "Tanvir Newaz, Google Certified Project Manager and Data-Driven SEO Specialist. The Digital Growth Architect specializing in data-driven marketing strategies.",
    type: "website",
    locale: "en_US",
    url: "https://tanvirnewaz.com",
    siteName: "Tanvir Newaz",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanvir-social-card-Rl9Ik8KykAeFIutJcUZ0YckmCnxBiA.png",
        width: 1200,
        height: 630,
        alt: "Tanvir Newaz - Digital Growth Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvir Newaz | Digital Growth Architect",
    description:
      "Tanvir Newaz, Google Certified Project Manager and Data-Driven SEO Specialist. The Digital Growth Architect specializing in data-driven marketing strategies.",
    creator: "@tanvirnewaz",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanvir-social-card-Rl9Ik8KykAeFIutJcUZ0YckmCnxBiA.png",
    ],
  },
  alternates: {
    canonical: "https://tanvirnewaz.com",
  },
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanvir%20newaz%20logo%20%281%29-TCjGk8KykAeFIutJcUZ0Yckm0nxBiA.png"
        />
        <meta name="google-site-verification" content="Fo3ZBazHn97bIm2HUzlSwOfw7HLl5rDShjkdBPEOYnk" />
        <meta name="calendly-booking" content="https://calendly.com/data-driven-seo/1hour" />
      </head>
      <body className={inter.className}>
        <ScrollProvider>
          <Header />
          {children}
          <Footer />
          {/* Chat bot with error handling */}
          <div suppressHydrationWarning>
            <AIChatBot />
          </div>
        </ScrollProvider>
        <Script
          async
          type="application/javascript"
          src="https://news.google.com/swg/js/v1/swg-basic.js"
          strategy="afterInteractive"
        />
        <Script id="google-showcase-init" strategy="afterInteractive">
          {`
            (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAow7PSzCw:openaccess",
                clientOptions: { theme: "light", lang: "en" },
              });
            });
          `}
        </Script>
      </body>
    </html>
  )
}
