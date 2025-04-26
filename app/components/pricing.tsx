"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "./scroll-animation"

export default function Pricing() {
  const packages = [
    {
      id: "keyword-research",
      title: "Keyword Research & Analysis",
      price: "$300",
      description: "One-time comprehensive SEO foundation",
      features: [
        "Competitor Analysis",
        "Keyword Research (50 keywords)",
        "On-Page SEO Optimization",
        "Technical SEO Audit",
        "Content Gap Analysis",
        "Actionable SEO Roadmap",
      ],
      paypalButtonId: "65D7455QSXQYE",
      paypalButtonClass: "pp-65D7455QSXQYE",
      popular: false,
      oneTime: true,
    },
    {
      id: "monthly-seo",
      title: "Monthly SEO Package",
      price: "$500",
      description: "Ongoing SEO management and growth",
      features: [
        "Monthly Keyword Ranking Reports",
        "Content Optimization",
        "Backlink Building",
        "Technical SEO Maintenance",
        "Monthly Performance Analysis",
        "Competitor Monitoring",
      ],
      paypalButtonId: "PX6WNZZUFQFDY",
      paypalButtonClass: "pp-PX6WNZZUFQFDY",
      popular: true,
      oneTime: false,
    },
    {
      id: "website-design",
      title: "Custom Website Design",
      price: "$1,500",
      description: "Professional, conversion-focused website",
      features: [
        "Custom Design & Development",
        "Mobile Responsive Layout",
        "SEO-Friendly Structure",
        "Contact Forms & Lead Capture",
        "Social Media Integration",
        "Basic SEO Setup",
      ],
      paypalButtonId: "QG6JRCQ29FHRU",
      paypalButtonClass: "pp-QG6JRCQ29FHRU",
      popular: false,
      oneTime: true,
    },
  ]

  // PayPal button HTML as a React component
  const PayPalButton = ({ buttonId, buttonClass }) => {
    return (
      <Button className="w-full bg-black hover:bg-zinc-800 text-white">
        {buttonClass ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <style>.${buttonClass}{text-align:center;border:none;border-radius:0.25rem;min-width:11.625rem;padding:0 2rem;height:2.625rem;font-weight:bold;background-color:#FFD140;color:#FFFFFF;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer;width:100%;}</style>
        <form action="https://www.paypal.com/ncp/payment/${buttonId}" method="post" target="_blank" style="display:inline-grid;justify-items:center;align-content:start;gap:0.5rem;width:100%;">
          <input class="${buttonClass}" type="submit" value="Buy Now" />
          <img src=https://www.paypalobjects.com/images/Debit_Credit_APM.svg alt="cards" />
          <section> Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style="height:0.875rem;vertical-align:middle;"/></section>
        </form>
      `,
            }}
          />
        ) : (
          "Buy Now"
        )}
      </Button>
    )
  }

  return (
    <section className="py-20 bg-zinc-900" id="pricing">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeUp">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Transparent Pricing, Exceptional Value
            </h2>
            <p className="text-gray-400">
              Choose the package that fits your business needs. All services come with a satisfaction guarantee and
              personalized support from Tanvir.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="stagger" staggerChildren={0.15}>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.id}>
                <Card
                  className={`h-full flex flex-col ${pkg.popular ? "border-2 border-white" : "bg-zinc-800 border-zinc-700"}`}
                >
                  <CardHeader>
                    {pkg.popular && (
                      <div className="py-1 px-3 bg-black text-white text-xs font-bold rounded-full w-fit mb-2">
                        MOST POPULAR
                      </div>
                    )}
                    <CardTitle className="text-xl font-bold">{pkg.title}</CardTitle>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">{pkg.price}</span>
                      {!pkg.oneTime && <span className="text-gray-400 ml-1">/month</span>}
                    </div>
                    <CardDescription className="text-gray-400 mt-2">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <PayPalButton buttonId={pkg.paypalButtonId} buttonClass={pkg.paypalButtonClass} />
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.3}>
          <div className="max-w-3xl mx-auto text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-400 mb-6">
              Every business is unique. Contact Tanvir for a tailored digital growth strategy that fits your specific
              goals and budget.
            </p>
            <Button asChild className="bg-white text-black hover:bg-white/90">
              <a href="#contact">Get a Custom Quote</a>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

