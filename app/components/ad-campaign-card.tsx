"use client"

import { useState } from "react"
import { ArrowRight, BarChart2, Target, DollarSign, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AdCampaignCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden border-0 shadow-xl max-w-md mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 bg-gradient-to-r from-black to-zinc-800 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          <div className="text-center px-6">
            <h2 className="text-2xl font-bold text-white mb-2">Tired of wasting money on ineffective ads?</h2>
            <p className="text-gray-200">Our expert-managed ad campaigns deliver real results</p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <CardContent className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-4 text-center">Professional Ad Campaign Management</h3>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <DollarSign className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">What's your ad budget?</p>
              <p className="text-sm text-gray-600">We work with budgets of all sizes to maximize your ROI</p>
            </div>
          </div>

          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Transparent pricing</p>
              <p className="text-sm text-gray-600">Just $25 for every $100 spent on ads (25% management fee)</p>
            </div>
          </div>

          <div className="flex items-start">
            <Target className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Manual campaign setup</p>
              <p className="text-sm text-gray-600">No automated tools - we personally craft each campaign</p>
            </div>
          </div>

          <div className="flex items-start">
            <BarChart2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Guaranteed ROI</p>
              <p className="text-sm text-gray-600">We're confident our campaigns will deliver results</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-black hover:bg-zinc-800 text-white">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-xs text-center text-gray-500 mt-4">
          *Results may vary based on industry, competition, and product/service quality
        </p>
      </CardContent>
    </Card>
  )
}

