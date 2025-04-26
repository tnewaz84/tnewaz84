"use server"

import { z } from "zod"

// Define the form schema for validation
const adCopyFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  companyUrl: z.string().url({ message: "Please enter a valid URL" }),
  phoneNumber: z.string().min(7, { message: "Please enter a valid phone number" }),
  serviceKeywords: z.string().min(3, { message: "Please enter at least one service keyword" }),
})

export type AdCopyFormData = z.infer<typeof adCopyFormSchema>

export async function generateAdCopy(formData: AdCopyFormData) {
  try {
    // Validate the form data
    const validatedData = adCopyFormSchema.parse(formData)

    // Extract keywords into an array
    const keywords = validatedData.serviceKeywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0)

    // Generate the sales copy using the specified formula
    const adCopy = {
      // Hook - Grab attention with a compelling headline
      hook: generateHook(validatedData.companyName, keywords),

      // Pain - Identify the problem
      pain: generatePain(keywords),

      // Stun - Provide a shocking statistic or statement
      stun: generateStun(keywords),

      // Hammer - Emphasize the pain points
      hammer: generateHammer(keywords),

      // Solution - Present the solution
      solution: generateSolution(validatedData.companyName, keywords),

      // Call to action
      cta: generateCTA(validatedData.companyName, validatedData.phoneNumber, validatedData.companyUrl),
    }

    return { success: true, adCopy }
  } catch (error) {
    console.error("Error generating ad copy:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to generate ad copy. Please try again." }
  }
}

// Helper functions to generate each section of the sales copy

function generateHook(companyName: string, keywords: string[]): string {
  const hooks = [
    `Stop Wasting Money on Ineffective ${keywords[0]} Strategies!`,
    `${keywords[0]} Problems Keeping You Up at Night? ${companyName} Has the Solution.`,
    `Tired of Disappointing Results from Your ${keywords[0]} Efforts?`,
    `Want to Boost Your ${keywords[0]} Results by 300%? Here's How ${companyName} Does It.`,
    `The ${keywords[0]} Secret Your Competitors Don't Want You to Know`,
  ]

  return hooks[Math.floor(Math.random() * hooks.length)]
}

function generatePain(keywords: string[]): string {
  const pains = [
    `Most businesses struggle with ${keywords[0]}, wasting thousands of dollars on approaches that simply don't work.`,
    `If you're like most of our clients, you've tried multiple ${keywords[0]} strategies with disappointing results.`,
    `The frustration of investing in ${keywords[0]} only to see minimal return is all too common.`,
    `Many businesses find themselves trapped in a cycle of ineffective ${keywords[0]} tactics that drain resources without delivering results.`,
    `You've probably experienced the headache of managing ${keywords[0]} campaigns that consume your budget but fail to generate leads.`,
  ]

  return pains[Math.floor(Math.random() * pains.length)]
}

function generateStun(keywords: string[]): string {
  const stuns = [
    `Did you know? 83% of ${keywords[0]} campaigns fail due to poor targeting and messaging.`,
    `Shocking fact: Businesses waste an average of $12,000 annually on ineffective ${keywords[0]} strategies.`,
    `Here's the truth: Only 2 out of 10 ${keywords[0]} efforts actually deliver positive ROI.`,
    `The reality? Most ${keywords[0]} agencies hide the fact that 78% of their campaigns underperform.`,
    `Studies show that 91% of businesses are unsatisfied with their current ${keywords[0]} results.`,
  ]

  return stuns[Math.floor(Math.random() * stuns.length)]
}

function generateHammer(keywords: string[]): string {
  const hammers = [
    `Every day you continue with ineffective ${keywords[0]} strategies is another day of lost revenue and missed opportunities.`,
    `The cost of poor ${keywords[0]} isn't just the wasted ad spend—it's the invisible cost of all the customers you never reached.`,
    `While you're struggling with ${keywords[0]}, your competitors are capturing your potential customers and growing their market share.`,
    `Ineffective ${keywords[0]} doesn't just hurt today's bottom line—it damages your long-term growth potential and brand reputation.`,
    `The longer you wait to fix your ${keywords[0]} approach, the more ground you'll lose to competitors who are doing it right.`,
  ]

  return hammers[Math.floor(Math.random() * hammers.length)]
}

function generateSolution(companyName: string, keywords: string[]): string {
  const solutions = [
    `${companyName} offers a proven ${keywords[0]} system that has helped businesses like yours increase conversions by an average of 237%. Our data-driven approach eliminates guesswork and focuses on strategies that deliver measurable results.`,
    `With ${companyName}'s expert ${keywords[0]} management, you'll benefit from our proprietary targeting methodology that identifies your ideal customers with precision. Our clients typically see ROI improvements within the first 30 days.`,
    `${companyName} specializes in transforming underperforming ${keywords[0]} campaigns into revenue-generating assets. Our team of certified specialists will optimize every aspect of your ${keywords[0]} strategy for maximum performance.`,
    `Unlike generic ${keywords[0]} services, ${companyName} creates custom strategies tailored to your specific business goals. We don't just promise results—we guarantee them with our performance-based pricing model.`,
    `${companyName}'s innovative approach to ${keywords[0]} combines cutting-edge technology with proven marketing principles. This unique methodology has helped our clients achieve an average 43% reduction in acquisition costs while increasing conversion rates.`,
  ]

  return solutions[Math.floor(Math.random() * solutions.length)]
}

function generateCTA(companyName: string, phoneNumber: string, companyUrl: string): string {
  return `Ready to transform your ${companyName} advertising results? Call us today at ${phoneNumber} or visit ${companyUrl} to schedule your free strategy session. Don't let another day of ineffective advertising eat into your profits.`
}
