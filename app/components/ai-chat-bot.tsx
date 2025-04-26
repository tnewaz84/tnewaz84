"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { sendEmail } from "@/app/actions/email"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: `You are Tanvir, a helpful assistant for Tanvir Newaz's digital marketing agency. 
    
    About Tanvir Newaz's Services:
    - SEO Optimization: Boost online visibility and attract qualified leads with data-driven SEO strategies
    - Website Design: Custom website design solutions tailored to business needs with modern, responsive designs
    - Google My Business Optimization: Improve local search visibility and customer engagement
    - E-commerce Growth: Scale online stores with conversion-focused strategies and optimized user experiences
    - Content Strategy: Develop engaging content that drives traffic and converts visitors
    - AI-Powered Solutions: Enhance customer satisfaction with intelligent chatbots and AI tools
    - Social Media Management: Build brand presence and engagement across platforms
    - Email: tnewaz84@gmail.com
    - Phone: +1-201-292-4983
    
    Your job is to answer customer questions about digital marketing services, provide information about Tanvir's expertise, and help potential clients get in touch. If a customer wants a quote or consultation, offer to collect their information to send to Tanvir.
    
    Keep your responses friendly, helpful, and concise. If you don't know something specific, suggest they call or email directly.`,
    },
    {
      role: "assistant",
      content: "Hi there! I'm Tanvir's virtual assistant. How can I help you with your digital marketing needs today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCollectingInfo, setIsCollectingInfo] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    bookingSection: "",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Function to check if input contains certain keywords
  const containsKeywords = (text: string): boolean => {
    if (!text) return false

    const keywords = ["quote", "estimate", "consultation", "contact", "email", "price", "cost", "help"]
    const lowercaseText = text.toLowerCase()

    return keywords.some((keyword) => lowercaseText.includes(keyword))
  }

  // Function to generate AI response
  const generateAIResponse = async (userInput: string, messageHistory: Message[]): Promise<string> => {
    try {
      // Return a simple hardcoded response based on the input
      if (userInput.toLowerCase().includes("seo") || userInput.toLowerCase().includes("search engine")) {
        return "Our SEO services are designed to boost your online visibility and drive qualified traffic to your website. We use data-driven strategies including keyword research, on-page optimization, technical SEO, and content enhancement. Would you like to know more about our SEO packages or get a custom quote for your business?"
      } else if (userInput.toLowerCase().includes("website") || userInput.toLowerCase().includes("web design")) {
        return "Tanvir creates custom website designs that are not only visually appealing but also conversion-focused. Our websites are responsive, SEO-friendly, and built with your business goals in mind. We can create a new site from scratch or optimize your existing one. Would you like to discuss your website project?"
      } else if (
        userInput.toLowerCase().includes("google") ||
        userInput.toLowerCase().includes("gmb") ||
        userInput.toLowerCase().includes("business profile")
      ) {
        return "Optimizing your Google Business Profile (formerly Google My Business) is crucial for local SEO. We can help you set up, verify, and optimize your profile with accurate information, compelling photos, and regular posts. This helps you rank higher in local searches and Google Maps. Would you like a free audit of your current Google Business Profile?"
      } else if (userInput.toLowerCase().includes("content") || userInput.toLowerCase().includes("strategy")) {
        return "Our content strategy services help you create valuable, relevant content that attracts and engages your target audience. This includes blog posts, articles, social media content, videos, and more. We develop a comprehensive content plan aligned with your business goals and SEO strategy. Would you like to learn more about how content marketing can help your business?"
      } else if (
        userInput.toLowerCase().includes("price") ||
        userInput.toLowerCase().includes("cost") ||
        userInput.toLowerCase().includes("package")
      ) {
        return "Our digital marketing services are customized based on your specific needs and goals. SEO packages start at $500/month, website design projects typically range from $1,500-$5,000, and we offer various packages for other services. For a precise quote tailored to your business, I'd be happy to collect your information and have Tanvir contact you directly!"
      } else {
        return "Thank you for reaching out! Tanvir Newaz provides comprehensive digital marketing solutions including SEO optimization, website design, Google Business Profile management, content strategy, and more. How can we help your business grow online? Feel free to ask about any specific service you're interested in."
      }
    } catch (error) {
      console.error("Error generating AI response:", error)
      return "I'm having trouble connecting right now. Please try again or contact us directly at tnewaz84@gmail.com or +1-201-292-4983."
    }
  }

  const handleSend = async () => {
    // Safety check
    if (!input || input.trim() === "") {
      return
    }

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    // Update messages with user input
    setMessages((prev) => [...prev, userMessage])

    // Clear input field and set loading state
    setInput("")
    setIsLoading(true)

    try {
      // If we're collecting customer info
      if (isCollectingInfo) {
        await handleInfoCollection(input)
        return
      }

      // Check if input contains keywords for quote/contact
      if (containsKeywords(input)) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'd be happy to help you get in touch with Tanvir! Could you please provide your name?",
          },
        ])
        setIsCollectingInfo(true)
        return
      }

      // Generate AI response
      const aiResponse = await generateAIResponse(input, messages)

      // Add AI response to messages
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
    } catch (error) {
      console.error("Error in handleSend:", error)

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble right now. Please try again or contact us directly at tnewaz84@gmail.com or +1-201-292-4983.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInfoCollection = async (userInput: string) => {
    if (!userInput || userInput.trim() === "") {
      return
    }

    try {
      // Simple state machine for collecting customer info
      if (!customerInfo.name) {
        setCustomerInfo({ ...customerInfo, name: userInput })
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userInput },
          { role: "assistant", content: "Thanks! Could you please provide your email address?" },
        ])
      } else if (!customerInfo.email) {
        setCustomerInfo({ ...customerInfo, email: userInput })
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userInput },
          { role: "assistant", content: "Great! And your phone number?" },
        ])
      } else if (!customerInfo.phone) {
        setCustomerInfo({ ...customerInfo, phone: userInput })
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userInput },
          {
            role: "assistant",
            content:
              "Which service are you most interested in? (SEO, Website Design, Google Business Profile, Content Strategy, or Other)",
          },
        ])
      } else if (!customerInfo.bookingSection) {
        setCustomerInfo({ ...customerInfo, bookingSection: userInput })
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userInput },
          {
            role: "assistant",
            content: "Almost done! Please briefly describe your project or what you're looking to achieve.",
          },
        ])
      } else if (!customerInfo.message) {
        setCustomerInfo({ ...customerInfo, message: userInput })
        setMessages((prev) => [...prev, { role: "user", content: userInput }])

        // Send form data
        setIsLoading(true)
        try {
          const response = await sendEmail({
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            bookingSection: customerInfo.bookingSection,
            message: `[From Chatbot] ${userInput}`,
            type: "chatbot",
          })

          if (response.success) {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content:
                  "Thank you! I've sent your information to Tanvir. He'll contact you shortly to discuss your digital marketing needs. Is there anything else I can help you with?",
              },
            ])
          } else {
            throw new Error(response.error || "Failed to send message")
          }
        } catch (error) {
          console.error("Error sending form:", error)
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I'm having trouble sending your information. Please contact Tanvir directly at tnewaz84@gmail.com or +1-201-292-4983.",
            },
          ])
        } finally {
          // Reset collection state
          setIsCollectingInfo(false)
          setCustomerInfo({ name: "", email: "", phone: "", message: "", bookingSection: "" })
        }
      }
    } catch (error) {
      console.error("Error in handleInfoCollection:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble processing your information. Please try again or contact Tanvir directly at tnewaz84@gmail.com.",
        },
      ])
      setIsCollectingInfo(false)
      setCustomerInfo({ name: "", email: "", phone: "", message: "", bookingSection: "" })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Chat with us"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-black text-white p-4">
              <h3 className="font-bold">Tanvir - Digital Growth Assistant</h3>
              <p className="text-sm opacity-90">Ask me about digital marketing services</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.slice(1).map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-black text-white rounded-tr-none"
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-tl-none flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isCollectingInfo
                      ? !customerInfo.name
                        ? "Enter your name..."
                        : !customerInfo.email
                          ? "Enter your email..."
                          : !customerInfo.phone
                            ? "Enter your phone number..."
                            : !customerInfo.bookingSection
                              ? "Enter service of interest..."
                              : "Describe your project needs..."
                      : "Type your message..."
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-black text-white p-2 rounded-r-md hover:bg-zinc-800 transition-colors disabled:bg-zinc-400"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Powered by AI • Information sent to Tanvir Newaz</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

