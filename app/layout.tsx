import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/header"
import Footer from "./components/footer"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Tanvir Newaz | Digital Growth Architect",
    template: "%s | Tanvir Newaz",
  },
  description: "Digital marketing expert specializing in SEO, content strategy, and growth marketing.",
  keywords: ["digital marketing", "SEO", "content strategy", "growth marketing", "web development"],
  authors: [{ name: "Tanvir Newaz" }],
  creator: "Tanvir Newaz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tanvirnewaz.com",
    title: "Tanvir Newaz | Digital Growth Architect",
    description: "Digital marketing expert specializing in SEO, content strategy, and growth marketing.",
    siteName: "Tanvir Newaz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvir Newaz | Digital Growth Architect",
    description: "Digital marketing expert specializing in SEO, content strategy, and growth marketing.",
    creator: "@tanvirnewaz",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="google-news-showcase" strategy="afterInteractive">
          {`
            (function() {
              var script = document.createElement('script');
              script.src = 'https://news.google.com/swg/js/v1/swg-basic.js';
              script.async = true;
              script.onload = function() {
                if (self.googlenewsstand) {
                  self.googlenewsstand.setupSubscriptionButtons({
                    publisherId: 'tanvirnewaz.com'
                  });
                }
              };
              document.head.appendChild(script);
            })();
          `}
        </Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
