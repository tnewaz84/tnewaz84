"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GsapTextAnimation from "../components/gsap-text-animation"
import { GsapScrollAnimation } from "../components/gsap-scroll-animation"
import { Target, Users, BarChart3, Zap, ArrowRight, CheckCircle, Star, Smartphone, Search } from "lucide-react"

const moneyMakingStrategies = [
  {
    title: "SEO-Driven Revenue Growth",
    description: "Increase organic traffic by 300%+ and convert visitors into paying customers",
    icon: Search,
    roi: "400%",
    timeframe: "3-6 months",
    difficulty: "Medium",
    strategies: [
      "Local SEO domination for service businesses",
      "E-commerce product page optimization",
      "Content marketing that converts",
      "Technical SEO for better rankings",
    ],
  },
  {
    title: "Conversion Rate Optimization",
    description: "Turn more visitors into customers with data-driven optimization",
    icon: Target,
    roi: "250%",
    timeframe: "1-3 months",
    difficulty: "Easy",
    strategies: [
      "Landing page A/B testing",
      "Checkout flow optimization",
      "Email capture optimization",
      "Mobile conversion improvements",
    ],
  },
  {
    title: "Digital Product Creation",
    description: "Build and sell digital products with automated sales funnels",
    icon: Zap,
    roi: "500%",
    timeframe: "2-4 months",
    difficulty: "Hard",
    strategies: [
      "Online course development",
      "SaaS product launch",
      "Digital template sales",
      "Membership site creation",
    ],
  },
  {
    title: "Social Media Monetization",
    description: "Leverage social platforms to generate consistent revenue streams",
    icon: Users,
    roi: "300%",
    timeframe: "2-5 months",
    difficulty: "Medium",
    strategies: [
      "Influencer partnership programs",
      "Social commerce integration",
      "Community building & monetization",
      "Content sponsorship deals",
    ],
  },
  {
    title: "Email Marketing Automation",
    description: "Build automated email sequences that sell while you sleep",
    icon: BarChart3,
    roi: "380%",
    timeframe: "1-2 months",
    difficulty: "Easy",
    strategies: [
      "Welcome series automation",
      "Abandoned cart recovery",
      "Product recommendation engines",
      "Re-engagement campaigns",
    ],
  },
  {
    title: "Mobile App Revenue",
    description: "Create mobile experiences that generate recurring revenue",
    icon: Smartphone,
    roi: "600%",
    timeframe: "4-8 months",
    difficulty: "Hard",
    strategies: [
      "Freemium app models",
      "In-app purchase optimization",
      "Subscription-based services",
      "Mobile advertising integration",
    ],
  },
]

const successStories = [
  {
    client: "Epic Fences LLC",
    industry: "Home Services",
    revenue: "$150K",
    growth: "400%",
    timeframe: "6 months",
    strategy: "Local SEO + Conversion Optimization",
  },
  {
    client: "E-commerce Store",
    industry: "Retail",
    revenue: "$500K",
    growth: "250%",
    timeframe: "4 months",
    strategy: "Product Page SEO + Email Automation",
  },
  {
    client: "SaaS Startup",
    industry: "Technology",
    revenue: "$1M",
    growth: "800%",
    timeframe: "12 months",
    strategy: "Content Marketing + Product Launch",
  },
]

