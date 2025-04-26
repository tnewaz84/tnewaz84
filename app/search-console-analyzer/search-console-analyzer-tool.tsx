"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Loader2, AlertCircle, Info, Upload, BarChart2, TrendingUp, Search, ArrowUp } from "lucide-react"
import { analyzeSearchConsoleData } from "./actions"

export default function SearchConsoleAnalyzerTool() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.name.toLowerCase().endsWith(".csv")) {
        setFile(droppedFile)
        setError(null)
      } else {
        setError("Please upload a CSV file")
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a CSV file to upload")
      return
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file")
      return
    }

    try {
      setIsAnalyzing(true)
      setError(null)

      const formData = new FormData()
      formData.append("file", file)

      const data = await analyzeSearchConsoleData(formData)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze Search Console data")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const getPositionColor = (position: number) => {
    if (position <= 3) return "text-green-500"
    if (position <= 10) return "text-yellow-500"
    return "text-red-500"
  }

  const getCTRColor = (ctr: number) => {
    if (ctr >= 5) return "text-green-500"
    if (ctr >= 2) return "text-yellow-500"
    return "text-red-500"
  }

  // Add this function to the component to handle common errors
  const getErrorMessage = (error: string) => {
    if (error.includes("Missing required columns")) {
      return (
        <div>
          <p className="mb-2">{error}</p>
          <p className="text-sm">Make sure your CSV file contains the following columns:</p>
          <ul className="list-disc pl-5 text-sm mt-1">
            <li>Query (or Keywords, Search Terms)</li>
            <li>Clicks (or Click Count)</li>
            <li>Impressions (or Impression Count)</li>
            <li>Position (or Average Position, Ranking)</li>
          </ul>
        </div>
      )
    }
    return error
  }

  // Add this function to the component
  const loadSampleData = async () => {
    try {
      setIsAnalyzing(true)
      setError(null)

      // Simulate loading sample data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Use the simulated data
      const sampleData = {
        total_keywords: 327,
        total_impressions: 28456,
        total_clicks: 1243,
        avg_ctr: 4.37,
        avg_position: 8.6,
        semantic_groups: [
          {
            main_keyword: "digital marketing services",
            related_keywords: [
              "best digital marketing services",
              "digital marketing agency services",
              "digital marketing service packages",
              "professional digital marketing services",
              "digital marketing solutions",
            ],
            metrics: {
              impressions: 3245,
              clicks: 187,
              ctr: 5.76,
              position: 8.2,
            },
          },
          {
            main_keyword: "seo optimization",
            related_keywords: [
              "website seo optimization",
              "seo optimization services",
              "seo optimization techniques",
              "seo optimization tools",
            ],
            metrics: {
              impressions: 2876,
              clicks: 143,
              ctr: 4.97,
              position: 9.4,
            },
          },
          {
            main_keyword: "local seo services",
            related_keywords: [
              "local seo company",
              "local seo agency",
              "best local seo services",
              "affordable local seo",
            ],
            metrics: {
              impressions: 1987,
              clicks: 112,
              ctr: 5.64,
              position: 7.8,
            },
          },
          {
            main_keyword: "ecommerce website development",
            related_keywords: [
              "ecommerce website design",
              "custom ecommerce development",
              "ecommerce website builder",
              "shopify development",
            ],
            metrics: {
              impressions: 1654,
              clicks: 89,
              ctr: 5.38,
              position: 11.2,
            },
          },
          {
            main_keyword: "content marketing strategy",
            related_keywords: [
              "content marketing plan",
              "content strategy",
              "content marketing examples",
              "b2b content marketing",
            ],
            metrics: {
              impressions: 1432,
              clicks: 76,
              ctr: 5.31,
              position: 12.5,
            },
          },
          {
            main_keyword: "social media management",
            related_keywords: [
              "social media marketing services",
              "social media agency",
              "professional social media management",
              "social media marketing packages",
            ],
            metrics: {
              impressions: 1298,
              clicks: 82,
              ctr: 6.32,
              position: 6.7,
            },
          },
          {
            main_keyword: "ppc advertising services",
            related_keywords: [
              "google ads management",
              "ppc management services",
              "ppc marketing agency",
              "adwords management",
            ],
            metrics: {
              impressions: 1187,
              clicks: 65,
              ctr: 5.48,
              position: 10.3,
            },
          },
          {
            main_keyword: "web design company",
            related_keywords: [
              "professional web design",
              "website design agency",
              "custom website design",
              "responsive web design",
            ],
            metrics: {
              impressions: 1076,
              clicks: 59,
              ctr: 5.48,
              position: 9.8,
            },
          },
          {
            main_keyword: "email marketing services",
            related_keywords: [
              "email campaign management",
              "email marketing agency",
              "email marketing strategy",
              "email newsletter services",
            ],
            metrics: {
              impressions: 987,
              clicks: 43,
              ctr: 4.36,
              position: 13.2,
            },
          },
          {
            main_keyword: "conversion rate optimization",
            related_keywords: [
              "cro services",
              "conversion optimization",
              "website conversion optimization",
              "landing page optimization",
            ],
            metrics: {
              impressions: 876,
              clicks: 38,
              ctr: 4.34,
              position: 14.7,
            },
          },
        ],
      }

      setResults(sampleData)
    } catch (err) {
      setError("Failed to load sample data")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-4">
          <div
            className={`border-2 border-dashed ${isDragging ? "border-white bg-zinc-800" : "border-zinc-700"} rounded-lg p-6 text-center transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-zinc-500 mb-3" />
              <p className="text-lg font-medium mb-1">{file ? file.name : "Upload your Search Console CSV file"}</p>
              <p className="text-sm text-zinc-500">
                {file ? `${(file.size / 1024).toFixed(2)} KB` : "Click to browse or drag and drop"}
              </p>
            </label>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !file}
            className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 inline mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Search Console Data"
            )}
          </button>
        </div>
        {/* Add this button below the upload button */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={loadSampleData}
            disabled={isAnalyzing}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Don't have Search Console data? Try a sample dataset
          </button>
        </div>
        {error && (
          <div className="mt-3 text-red-400 text-sm flex items-start">
            <AlertCircle className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
            <div>{getErrorMessage(error)}</div>
          </div>
        )}
      </form>

      {isAnalyzing && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-white/70" />
          <p className="text-gray-300">Analyzing your Search Console data...</p>
          <p className="text-sm text-gray-400 mt-2">
            Processing {file?.name} (
            {(file?.size || 0) / 1024 > 1024
              ? `${((file?.size || 0) / 1024 / 1024).toFixed(2)} MB`
              : `${((file?.size || 0) / 1024).toFixed(2)} KB`}
            )
          </p>
          <div className="mt-4 max-w-md mx-auto">
            <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-white animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {results && !isAnalyzing && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
            <div>
              <h3 className="text-xl font-semibold">Search Console Analysis Results</h3>
              <p className="text-gray-400">Analyzed {results.total_keywords} keywords</p>
            </div>
          </div>

          {/* Overview Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-800 p-4 rounded-md text-center">
              <BarChart2 className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold">{formatNumber(results.total_impressions)}</p>
              <p className="text-sm text-gray-400">Total Impressions</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-md text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold">{formatNumber(results.total_clicks)}</p>
              <p className="text-sm text-gray-400">Total Clicks</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-md text-center">
              <Search className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
              <p className={`text-2xl font-bold ${getCTRColor(results.avg_ctr)}`}>{results.avg_ctr.toFixed(2)}%</p>
              <p className="text-sm text-gray-400">Average CTR</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-md text-center">
              <ArrowUp className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className={`text-2xl font-bold ${getPositionColor(results.avg_position)}`}>
                {results.avg_position.toFixed(1)}
              </p>
              <p className="text-sm text-gray-400">Average Position</p>
            </div>
          </div>

          {/* Semantic Keyword Groups */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Semantic Keyword Groups</h4>
            <p className="text-sm text-gray-400 mb-4">
              We've identified related keywords that users search for. Optimize your content to target these semantic
              groups.
            </p>

            {results.semantic_groups.map((group: any, index: number) => (
              <div key={index} className="bg-zinc-800 p-4 rounded-md">
                <div className="flex flex-col md:flex-row justify-between mb-3">
                  <h5 className="text-lg font-medium">{group.main_keyword}</h5>
                  <div className="flex gap-4 mt-2 md:mt-0">
                    <div className="flex items-center">
                      <BarChart2 className="h-4 w-4 mr-1 text-blue-400" />
                      <span className="text-sm">{formatNumber(group.metrics.impressions)}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                      <span className="text-sm">{formatNumber(group.metrics.clicks)}</span>
                    </div>
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-1 text-yellow-400" />
                      <span className={`text-sm ${getCTRColor(group.metrics.ctr)}`}>
                        {group.metrics.ctr.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ArrowUp className="h-4 w-4 mr-1 text-purple-400" />
                      <span className={`text-sm ${getPositionColor(group.metrics.position)}`}>
                        {group.metrics.position.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {group.related_keywords.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Related keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {group.related_keywords.map((keyword: string, i: number) => (
                        <span key={i} className="text-xs bg-zinc-700 px-2 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-zinc-700">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 mr-2 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-300">
                      {group.metrics.position <= 10
                        ? `This keyword group is already ranking well (position ${group.metrics.position.toFixed(1)}). Focus on improving CTR with better meta descriptions and title tags.`
                        : `This keyword group is ranking on page ${Math.ceil(group.metrics.position / 10)}. Create more comprehensive content to improve rankings.`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h4 className="text-lg font-medium mb-4">Recommendations</h4>
            <div className="space-y-4">
              <div className="bg-zinc-800 p-4 rounded-md">
                <h5 className="font-medium mb-2 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Content Optimization Opportunities
                </h5>
                <p className="text-sm text-gray-300 mb-3">
                  Based on your keyword data, here are content optimization opportunities:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  {results.semantic_groups.slice(0, 3).map((group: any, i: number) => (
                    <li key={i}>
                      Create or optimize content for "{group.main_keyword}" and related terms.
                      {group.metrics.position > 10
                        ? ` Currently ranking at position ${group.metrics.position.toFixed(1)}, with potential for significant improvement.`
                        : ` Currently ranking at position ${group.metrics.position.toFixed(1)}, focus on improving CTR.`}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-800 p-4 rounded-md">
                <h5 className="font-medium mb-2 flex items-center">
                  <Search className="h-5 w-5 mr-2 text-yellow-400" />
                  Click-Through Rate Optimization
                </h5>
                <p className="text-sm text-gray-300 mb-2">
                  Your average CTR is {results.avg_ctr.toFixed(2)}%. Here's how to improve it:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  <li>Use compelling title tags with emotional triggers and numbers</li>
                  <li>Write meta descriptions that include a clear call-to-action</li>
                  <li>Implement schema markup to enhance your search results with rich snippets</li>
                  <li>Test different meta titles and descriptions for high-impression keywords</li>
                </ul>
              </div>

              <div className="bg-zinc-800 p-4 rounded-md">
                <h5 className="font-medium mb-2 flex items-center">
                  <ArrowUp className="h-5 w-5 mr-2 text-purple-400" />
                  Ranking Improvement Strategy
                </h5>
                <p className="text-sm text-gray-300 mb-2">
                  To improve your average position of {results.avg_position.toFixed(1)}:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  <li>
                    Focus on creating comprehensive content that covers all related keywords in each semantic group
                  </li>
                  <li>Improve internal linking to distribute page authority to important pages</li>
                  <li>Enhance page speed and mobile usability for better user experience signals</li>
                  <li>Build quality backlinks to pages targeting competitive keywords</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="/#contact"
                className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors text-center"
              >
                Get Professional Help
              </a>
              <button
                onClick={() => {
                  setResults(null)
                  setFile(null)
                }}
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Analyze Another File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
