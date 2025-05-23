"use server"

const ADMIN_EMAIL = "tnewaz84@gmail.com"

// Add defensive programming to the sendEmail function:
export async function sendEmail(data: any) {
  // Add validation at the beginning
  if (!data) {
    console.error("Email data is null or undefined")
    return { success: false, message: "Invalid email data provided" }
  }

  // Ensure type has a default value if it's null
  const emailType = data.type || "contact"

  try {
    // Use environment variable for API credentials
    const emailApiKey = process.env.EMAIL_API_KEY || ""

    if (!emailApiKey) {
      console.error("Missing EMAIL_API_KEY environment variable")
      return { success: false, error: "Email service configuration error" }
    }

    // Split the API key into key and secret
    const [apiKey, secretKey] = emailApiKey.split(":")

    if (!apiKey || !secretKey) {
      console.error("Invalid EMAIL_API_KEY format")
      return { success: false, error: "Email service configuration error" }
    }

    // Format subject based on request type
    const subject =
      emailType === "quote"
        ? "New Digital Marketing Quote Request"
        : emailType === "contact"
          ? "New Contact Form Submission"
          : "New Chatbot Inquiry"

    // Add booking section to subject if available
    const subjectWithBooking = data.bookingSection ? `${subject} - ${data.bookingSection}` : subject

    // Prepare email content
    const emailContent = `
      <h2>New ${emailType === "quote" ? "Digital Marketing Quote Request" : emailType === "contact" ? "Contact Form Submission" : "Chatbot Inquiry"}</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      ${data.bookingSection ? `<p><strong>Service Requested:</strong> ${data.bookingSection}</p>` : ""}
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Source:</strong> ${emailType}</p>
      <hr>
      <p>This inquiry was submitted through the "Get in Touch" section of your website. The potential client is looking to transform their digital challenges into growth opportunities.</p>
    `

    // Mailjet API request with proper authentication
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: ADMIN_EMAIL,
              Name: "Tanvir Newaz Website",
            },
            To: [
              {
                Email: ADMIN_EMAIL,
                Name: "Tanvir Newaz",
              },
            ],
            ReplyTo: {
              Email: data.email,
              Name: data.name,
            },
            Subject: subjectWithBooking,
            HTMLPart: emailContent,
            TextPart: `
              New ${emailType} from website
              Name: ${data.name}
              Email: ${data.email}
              Phone: ${data.phone}
              ${data.bookingSection ? `Service Requested: ${data.bookingSection}` : ""}
              Message: ${data.message}
              
              This inquiry was submitted through the "Get in Touch" section of your website.
            `,
            CustomID: `digital-marketing-${emailType}-${Date.now()}`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Mailjet API error:", errorData)

      // Provide more specific error messages based on status code
      if (response.status === 401) {
        return {
          success: false,
          error: "Authentication failed. Please check your API credentials.",
        }
      } else if (response.status === 400) {
        return {
          success: false,
          error: "Invalid request format. Please check your email configuration.",
        }
      } else {
        return {
          success: false,
          error: `Failed to send email: ${errorData.ErrorMessage || "Unknown error"}`,
        }
      }
    }

    console.log("Email sent successfully via Mailjet")
    // Return a success response
    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
