"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollAnimation } from "./scroll-animation"
import { sendEmail } from "../actions/email"

// Form schema for validation
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
})

export default function SeoAnalyzerCta() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState<boolean>(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      url: "",
    },
    mode: "onBlur", // Add explicit mode to prevent resolver issues
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Send email notification
      await sendEmail({
        name: "SEO Analysis Request",
        email: values.email,
        phone: "Not provided",
        bookingSection: "SEO Analysis",
        message: `Please analyze this URL: ${values.url}`,
        type: "seo-analysis",
      }).catch((error) => {
        console.error("Error sending email notification:", error)
      })

      // Store the URL in session storage for use on the SEO analyzer page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("seoAnalysisUrl", values.url)
        sessionStorage.setItem("seoAnalysisEmail", values.email)
      }

      setFormSuccess(true)

      // Redirect to the SEO analyzer page with the URL as a query parameter
      setTimeout(() => {
        router.push(`/seo-analyzer?url=${encodeURIComponent(values.url)}`)
      }, 1500)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 md:py-20 bg-zinc-900" id="seo-analysis">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeUp">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Free SEO Analysis</h2>
            <p className="text-lg text-gray-300 mb-8">
              Get a comprehensive analysis of your website's SEO performance. Enter your email and website URL below to
              receive a detailed report on how to improve your search engine rankings.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <div className="max-w-2xl mx-auto">
            {formSuccess ? (
              <div className="bg-green-900/20 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 mb-4">
                  <Search className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analysis Started!</h3>
                <p className="text-gray-300 mb-4">
                  We're analyzing your website now. You'll be redirected to view your results in a moment.
                </p>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full animate-[progress_1.5s_ease-in-out]"></div>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Your email address"
                              {...field}
                              className="bg-white text-black placeholder:text-gray-500 h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="https://yourwebsite.com"
                              {...field}
                              className="bg-white text-black placeholder:text-gray-500 h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Analyzing..." : "Analyze My Website"}
                    {!isSubmitting && <ArrowRight className="h-5 w-5" />}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </ScrollAnimation>

        <style jsx global>{`
          @keyframes progress {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
