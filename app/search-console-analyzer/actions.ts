"use server"

import Papa from "papaparse"

export async function analyzeSearchConsoleData(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      throw new Error("No file provided")
    }

    // Read the file content
    const fileContent = await file.text()

    // Parse CSV data using Papa.parse instead of parse
    const { data, errors } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().trim(),
    })

    if (errors.length > 0) {
      throw new Error("Error parsing CSV file: " + errors[0].message)
    }

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No data found in the CSV file")
    }

    // Process the data
    const results = processSearchConsoleData(data)

    return results
  } catch (error) {
    console.error("Error analyzing Search Console data:", error)
    throw new Error(
      "Failed to analyze Search Console data. Please ensure you've uploaded a valid CSV file from Google Search Console.",
    )
  }
}

function processSearchConsoleData(data: any[]) {
  try {
    // Standardize column names
    const columnMapping: Record<string, string> = {
      queries: "query",
      "search query": "query",
      "search queries": "query",
      keyword: "query",
      keywords: "query",
      terms: "query",
      "search terms": "query",
      "query term": "query",
      "query terms": "query",
      "top queries": "query",

      click: "clicks",
      "click count": "clicks",
      "click counts": "clicks",
      "total clicks": "clicks",

      impression: "impressions",
      "impression count": "impressions",
      "impressions count": "impressions",
      "total impressions": "impressions",

      "ctr (%)": "ctr",
      "ctr%": "ctr",
      "ctr (percent)": "ctr",
      "click through rate": "ctr",
      "clickthrough rate": "ctr",
      "click-through rate": "ctr",
      "click through rate (%)": "ctr",

      "avg. position": "position",
      "average position": "position",
      "position (avg.)": "position",
      "avg position": "position",
      "average rank": "position",
      "avg. rank": "position",
      ranking: "position",
      "avg ranking": "position",
    }

    // Get the actual column names from the data
    const firstRow = data[0]
    const columns = Object.keys(firstRow)

    // Map columns to standard names
    const columnMap: Record<string, string> = {}
    for (const col of columns) {
      const lowerCol = col.toLowerCase().trim()
      if (columnMapping[lowerCol]) {
        columnMap[col] = columnMapping[lowerCol]
      } else {
        columnMap[col] = lowerCol
      }
    }

    // Check if required columns exist
    const requiredColumns = ["query", "clicks", "impressions", "position"]
    const missingColumns = []

    for (const reqCol of requiredColumns) {
      const found = Object.values(columnMap).includes(reqCol)
      if (!found) {
        missingColumns.push(reqCol)
      }
    }

    if (missingColumns.length > 0) {
      throw new Error(`Missing required columns: ${missingColumns.join(", ")}`)
    }

    // Standardize the data
    const standardizedData = data.map((row) => {
      const newRow: Record<string, any> = {}

      for (const [originalCol, value] of Object.entries(row)) {
        const standardCol = columnMap[originalCol]
        if (standardCol) {
          newRow[standardCol] = value
        }
      }

      // Convert numeric values
      for (const col of ["clicks", "impressions", "position"]) {
        if (newRow[col] !== undefined) {
          newRow[col] = Number.parseFloat(newRow[col]) || 0
        }
      }

      // Process CTR
      if (newRow["ctr"] !== undefined) {
        // Handle percentage format
        if (typeof newRow["ctr"] === "string") {
          const match = newRow["ctr"].match(/(\d+\.?\d*)%?/)
          newRow["ctr"] = match ? Number.parseFloat(match[1]) : 0
        } else {
          newRow["ctr"] = Number.parseFloat(newRow["ctr"]) || 0
        }
      } else {
        // Calculate CTR from clicks and impressions
        newRow["ctr"] = newRow["impressions"] > 0 ? (newRow["clicks"] / newRow["impressions"]) * 100 : 0
      }

      return newRow
    })

    // Filter out rows with empty queries
    const filteredData = standardizedData.filter((row) => row.query && row.query.trim() !== "")

    if (filteredData.length === 0) {
      throw new Error("No valid query data found in the CSV file")
    }

    // Calculate overall metrics
    const totalKeywords = filteredData.length
    const totalImpressions = filteredData.reduce((sum, row) => sum + row.impressions, 0)
    const totalClicks = filteredData.reduce((sum, row) => sum + row.clicks, 0)
    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0
    const avgPosition = filteredData.reduce((sum, row) => sum + row.position, 0) / totalKeywords

    // Group keywords into semantic clusters
    const semanticGroups = createSemanticGroups(filteredData)

    return {
      total_keywords: totalKeywords,
      total_impressions: totalImpressions,
      total_clicks: totalClicks,
      avg_ctr: avgCtr,
      avg_position: avgPosition,
      semantic_groups: semanticGroups,
    }
  } catch (error) {
    console.error("Error processing Search Console data:", error)
    throw new Error(
      "Failed to process Search Console data: " + (error instanceof Error ? error.message : String(error)),
    )
  }
}

