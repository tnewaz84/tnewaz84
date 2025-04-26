"use client"

import type React from "react"

import { useState } from "react"
import { analyzeSEO } from "./actions"
import { Loader2, CheckCircle, AlertCircle, Info } from "lucide-react"

export default function SEOAuditTool() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic URL validation
    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      setIsAnalyzing(true)
      setError(null)

      const data = await analyzeSEO(url)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze website")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (score >= 60) return <Info className="h-5 w-5 text-yellow-500" />
    return <AlertCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., example.com)"
            className="flex-grow px-4 py-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            type="submit"
            disabled={isAnalyzing}
            className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 inline mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Website"
            )}
          </button>
        </div>
        {error && (
          <div className="mt-3 text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}
      </form>

      {isAnalyzing && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-white/70" />
          <p className="text-gray-300">Analyzing your website...</p>
          <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
        </div>
      )}

      {results && !isAnalyzing && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
            <div>
              <h3 className="text-xl font-semibold">SEO Analysis Results</h3>
              <p className="text-gray-400">URL: {results.url}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}/100
                </div>
                <div className="text-sm text-gray-400">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Title Analysis */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center">
              {getScoreIcon(results.title.score)}
              <span className="ml-2">Title Tag</span>
              <span className={`ml-auto ${getScoreColor(results.title.score)}`}>{results.title.score}/100</span>
            </h4>
            <div className="bg-zinc-800 p-4 rounded-md">
              <p className="font-medium text-white">{results.title.content || "No title found"}</p>
              <p className="text-sm text-gray-400 mt-1">Length: {results.title.length} characters</p>
            </div>
            {results.title.recommendations.map((rec: string, i: number) => (
              <p key={i} className="text-sm text-yellow-400 flex items-start">
                <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                {rec}
              </p>
            ))}
          </div>

          {/* Meta Description Analysis */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center">
              {getScoreIcon(results.metaTags.score)}
              <span className="ml-2">Meta Description</span>
              <span className={`ml-auto ${getScoreColor(results.metaTags.score)}`}>{results.metaTags.score}/100</span>
            </h4>
            <div className="bg-zinc-800 p-4 rounded-md">
              <p className="text-white">{results.metaTags.description || "No meta description found"}</p>
              {results.metaTags.description && (
                <p className="text-sm text-gray-400 mt-1">Length: {results.metaTags.description.length} characters</p>
              )}
            </div>
            {results.metaTags.recommendations.map((rec: string, i: number) => (
              <p key={i} className="text-sm text-yellow-400 flex items-start">
                <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                {rec}
              </p>
            ))}
          </div>

          {/* Headers Analysis */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center">
              {getScoreIcon(results.headers.score)}
              <span className="ml-2">Header Structure</span>
              <span className={`ml-auto ${getScoreColor(results.headers.score)}`}>{results.headers.score}/100</span>
            </h4>
            <div className="bg-zinc-800 p-4 rounded-md space-y-3">
              {Object.entries(results.headers.tags).map(([tag, headers]: [string, any]) => (
                <div key={tag}>
                  <p className="text-sm font-medium text-gray-300">
                    {tag.toUpperCase()} Tags ({headers.length})
                  </p>
                  {headers.length > 0 ? (
                    <ul className="mt-1 space-y-1">
                      {headers.map((header: string, i: number) => (
                        <li key={i} className="text-sm text-gray-400 truncate">
                          {header}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">None found</p>
                  )}
                </div>
              ))}
            </div>
            {results.headers.recommendations.map((rec: string, i: number) => (
              <p key={i} className="text-sm text-yellow-400 flex items-start">
                <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                {rec}
              </p>
            ))}
          </div>

          {/* Links Analysis */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center">
              {getScoreIcon(results.links.score)}
              <span className="ml-2">Links Analysis</span>
              <span className={`ml-auto ${getScoreColor(results.links.score)}`}>{results.links.score}/100</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-800 p-4 rounded-md text-center">
                <p className="text-2xl font-bold">{results.links.total}</p>
                <p className="text-sm text-gray-400">Total Links</p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md text-center">
                <p className="text-2xl font-bold">{results.links.internal}</p>
                <p className="text-sm text-gray-400">Internal Links</p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md text-center">
                <p className="text-2xl font-bold">{results.links.external}</p>
                <p className="text-sm text-gray-400">External Links</p>
              </div>
            </div>
            {results.links.recommendations.map((rec: string, i: number) => (
              <p key={i} className="text-sm text-yellow-400 flex items-start">
                <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                {rec}
              </p>
            ))}
          </div>

          {/* Keywords Analysis */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center">
              {getScoreIcon(results.keywords.score)}
              <span className="ml-2">Keyword Analysis</span>
              <span className={`ml-auto ${getScoreColor(results.keywords.score)}`}>{results.keywords.score}/100</span>
            </h4>
            <div className="bg-zinc-800 p-4 rounded-md">
              <p className="text-sm text-gray-300 mb-3">Top Keywords by Density</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {results.keywords.topKeywords.map((keyword: any, i: number) => (
                  <div key={i} className="bg-zinc-700/50 p-2 rounded">
                    <p className="font-medium truncate">{keyword.word}</p>
                    <p className="text-xs text-gray-400">
                      {keyword.count} times ({keyword.density}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {results.keywords.recommendations.map((rec: string, i: number) => (
              <p key={i} className="text-sm text-yellow-400 flex items-start">
                <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                {rec}
              </p>
            ))}
          </div>

          {/* Performance Indicators */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center">
              {getScoreIcon(results.performance.score)}
              <span className="ml-2">Performance Indicators</span>
              <span className={`ml-auto ${getScoreColor(results.performance.score)}`}>
                {results.performance.score}/100
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-800 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-300">Mobile Friendly</p>
                  <div className={results.performance.mobileFriendly ? "text-green-500" : "text-red-500"}>
                    {results.performance.mobileFriendly ? "Yes" : "No"}
                  </div>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${results.performance.mobileFriendly ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: results.performance.mobileFriendly ? "100%" : "30%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-300">Page Speed</p>
                  <div
                    className={`
                    ${results.performance.pageSpeed >= 80 ? "text-green-500" : ""}
                    ${results.performance.pageSpeed >= 50 && results.performance.pageSpeed < 80 ? "text-yellow-500" : ""}
                    ${results.performance.pageSpeed < 50 ? "text-red-500" : ""}
                  `}
                  >
                    {results.performance.pageSpeed}/100
                  </div>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full 
                      ${results.performance.pageSpeed >= 80 ? "bg-green-500" : ""}
                      ${results.performance.pageSpeed >= 50 && results.performance.pageSpeed < 80 ? "bg-yellow-500" : ""}
                      ${results.performance.pageSpeed < 50 ? "bg-red-500" : ""}
                    `}
                    style={{ width: `${results.performance.pageSpeed}%` }}
                  ></div>
                </div>
              </div>
            </div>
            {results.performance.recommendations.map((rec: string, i: number) => (
              <p key={i} className="text-sm text-yellow-400 flex items-start">
                <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                {rec}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h4 className="text-lg font-medium mb-4">Next Steps</h4>
            <p className="text-gray-300 mb-4">
              Based on this analysis, here are the key areas to focus on for improving your website's SEO:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300 mb-6">
              {results.nextSteps.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="#contact"
                className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors text-center"
              >
                Get Professional Help
              </a>
              <button
                onClick={() => setResults(null)}
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Analyze Another Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
