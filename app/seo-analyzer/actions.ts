"use server"

import { z } from "zod"

// URL validation schema
const urlSchema = z
  .string()
  .trim()
  .min(1, {
    message: "URL is required",
  })
  .refine(
    (url) => {
      try {
        // Add protocol if missing
        const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`
        new URL(urlWithProtocol)
        return true
      } catch {
        return false
      }
    },
    { message: "Invalid URL format" },
  )

export async function analyzeSEO(url: string) {
  try {
    // Validate URL
    const validatedUrl = urlSchema.parse(url)

    // Add protocol if missing
    const urlWithProtocol = validatedUrl.startsWith("http") ? validatedUrl : `https://${validatedUrl}`

    // In a real implementation, we would call the Python script or a similar service
    // For this demo, we'll simulate the analysis with realistic data

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate simulated analysis results
    const results = generateSimulatedResults(urlWithProtocol)

    return results
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message)
    }
    throw new Error("Failed to analyze website. Please try again.")
  }
}

function generateSimulatedResults(url: string) {
  // Extract domain for display
  const domain = new URL(url).hostname

  // Generate random scores between 60-95 for most metrics
  const titleScore = Math.floor(Math.random() * 36) + 60
  const metaScore = Math.floor(Math.random() * 36) + 60
  const headersScore = Math.floor(Math.random() * 36) + 60
  const linksScore = Math.floor(Math.random() * 36) + 60
  const keywordsScore = Math.floor(Math.random() * 36) + 60
  const performanceScore = Math.floor(Math.random() * 36) + 60

  // Calculate overall score (weighted average)
  const overallScore = Math.floor(
    titleScore * 0.15 +
      metaScore * 0.15 +
      headersScore * 0.2 +
      linksScore * 0.15 +
      keywordsScore * 0.2 +
      performanceScore * 0.15,
  )

  // Generate random title length between 30-80 chars
  const titleLength = Math.floor(Math.random() * 51) + 30

  // Generate title recommendations based on length
  const titleRecommendations = []
  if (titleLength < 40) {
    titleRecommendations.push(
      "Your title is too short. Aim for 50-60 characters for optimal display in search results.",
    )
  } else if (titleLength > 65) {
    titleRecommendations.push(
      "Your title exceeds the recommended length and may be truncated in search results. Consider shortening it to 50-60 characters.",
    )
  }

  // Generate meta description
  const hasMetaDescription = Math.random() > 0.3 // 70% chance of having a meta description
  const metaDescriptionLength = hasMetaDescription ? Math.floor(Math.random() * 100) + 80 : 0

  // Generate meta recommendations
  const metaRecommendations = []
  if (!hasMetaDescription) {
    metaRecommendations.push(
      "Your page is missing a meta description. Add a compelling description of 120-160 characters to improve click-through rates.",
    )
  } else if (metaDescriptionLength < 120) {
    metaRecommendations.push(
      "Your meta description is too short. Aim for 120-160 characters to provide more context and improve click-through rates.",
    )
  } else if (metaDescriptionLength > 160) {
    metaRecommendations.push(
      "Your meta description exceeds the recommended length and may be truncated in search results. Consider shortening it to 120-160 characters.",
    )
  }

  // Generate header structure
  const h1Count = Math.floor(Math.random() * 3) // 0-2 H1 tags
  const h2Count = Math.floor(Math.random() * 6) + 1 // 1-6 H2 tags
  const h3Count = Math.floor(Math.random() * 8) + 2 // 2-9 H3 tags
  const h4Count = Math.floor(Math.random() * 5) // 0-4 H4 tags

  // Generate header recommendations
  const headerRecommendations = []
  if (h1Count === 0) {
    headerRecommendations.push(
      "Your page is missing an H1 tag. Add a single H1 tag containing your primary keyword to improve SEO.",
    )
  } else if (h1Count > 1) {
    headerRecommendations.push(
      "Your page has multiple H1 tags. For optimal SEO, use only one H1 tag as the main heading.",
    )
  }
  if (h2Count === 0) {
    headerRecommendations.push(
      "Your page has no H2 tags. Use H2 tags to structure your content and include relevant keywords.",
    )
  }

  // Generate links data
  const totalLinks = Math.floor(Math.random() * 50) + 10 // 10-59 total links
  const internalLinks = Math.floor(Math.random() * totalLinks)
  const externalLinks = totalLinks - internalLinks

  // Generate link recommendations
  const linkRecommendations = []
  if (internalLinks < 5) {
    linkRecommendations.push(
      "Your page has few internal links. Add more internal links to improve site navigation and distribute page authority.",
    )
  }
  if (externalLinks === 0) {
    linkRecommendations.push(
      "Your page has no external links. Consider adding links to authoritative sources to improve credibility.",
    )
  }

  // Generate keywords
  const keywords = [
    { word: domain.split(".")[0], count: Math.floor(Math.random() * 15) + 5 },
    { word: "service", count: Math.floor(Math.random() * 10) + 3 },
    { word: "product", count: Math.floor(Math.random() * 8) + 2 },
    { word: "quality", count: Math.floor(Math.random() * 6) + 1 },
    { word: "business", count: Math.floor(Math.random() * 5) + 1 },
    { word: "solution", count: Math.floor(Math.random() * 5) + 1 },
  ]

  // Calculate total words and keyword density
  const totalWords = 500 + Math.floor(Math.random() * 1000)
  keywords.forEach((keyword) => {
    keyword.density = Number.parseFloat(((keyword.count / totalWords) * 100).toFixed(2))
  })

  // Generate keyword recommendations
  const keywordRecommendations = []
  const primaryKeyword = keywords[0]
  if (primaryKeyword.density < 0.5) {
    keywordRecommendations.push(
      `Your primary keyword "${primaryKeyword.word}" has low density (${primaryKeyword.density}%). Consider increasing it to 1-2% for better optimization.`,
    )
  } else if (primaryKeyword.density > 3) {
    keywordRecommendations.push(
      `Your primary keyword "${primaryKeyword.word}" may be overused (${primaryKeyword.density}%). This could be seen as keyword stuffing. Aim for 1-2%.`,
    )
  }

  // Generate performance metrics
  const mobileFriendly = Math.random() > 0.2 // 80% chance of being mobile friendly
  const pageSpeed = Math.floor(Math.random() * 50) + 50 // 50-99 page speed

  // Generate performance recommendations
  const performanceRecommendations = []
  if (!mobileFriendly) {
    performanceRecommendations.push(
      "Your website is not mobile-friendly. With mobile-first indexing, this significantly impacts your rankings. Implement a responsive design.",
    )
  }
  if (pageSpeed < 70) {
    performanceRecommendations.push(
      "Your page load speed needs improvement. Optimize images, leverage browser caching, and minimize CSS/JavaScript to improve user experience and SEO.",
    )
  }

  // Generate next steps based on lowest scores
  const scores = [
    { area: "title tag", score: titleScore },
    { area: "meta description", score: metaScore },
    { area: "header structure", score: headersScore },
    { area: "link profile", score: linksScore },
    { area: "keyword optimization", score: keywordsScore },
    { area: "page performance", score: performanceScore },
  ].sort((a, b) => a.score - b.score)

  const nextSteps = [
    `Improve your ${scores[0].area} (scored ${scores[0].score}/100)`,
    `Optimize your ${scores[1].area} (scored ${scores[1].score}/100)`,
    `Work on your ${scores[2].area} (scored ${scores[2].score}/100)`,
  ]

  // Build the complete results object
  return {
    url,
    overallScore,
    title: {
      score: titleScore,
      content: `${domain} - Professional Services and Solutions for Your Business`,
      length: titleLength,
      recommendations: titleRecommendations,
    },
    metaTags: {
      score: metaScore,
      description: hasMetaDescription
        ? `${domain} provides professional services and innovative solutions for businesses of all sizes. Contact us today to learn how we can help your business grow and succeed.`
        : null,
      recommendations: metaRecommendations,
    },
    headers: {
      score: headersScore,
      tags: {
        h1: Array(h1Count)
          .fill(0)
          .map((_, i) => (i === 0 ? `Welcome to ${domain}` : `About ${domain}`)),
        h2: Array(h2Count)
          .fill(0)
          .map(
            (_, i) =>
              [`Our Services`, `Why Choose Us`, `Our Products`, `Testimonials`, `Contact Us`, `About Us`][i % 6],
          ),
        h3: Array(h3Count)
          .fill(0)
          .map((_, i) => [`Service ${i + 1}`, `Feature ${i + 1}`, `Benefit ${i + 1}`, `Product ${i + 1}`][i % 4]),
        h4: Array(h4Count)
          .fill(0)
          .map((_, i) => [`Subfeature ${i + 1}`, `Option ${i + 1}`, `Package ${i + 1}`][i % 3]),
      },
      recommendations: headerRecommendations,
    },
    links: {
      score: linksScore,
      total: totalLinks,
      internal: internalLinks,
      external: externalLinks,
      recommendations: linkRecommendations,
    },
    keywords: {
      score: keywordsScore,
      topKeywords: keywords,
      totalWords,
      recommendations: keywordRecommendations,
    },
    performance: {
      score: performanceScore,
      mobileFriendly,
      pageSpeed,
      recommendations: performanceRecommendations,
    },
    nextSteps,
  }
}