function createSemanticGroups(data: any[]) {
  // Sort data by impressions (descending)
  const sortedData = [...data].sort((a, b) => b.impressions - a.impressions)

  // Create word-based groups
  const wordGroups: Record<string, any[]> = {}

  // Extract significant words from queries
  for (const row of sortedData) {
    const query = row.query.toLowerCase()
    const words = query.split(/\s+/)

    for (const word of words) {
      // Skip short words and common stop words
      if (word.length <= 3 || isStopWord(word)) continue

      if (!wordGroups[word]) {
        wordGroups[word] = []
      }

      wordGroups[word].push(row)
    }
  }

  // Create semantic groups
  const groups: any[] = []
  const usedQueries = new Set<string>()

  // Process word groups to create semantic clusters
  for (const [word, rows] of Object.entries(wordGroups)) {
    if (rows.length < 2) continue // Skip groups with only one query

    // Find the main keyword (highest impressions)
    const mainRow = rows[0]
    const mainKeyword = mainRow.query

    // Skip if this query is already used in another group
    if (usedQueries.has(mainKeyword.toLowerCase())) continue

    // Mark this query as used
    usedQueries.add(mainKeyword.toLowerCase())

    // Find related keywords
    const relatedKeywords: string[] = []
    let groupImpressions = mainRow.impressions
    let groupClicks = mainRow.clicks
    let groupPositionSum = mainRow.position
    let groupCount = 1

    for (let i = 1; i < rows.length && relatedKeywords.length < 5; i++) {
      const relatedRow = rows[i]
      const relatedKeyword = relatedRow.query

      // Skip if this query is already used in another group
      if (usedQueries.has(relatedKeyword.toLowerCase())) continue

      // Add to related keywords
      relatedKeywords.push(relatedKeyword)
      usedQueries.add(relatedKeyword.toLowerCase())

      // Update group metrics
      groupImpressions += relatedRow.impressions
      groupClicks += relatedRow.clicks
      groupPositionSum += relatedRow.position
      groupCount++
    }

    // Only add groups with at least one related keyword
    if (relatedKeywords.length > 0) {
      groups.push({
        main_keyword: mainKeyword,
        related_keywords: relatedKeywords,
        metrics: {
          impressions: groupImpressions,
          clicks: groupClicks,
          ctr: groupImpressions > 0 ? (groupClicks / groupImpressions) * 100 : 0,
          position: groupPositionSum / groupCount,
        },
      })
    }
  }

  // Sort groups by impressions
  groups.sort((a, b) => b.metrics.impressions - a.metrics.impressions)

  // Return top 10 groups
  return groups.slice(0, 10)
}

function isStopWord(word: string): boolean {
  const stopWords = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "in",
    "on",
    "at",
    "to",
    "for",
    "with",
    "by",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "from",
    "up",
    "down",
    "of",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "can",
    "will",
    "just",
    "should",
    "now",
  ])

  return stopWords.has(word.toLowerCase())
}
