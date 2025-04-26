"use client"

import Hero from "../components/hero"
import { motion } from "framer-motion"
import { ScrollAnimation } from "../components/scroll-animation"
import { Button } from "@/components/ui/button"

export default function RefundPolicyContent() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Refund Policy</h1>
            <p className="text-gray-300 mb-8 text-center">Last Updated: March 19, 2025</p>
          </motion.div>
        </div>
      </Hero>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fadeUp">
            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                At Tanvir Newaz, we are committed to providing high-quality digital marketing services and ensuring
                client satisfaction. This Refund Policy outlines the terms and conditions for refunds on our services.
              </p>
              <p>
                By purchasing our services, you acknowledge that you have read, understood, and agree to be bound by the
                terms of this Refund Policy.
              </p>

              <h2>Service-Specific Refund Policies</h2>

              <h3>SEO Services</h3>
              <p>
                Due to the nature of SEO work, which involves significant upfront research, analysis, and
                implementation, we offer a limited refund policy for our SEO services:
              </p>
              <ul>
                <li>
                  <strong>Keyword Research & Analysis ($300):</strong> Eligible for a 50% refund if requested within 3
                  days of delivery, provided no implementation has begun based on our recommendations.
                </li>
                <li>
                  <strong>Monthly SEO Package ($500/month):</strong> No refunds for the current month once work has
                  begun. You may cancel future months with 15 days' notice.
                </li>
              </ul>

              <h3>Website Design Services</h3>
              <p>For our Custom Website Design services ($1,500), the following refund policy applies:</p>
              <ul>
                <li>100% refund if canceled before any work begins</li>
                <li>75% refund if canceled after initial consultation but before design work begins</li>
                <li>50% refund if canceled after design mockups are delivered but before development begins</li>
                <li>No refund once development has begun</li>
              </ul>

              <h3>Other Services</h3>
              <p>For all other services, including ad management, content creation, and consulting:</p>
              <ul>
                <li>Full refund if canceled before work begins</li>
                <li>Prorated refund based on the percentage of work completed if canceled during the project</li>
                <li>No refund once the project is completed and delivered</li>
              </ul>

              <h2>Satisfaction Guarantee</h2>
              <p>
                We stand behind the quality of our work. If you are not satisfied with the services provided, please
                contact us within 7 days of delivery to discuss your concerns. We will work with you to address any
                issues and may offer one of the following remedies at our discretion:
              </p>
              <ul>
                <li>Revisions to the delivered work</li>
                <li>Additional services at no extra cost</li>
                <li>Partial refund</li>
                <li>Full refund (in exceptional circumstances)</li>
              </ul>

              <h2>Refund Process</h2>
              <p>To request a refund, please contact us at tnewaz84@gmail.com with the following information:</p>
              <ul>
                <li>Your name and contact information</li>
                <li>Date of purchase</li>
                <li>Service purchased</li>
                <li>Reason for refund request</li>
                <li>Any relevant documentation or details</li>
              </ul>
              <p>
                We will review your request and respond within 3 business days. If approved, refunds will be processed
                using the original payment method and may take 5-10 business days to appear on your statement, depending
                on your financial institution.
              </p>

              <h2>Exceptions</h2>
              <p>No refunds will be issued in the following circumstances:</p>
              <ul>
                <li>Services that have been fully delivered and accepted</li>
                <li>Requests made outside the specified refund timeframes</li>
                <li>Failure to provide necessary information or cooperation required to complete the services</li>
                <li>
                  Dissatisfaction with results due to factors outside our control (e.g., algorithm changes, market
                  conditions)
                </li>
              </ul>

              <h2>Changes to This Refund Policy</h2>
              <p>
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately
                upon posting on our website. Your continued use of our services following any changes indicates your
                acceptance of the revised Refund Policy.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Refund Policy or would like to request a refund, please contact us
                at:
              </p>
              <p>
                Email: tnewaz84@gmail.com
                <br />
                Phone: +1-201-292-4983
              </p>
            </div>
          </ScrollAnimation>

          <div className="mt-12 text-center">
            <Button asChild className="bg-white text-black hover:bg-white/90">
              <a href="/#contact">Contact Us With Questions</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

