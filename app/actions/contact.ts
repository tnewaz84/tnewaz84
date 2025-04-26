"use server"

import { z } from "zod"

// Define the form schema for validation
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

export async function submitContactForm(formData: FormData) {
  try {
    // Extract and validate form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "Not provided",
      bookingSection: (formData.get("bookingSection") as string) || "Not specified",
      message: formData.get("message") as string,
    }

    const validatedData = formSchema.parse(data)

    // In a real implementation, you would use a service like Nodemailer, SendGrid, etc.
    // For now, we'll simulate sending an email
    console.log("Sending email to tnewaz84@gmail.com with data:", validatedData)

    // Simulate a delay to mimic sending the email
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success
    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting form:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check your form inputs and try again.",
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

