"use client"

import Hero from "../components/hero"
import Link from "next/link"
import { CheckCircle, Calculator, ArrowRight, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"

export default function MakeMoneyOnlinePage() {
  // Add state to track if component is mounted
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render animations until component is mounted
  if (!isMounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <div className="opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards]">
            <h1 className="text-4xl font-bold mb-4 text-center">Make Money Online</h1>
            <p className="text-gray-300 mb-8 text-center">
              Discover multiple ways to earn money online, from passive income with blockchain networks to creating your
              own cryptocurrency and earning referral bonuses.
            </p>
          </div>
        </div>
      </Hero>

      <section className="py-16 bg-black">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blockchain Reward Calculator */}
            <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-xl opacity-0 animate-[fadeIn_0.8s_ease-in-out_0.2s_forwards]">
              <div className="p-6 md:p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-blue-600 p-3 rounded-lg mr-4">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Blockchain Reward Calculator</h3>
                    <p className="text-gray-300">
                      Estimate your potential earnings from contributing to blockchain networks based on your device
                      specifications and connectivity.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Real-time token price data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Support for multiple blockchain networks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Customizable device specifications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Daily, weekly, and monthly projections</span>
                  </li>
                </ul>

                <Link
                  href="/blockchain-calculator"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors w-full"
                >
                  Try the Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Chime Referral */}
            <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-xl opacity-0 animate-[fadeIn_0.8s_ease-in-out_0.3s_forwards]">
              <div className="p-6 md:p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-green-500 p-3 rounded-lg mr-4">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Chime Referral: Get $100</h3>
                    <p className="text-gray-300">
                      Open a Chime account using our referral link, set up direct deposit, and we both get $100 each!
                    </p>
                  </div>
                </div>

                <div className="mb-6 bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  {/* Placeholder image since the original URL might be causing issues */}
                  <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Chime Banking App and Card</span>
                  </div>
                  <p className="text-sm text-gray-300 italic">
                    "Your money shouldn't cost money" - Enjoy no monthly fees, early direct deposit, and fee-free
                    overdraft.
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Get $100 when you sign up and set up direct deposit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>No monthly fees or minimum balance requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Get paid up to 2 days early with direct deposit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span>Fee-free overdraft up to $200</span>
                  </li>
                </ul>

                <a
                  href="https://chime.com/r/tanvirnewaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors w-full"
                >
                  Sign Up & Get $100
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Create Your Own Crypto */}
            <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-xl opacity-0 animate-[fadeIn_0.8s_ease-in-out_0.4s_forwards]">
              <div className="p-6 md:p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-purple-600 p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22L3 17V7L12 2L21 7V17L12 22ZM12 20L19 16V8L12 4L5 8V16L12 20Z" />
                      <path d="M12 11L8 9V13L12 15L16 13V9L12 11Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Create Your Own Crypto</h3>
                    <p className="text-gray-300">
                      Launch your own cryptocurrency or token without coding using CoinManufactory's smart contract
                      platform.
                    </p>
                  </div>
                </div>

                <div className="mb-6 bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  {/* Placeholder image since the original URL might be causing issues */}
                  <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400">CoinManufactory Smart Contract Platform</span>
                  </div>
                  <p className="text-sm text-gray-300 italic">
                    "The easy and convenient way to create your own cryptocurrency without coding."
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                    <span>No coding knowledge required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                    <span>Create tokens on multiple blockchains</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                    <span>Manage and earn with your own cryptocurrency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                    <span>Full control over token economics</span>
                  </li>
                </ul>

                <a
                  href="https://coinmanufactory.com?afl=NjcyM2Y1OGZhZDdmYmFhMDU2YjlmNTk3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors w-full"
                >
                  Create Your Token
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center opacity-0 animate-[fadeIn_0.8s_ease-in-out_0.5s_forwards]">
            <h2 className="text-2xl font-bold mb-4">Start Your Online Income Journey Today</h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you're looking to earn passive income through blockchain networks, get cash bonuses through
              referrals, or launch your own cryptocurrency, there are multiple ways to make money online. Start
              exploring these opportunities today!
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Questions? Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

