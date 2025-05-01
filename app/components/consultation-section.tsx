"use client"

import { ScrollAnimation } from "./scroll-animation"
import CalendlyBooking from "./calendly-booking"
import { Clock, CheckCircle2, Calendar } from "lucide-react"

export default function ConsultationSection() {
  return (
    <section className="py-16 md:py-20 bg-black" id="consultation">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeUp">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Book a Free SEO Consultation</h2>
            <p className="text-lg text-gray-300 mb-8">
              Experience a transformative SEO session with Tanvir Newaz. In just 1 hour, we'll unlock the potential of
              your website and lay the foundation for higher search engine rankings.
            </p>
            <div className="flex justify-center">
              <CalendlyBooking buttonText="Schedule Your Free Consultation" className="text-lg" />
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">1-Hour Session</h3>
              </div>
              <p className="text-gray-300">
                A focused session dedicated to identifying your website's SEO opportunities and challenges.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Comprehensive Audit</h3>
              </div>
              <p className="text-gray-300">
                Get a thorough analysis of your website, uncovering gaps and identifying key opportunities for
                improvement.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Scheduling</h3>
              </div>
              <p className="text-gray-300">
                Choose a time that works for you. Web conferencing details provided upon confirmation.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
