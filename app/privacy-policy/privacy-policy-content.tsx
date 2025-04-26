"use client"

import Hero from "../components/hero"
import { motion } from "framer-motion"
import { ScrollAnimation } from "../components/scroll-animation"

export default function PrivacyPolicyContent() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero height="auto" fullScreen={false}>
        <div className="py-32 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
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
                Tanvir Newaz ("we," "our," or "us") respects your privacy and is committed to protecting your personal
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you
                have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
              </p>

              <h2>Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Fill out forms on our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a quote or consultation</li>
                <li>Contact us via email, phone, or other communication channels</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Website URL</li>
                <li>Message content</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device and usage
                patterns, including:
              </p>
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Date and time of access</li>
                <li>Click patterns</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve, personalize, and expand our website and services</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you about our services, updates, and promotions</li>
                <li>Process transactions and send related information</li>
                <li>Find and prevent fraud</li>
                <li>Respond to your comments, questions, and requests</li>
              </ul>

              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. Cookies are files with a small amount of data that may include an anonymous unique
                identifier. They are sent to your browser from a website and stored on your device.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                We may use third-party service providers to help us operate our website, analyze how our website is
                used, and provide services to you. These third parties may have access to your personal information only
                to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
              <p>These third-party services may include:</p>
              <ul>
                <li>Google Analytics</li>
                <li>Payment processors</li>
                <li>Email marketing services</li>
                <li>Customer relationship management systems</li>
                <li>Hosting providers</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or destruction. However, please note that
                no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>

              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access the personal information we have about you</li>
                <li>The right to request correction of inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information provided in the "Contact Us"
                section below.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and you are aware that your child
                has provided us with personal information, please contact us.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>

              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>
                Email: tnewaz84@gmail.com
                <br />
                Phone: +1-201-292-4983
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </main>
  )
}

