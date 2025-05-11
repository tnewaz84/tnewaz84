"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollAnimation } from "./scroll-animation"
import { submitContactForm } from "../actions/contact"
import { sendEmail } from "../actions/email"
import CalendlyBooking from "./calendly-booking"

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  bookingSection: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState<{ success: boolean; message: string } | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bookingSection: "",
      message: "",
    },
    mode: "onBlur", // Add explicit mode to prevent resolver issues
  })

  // Booking options for the dropdown
  const bookingOptions = [
    { value: "seo-consultation", label: "SEO Consultation" },
    { value: "website-design", label: "Website Design Discussion" },
    { value: "ecommerce-strategy", label: "E-commerce Strategy" },
    { value: "ai-solutions", label: "AI Solutions Exploration" },
    { value: "ad-management", label: "Ad Campaign Management" },
    { value: "general-inquiry", label: "General Business Inquiry" },
  ]

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setFormSuccess(null) // Reset form success state

    try {
      // Try the new email function first
      try {
        const emailResult = await sendEmail({
          name: values.name,
          email: values.email,
          phone: values.phone || "Not provided",
          bookingSection: values.bookingSection || "Not specified",
          message: values.message,
          type: "contact", // Ensure this is explicitly set
        })

        if (emailResult && emailResult.success) {
          setFormSuccess({
            success: true,
            message: "Thank you for reaching out! I'll get back to you as soon as possible.",
          })

          // Reset form if submission was successful
          form.reset()
          return
        }
      } catch (emailError) {
        console.error("Error with email function:", emailError)
        // Fall back to the original contact form submission if the new email function fails
      }

      // Create FormData object to pass to server action (fallback)
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      // Submit form data to server action
      const result = await submitContactForm(formData)
      setFormSuccess(result)

      // Reset form if submission was successful
      if (result.success) {
        form.reset()
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormSuccess({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-zinc-900 py-16 sm:py-20" id="contact">
      <div className="container relative z-10 mx-auto px-4">
        <ScrollAnimation animation="fadeUp">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tighter">Get in Touch</h2>
            <p className="mb-6 sm:mb-8 text-gray-400 text-sm sm:text-base">
              Ready to transform your digital challenges into growth opportunities? Let's discuss how Tanvir can help
              your business thrive in the digital landscape.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <div className="mx-auto max-w-md">
            {formSuccess && formSuccess.success ? (
              <div className="rounded-lg bg-green-900/20 p-4 sm:p-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
                <h3 className="mb-2 text-lg sm:text-xl font-bold">Thank You!</h3>
                <p className="text-gray-300 text-sm sm:text-base">{formSuccess.message}</p>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
                  Your message has been sent to tnewaz84@gmail.com
                </p>
                <Button className="mt-4 sm:mt-6" onClick={() => setFormSuccess(null)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {formSuccess && !formSuccess.success && (
                    <div className="rounded-lg bg-red-900/20 p-3 text-center text-red-300 text-sm">
                      {formSuccess.message}
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-white text-black placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            className="bg-white text-black placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 (123) 456-7890"
                            {...field}
                            className="bg-white text-black placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bookingSection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Book a Section</FormLabel>
                        <select
                          {...field}
                          className="w-full rounded-md border border-input bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="" className="text-gray-500">
                            Select a service to discuss
                          </option>
                          {bookingOptions.map((option) => (
                            <option key={option.value} value={option.value} className="text-black">
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your business challenges..."
                            className="min-h-[100px] sm:min-h-[120px] bg-white text-black placeholder:text-gray-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-10 sm:h-12 text-sm sm:text-base" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  <div className="mt-4 text-center">
                    <p className="text-gray-400 mb-2 text-sm">Or schedule a consultation directly:</p>
                    <CalendlyBooking buttonText="Book a Free Consultation" className="w-full" />
                  </div>
                </form>
              </Form>
            )}
          </div>
        </ScrollAnimation>
      </div>
      <div className="absolute inset-0 z-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 50 }).map((_, i) => (
            <line key={i} x1={i * 2} y1="0" x2={i * 2} y2="100" stroke="white" strokeWidth="0.1" />
          ))}
        </svg>
      </div>
    </section>
  )
}
