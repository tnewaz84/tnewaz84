"use server"

import Papa from "papaparse"
import { queryDatabase } from "@/lib/postgres"

// Type definitions for the CSV data
interface SearchConsoleData {
  page: string
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

interface KeywordCluster {
  mainKeyword: string
  relatedKeywords: string[]
  totalClicks: number
  totalImpressions: number
  avgPosition: number
  pages: string[]
}

interface AnalysisResult {
  clusters: KeywordCluster[]
  topPages: { url: string; clicks: number; impressions: number }[]
  recommendations: string[]
  metrics: {
    totalClicks: number
    totalImpressions: number
    avgCTR: number
    avgPosition: number
  }
}

export async function analyzeSearchConsoleData(formData: FormData): Promise<AnalysisResult> {
  try {
    const file = formData.get("csvFile") as File

    if (!file) {
      throw new Error("No file uploaded")
    }

    // Read the file content
    const text = await file.text()

    // Parse CSV
    const { data } = Papa.parse<any>(text, {
      header: true,
      skipEmptyLines: true,
    })

    // Convert to SearchConsoleData format
    const searchData: SearchConsoleData[] = data.map((row: any) => ({
      page: row.Page || row.page || "",
      query: row.Query || row.query || "",
      clicks: Number.parseInt(row.Clicks || row.clicks || "0", 10),
      impressions: Number.parseInt(row.Impressions || row.impressions || "0", 10),
      ctr: Number.parseFloat(row.CTR?.replace("%", "") || row.ctr?.replace("%", "") || "0") / 100,
      position: Number.parseFloat(row.Position || row.position || "0"),
    }))

    // Store data in database for future reference
    await storeSearchData(searchData)

    // Perform keyword clustering
    const clusters = clusterKeywords(searchData)

    // Get top performing pages
    const topPages = getTopPages(searchData)

    // Generate recommendations
    const recommendations = generateRecommendations(searchData, clusters)

    // Calculate overall metrics
    const metrics = calculateMetrics(searchData)

    return {
      clusters,
      topPages,
      recommendations,
      metrics,
    }
  } catch (error) {
    console.error("Error analyzing search console data:", error)
    throw new Error(`Failed to analyze search console data: ${(error as Error).message}`)
  }
}

async function storeSearchData(data: SearchConsoleData[]) {
  try {
    // First, create a temporary table to store the data
    await queryDatabase(`
      CREATE TABLE IF NOT EXISTS search_console_data (
        id SERIAL PRIMARY KEY,
        page TEXT,
        query TEXT,
        clicks INTEGER,
        impressions INTEGER,
        ctr FLOAT,
        position FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert the data in batches to avoid query size limitations
    const batchSize = 100
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)

      // Create a multi-row insert statement
      const values = batch
        .map(
          (item, index) =>
            `($${index * 6 + 1}, $${index * 6 + 2}, $${index * 6 + 3}, $${index * 6 + 4}, $${index * 6 + 5}, $${index * 6 + 6})`,
        )
        .join(", ")

      const params = batch.flatMap((item) => [
        item.page,
        item.query,
        item.clicks,
        item.impressions,
        item.ctr,
        item.position,
      ])

      await queryDatabase(
        `INSERT INTO search_console_data (page, query, clicks, impressions, ctr, position) VALUES ${values}`,
        params,
      )
    }

    console.log(`Successfully stored ${data.length} search console data records`)
  } catch (error) {
    console.error("Error storing search data:", error)
    // Continue with analysis even if storage fails
  }
}

function clusterKeywords(data: SearchConsoleData[]): KeywordCluster[] {
  // Group queries by common words
  const keywordMap = new Map<string, Set<string>>()

  // Extract all unique keywords
  data.forEach((item) => {
    const words = item.query.toLowerCase().split(" ")
    words.forEach((word) => {
      if (word.length > 3) {
        // Only consider words with more than 3 characters
        if (!keywordMap.has(word)) {
          keywordMap.set(word, new Set())
        }
        keywordMap.get(word)?.add(item.query)
      }
    })
  })

  // Create clusters
  const clusters: KeywordCluster[] = []
  const processedQueries = new Set<string>()

  // Sort keywords by the number of related queries (descending)
  const sortedKeywords = Array.from(keywordMap.entries()).sort((a, b) => b[1].size - a[1].size)

  for (const [keyword, relatedQueries] of sortedKeywords) {
    // Skip if this keyword has fewer than 2 related queries
    if (relatedQueries.size < 2) continue

    // Get queries that haven't been processed yet
    const newQueries = Array.from(relatedQueries).filter((query) => !processedQueries.has(query))

    if (newQueries.length < 2) continue

    // Mark these queries as processed
    newQueries.forEach((query) => processedQueries.add(query))

    // Calculate metrics for this cluster
    let totalClicks = 0
    let totalImpressions = 0
    let positionSum = 0
    const pages = new Set<string>()

    newQueries.forEach((query) => {
      const queryData = data.filter((item) => item.query === query)
      queryData.forEach((item) => {
        totalClicks += item.clicks
        totalImpressions += item.impressions
        positionSum += item.position
        if (item.page) pages.add(item.page)
      })
    })

    const avgPosition = positionSum / newQueries.length

    clusters.push({
      mainKeyword: keyword,
      relatedKeywords: newQueries,
      totalClicks,
      totalImpressions,
      avgPosition,
      pages: Array.from(pages),
    })

    // Limit to top 10 clusters
    if (clusters.length >= 10) break
  }

  // Sort clusters by total clicks (descending)
  return clusters.sort((a, b) => b.totalClicks - a.totalClicks)
}

function getTopPages(data: SearchConsoleData[]) {
  // Group by page and sum metrics
  const pageMap = new Map<string, { clicks: number; impressions: number }>()

  data.forEach((item) => {
    if (!item.page) return

    if (!pageMap.has(item.page)) {
      pageMap.set(item.page, { clicks: 0, impressions: 0 })
    }

    const pageData = pageMap.get(item.page)!
    pageData.clicks += item.clicks
    pageData.impressions += item.impressions
  })

  // Convert to array and sort by clicks (descending)
  return Array.from(pageMap.entries())
    .map(([url, metrics]) => ({ url, ...metrics }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10) // Top 10 pages
}

function generateRecommendations(data: SearchConsoleData[], clusters: KeywordCluster[]): string[] {
  const recommendations: string[] = []

  // Identify keywords with high impressions but low clicks
  const highImpLowClick = data
    .filter((item) => item.impressions > 100 && item.ctr < 0.02)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5)

  if (highImpLowClick.length > 0) {
    recommendations.push(
      `Optimize title and meta descriptions for these high-impression, low-CTR queries: ${highImpLowClick.map((item) => item.query).join(", ")}`,
    )
  }

  // Identify keywords ranking on page 2 (positions 11-20)
  const page2Keywords = data
    .filter((item) => item.position >= 11 && item.position <= 20)
    .sort((a, b) => a.position - b.position)
    .slice(0, 5)

  if (page2Keywords.length > 0) {
    recommendations.push(
      `Focus on improving these keywords that are close to page 1: ${page2Keywords.map((item) => item.query).join(", ")}`,
    )
  }

  // Recommendations based on keyword clusters
  clusters.forEach((cluster) => {
    if (cluster.totalClicks > 50 && cluster.pages.length < 2) {
      recommendations.push(
        `Create more content around "${cluster.mainKeyword}" - this topic drives significant traffic but only appears on ${cluster.pages.length} page(s)`,
      )
    }
  })

  // Add general recommendations if specific ones are few
  if (recommendations.length < 3) {
    recommendations.push(
      "Regularly update your highest-performing content to maintain rankings",
      "Consider creating topic clusters around your main keywords",
      "Improve internal linking to distribute page authority",
    )
  }

  return recommendations
}

function calculateMetrics(data: SearchConsoleData[]) {
  let totalClicks = 0
  let totalImpressions = 0
  let ctrSum = 0
  let positionSum = 0

  data.forEach((item) => {
    totalClicks += item.clicks
    totalImpressions += item.impressions
    ctrSum += item.ctr
    positionSum += item.position
  })

  const avgCTR = data.length > 0 ? ctrSum / data.length : 0
  const avgPosition = data.length > 0 ? positionSum / data.length : 0

  return {
    totalClicks,
    totalImpressions,
    avgCTR,
    avgPosition,
  }
}
