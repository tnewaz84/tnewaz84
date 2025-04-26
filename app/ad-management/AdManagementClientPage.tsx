"use client"

import Hero from "../components/hero"
import { motion } from "framer-motion"
import AdCampaignCard from "../components/ad-campaign-card"
import { CheckCircle, Target, BarChart2, DollarSign, Users, TrendingUp } from "lucide-react"
import AdCopyGenerator from "./ad-copy-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdManagementClientPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Professional Ad Campaign Management</h1>
            <p className="text-gray-300 mb-8 text-center">
              Stop wasting money on ineffective ads. Our expert-managed campaigns deliver real results with a guaranteed
              return on investment.
            </p>

            <Tabs defaultValue="services" className="mt-12">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="services">Ad Management Services</TabsTrigger>
                <TabsTrigger value="generator">Ad Copy Generator</TabsTrigger>
              </TabsList>

              <TabsContent value="services">
                <AdCampaignCard />
              </TabsContent>

              <TabsContent value="generator">
                <AdCopyGenerator />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Why Choose Our Ad Management?</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Transparent Pricing</p>
                    <p className="text-gray-400">
                      We charge just $25 for every $100 spent on ads (25% management fee). No hidden costs or surprises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Target className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Manual Campaign Setup</p>
                    <p className="text-gray-400">
                      We don't rely on automated tools. Each campaign is manually crafted and optimized by our experts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <BarChart2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Guaranteed ROI</p>
                    <p className="text-gray-400">
                      We're so confident in our approach that we guarantee a positive return on your investment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Flexible Budgets</p>
                    <p className="text-gray-400">
                      Whether you have $500 or $50,000 to spend, we'll create a campaign that maximizes your budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Our Process</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-zinc-800 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Consultation & Strategy</p>
                    <p className="text-gray-400">
                      We discuss your goals, target audience, and budget to develop a customized strategy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-zinc-800 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Campaign Creation</p>
                    <p className="text-gray-400">
                      Our experts manually set up your campaigns with precise targeting and compelling ad creative.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-zinc-800 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Continuous Optimization</p>
                    <p className="text-gray-400">
                      We monitor performance daily and make adjustments to improve results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-zinc-800 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Reporting & Analysis</p>
                    <p className="text-gray-400">
                      Receive detailed reports showing exactly how your budget is performing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">What Our Ad Management Includes</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-zinc-800 p-5 rounded-lg">
                <Users className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-bold mb-2">Audience Research</h3>
                <p className="text-sm text-gray-300">Identifying the perfect target audience for maximum engagement</p>
              </div>

              <div className="bg-zinc-800 p-5 rounded-lg">
                <Target className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-bold mb-2">Custom Ad Creative</h3>
                <p className="text-sm text-gray-300">Eye-catching designs and compelling copy that converts</p>
              </div>

              <div className="bg-zinc-800 p-5 rounded-lg">
                <BarChart2 className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-bold mb-2">Performance Tracking</h3>
                <p className="text-sm text-gray-300">Detailed analytics to measure campaign effectiveness</p>
              </div>

              <div className="bg-zinc-800 p-5 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-bold mb-2">Conversion Optimization</h3>
                <p className="text-sm text-gray-300">Continuous improvements to maximize your ROI</p>
              </div>

              <div className="bg-zinc-800 p-5 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-bold mb-2">Budget Management</h3>
                <p className="text-sm text-gray-300">Strategic allocation of your ad spend for best results</p>
              </div>

              <div className="bg-zinc-800 p-5 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-bold mb-2">A/B Testing</h3>
                <p className="text-sm text-gray-300">Testing different approaches to find what works best</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="#contact"
                className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Ready to boost your ad performance?</h3>
            <p className="text-gray-300 mb-4">
              Let's discuss your advertising goals and create a campaign that delivers real results. Our 25% management
              fee ensures we're invested in your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="/#contact"
                className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors text-center"
              >
                Schedule a Consultation
              </a>
              <a
                href="tel:+12012924983"
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors text-center"
              >
                Call +1-201-292-4983
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