const pricingTiers = [
  {
    name: "Starter",
    price: "$2,997",
    description: "Perfect for small businesses ready to scale",
    features: [
      "SEO audit & strategy",
      "Landing page optimization",
      "Basic email automation",
      "Monthly performance reports",
      "3 months support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$7,997",
    description: "For businesses serious about revenue growth",
    features: [
      "Everything in Starter",
      "Advanced conversion optimization",
      "Social media strategy",
      "Custom automation setup",
      "Weekly strategy calls",
      "6 months support",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "$19,997",
    description: "For enterprises ready to dominate their market",
    features: [
      "Everything in Growth",
      "Custom app development",
      "Advanced analytics setup",
      "Team training & workshops",
      "Priority support",
      "12 months partnership",
    ],
    popular: false,
  },
]

export default function MakeMoneyPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <GsapTextAnimation as="h1" animation="chars" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Turn Your Business Into a<span className="block text-green-400">Money-Making Machine</span>
          </GsapTextAnimation>

          <GsapTextAnimation
            as="p"
            animation="fade"
            delay={0.3}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
          >
            Proven strategies that have generated over $10M in revenue for our clients. Stop leaving money on the table
            and start building systems that scale.
          </GsapTextAnimation>

          <GsapScrollAnimation animation="stagger" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4">
              Get Your Revenue Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
            >
              View Case Studies
            </Button>
          </GsapScrollAnimation>
        </div>
      </section>

      {/* Revenue Stats */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">$10M+</div>
              <div className="text-gray-300">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">400%</div>
              <div className="text-gray-300">Average ROI</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">150+</div>
              <div className="text-gray-300">Businesses Scaled</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">90 Days</div>
              <div className="text-gray-300">Average Results</div>
            </div>
          </div>
        </div>
      </section>

      {/* Money-Making Strategies */}
      <section className="py-20 bg-black">
        <div className="container mx-auto max-w-6xl px-4">
          <GsapTextAnimation as="h2" animation="words" className="text-3xl md:text-4xl font-bold mb-4 text-center">
            6 Proven Ways to Make Money Online
          </GsapTextAnimation>

          <GsapTextAnimation
            as="p"
            animation="fade"
            delay={0.2}
            className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
          >
            These aren't get-rich-quick schemes. These are battle-tested strategies that work for real businesses.
          </GsapTextAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moneyMakingStrategies.map((strategy, index) => (
              <GsapScrollAnimation key={index} animation="fadeUp" delay={index * 0.1}>
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-green-500/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <strategy.icon className="h-8 w-8 text-green-400" />
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          {strategy.roi} ROI
                        </Badge>
                        <Badge variant="outline" className="border-gray-600">
                          {strategy.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-white text-xl mb-2">{strategy.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-base">{strategy.description}</CardDescription>
                    <div className="text-sm text-gray-400 mt-2">Timeline: {strategy.timeframe}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.strategies.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </GsapScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <GsapTextAnimation as="h2" animation="chars" className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Real Results from Real Businesses
          </GsapTextAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <GsapScrollAnimation key={index} animation="fadeUp" delay={index * 0.1}>
                <Card className="bg-black border-gray-800 text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-white text-xl">{story.client}</CardTitle>
                    <CardDescription className="text-gray-400">{story.industry}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-bold text-green-400">{story.revenue}</div>
                        <div className="text-sm text-gray-400">Additional Revenue</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{story.growth}</div>
                        <div className="text-sm text-gray-400">Growth in {story.timeframe}</div>
                      </div>
                      <div className="text-sm text-gray-300 italic">"{story.strategy}"</div>
                    </div>
                  </CardContent>
                </Card>
              </GsapScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto max-w-6xl px-4">
          <GsapTextAnimation as="h2" animation="words" className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Investment Options
          </GsapTextAnimation>

          <GsapTextAnimation
            as="p"
            animation="fade"
            delay={0.2}
            className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
          >
            Choose the level of support that matches your growth ambitions. All packages include our revenue guarantee.
          </GsapTextAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <GsapScrollAnimation key={index} animation="fadeUp" delay={index * 0.1}>
                <Card
                  className={`relative ${tier.popular ? "border-green-500 bg-gray-900" : "border-gray-800 bg-black"}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-black font-semibold px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-white text-2xl mb-2">{tier.name}</CardTitle>
                    <div className="text-4xl font-bold text-green-400 mb-2">{tier.price}</div>
                    <CardDescription className="text-gray-300">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${tier.popular ? "bg-green-500 hover:bg-green-600 text-black" : "bg-white hover:bg-gray-100 text-black"}`}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </GsapScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <GsapTextAnimation as="h2" animation="words" className="text-3xl md:text-4xl font-bold mb-6 text-black">
            Ready to Turn Your Business Into a Revenue Machine?
          </GsapTextAnimation>

          <GsapTextAnimation
            as="p"
            animation="fade"
            delay={0.2}
            className="text-xl text-black/80 mb-8 max-w-3xl mx-auto"
          >
            Book a free strategy call and discover exactly how to implement these money-making strategies in your
            business.
          </GsapTextAnimation>

          <GsapScrollAnimation animation="stagger" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4">
              Book Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/seo-analyzer">
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black/10 px-8 py-4 bg-transparent"
              >
                Get Free SEO Audit
              </Button>
            </Link>
          </GsapScrollAnimation>
        </div>
      </section>
    </main>
  )
}
