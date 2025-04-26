"use client"

import Hero from "@/app/components/hero"
import { BlockchainCalculator } from "./blockchain-calculator"
import { motion } from "framer-motion"

export default function BlockchainCalculatorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl px-4 text-center"
        >
          <motion.h1
            className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Blockchain Reward Calculator
          </motion.h1>
          <motion.p
            className="max-w-[600px] mx-auto text-base md:text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Estimate your potential earnings from contributing to blockchain networks based on your device
            specifications and connectivity.
          </motion.p>
        </motion.div>
      </Hero>

      <section className="py-8 md:py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <BlockchainCalculator />
        </div>
      </section>
    </main>
  )
}

