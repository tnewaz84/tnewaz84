"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCacheKeys, getCacheValue, deleteCacheKey, clearCachePattern } from "./actions"
import { Loader2, RefreshCw, Search, Trash2 } from "lucide-react"

export default function CacheManager() {
  const [pattern, setPattern] = useState("*")
  const [keys, setKeys] = useState<string[]>([])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [selectedValue, setSelectedValue] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [valueLoading, setValueLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load keys on initial render
  useEffect(() => {
    loadKeys()
  }, [])

  // Load keys based on pattern
  async function loadKeys() {
    setLoading(true)
    setError(null)
    try {
      const result = await getCacheKeys(pattern)
      if (result.success) {
        setKeys(result.keys)
      } else {
        setError(result.error || "Failed to load cache keys")
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  // Load value for a specific key
  async function loadValue(key: string) {
    setValueLoading(true)
    setSelectedKey(key)
    setSelectedValue(null)
    try {
      const result = await getCacheValue(key)
      if (result.success) {
        setSelectedValue(result.value)
      } else {
        setError(result.error || "Failed to load cache value")
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setValueLoading(false)
    }
  }

  // Delete a specific key
  async function handleDeleteKey(key: string) {
    if (!confirm(`Are you sure you want to delete the key "${key}"?`)) {
      return
    }

    try {
      const result = await deleteCacheKey(key)
      if (result.success) {
        // Remove from the list
        setKeys(keys.filter((k) => k !== key))
        // Clear selected key if it was deleted
        if (selectedKey === key) {
          setSelectedKey(null)
          setSelectedValue(null)
        }
      } else {
        setError(result.error || "Failed to delete cache key")
      }
    } catch (error) {
      setError((error as Error).message)
    }
  }

  // Clear all keys matching a pattern
  async function handleClearPattern(patternToClear: string) {
    if (!confirm(`Are you sure you want to clear all keys matching "${patternToClear}"?`)) {
      return
    }

    try {
      const result = await clearCachePattern(patternToClear)
      if (result.success) {
        // Reload keys
        loadKeys()
        // Clear selected key
        setSelectedKey(null)
        setSelectedValue(null)
      } else {
        setError(result.error || "Failed to clear cache pattern")
      }
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Cache Keys</CardTitle>
          <CardDescription>View and manage Redis cache keys</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Key pattern (e.g., ai-chat:*)"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1"
            />
            <Button onClick={loadKeys} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Keys ({keys.length})</TabsTrigger>
              <TabsTrigger value="ai">AI Chat ({keys.filter((k) => k.startsWith("ai-chat:")).length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="border rounded-md">
                {keys.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No cache keys found</div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {keys.map((key) => (
                      <div
                        key={key}
                        className={`flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer ${
                          selectedKey === key ? "bg-gray-100" : ""
                        }`}
                        onClick={() => loadValue(key)}
                      >
                        <span className="truncate flex-1">{key}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteKey(key)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <div className="border rounded-md">
                {keys.filter((k) => k.startsWith("ai-chat:")).length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No AI chat cache keys found</div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {keys
                      .filter((k) => k.startsWith("ai-chat:"))
                      .map((key) => (
                        <div
                          key={key}
                          className={`flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer ${
                            selectedKey === key ? "bg-gray-100" : ""
                          }`}
                          onClick={() => loadValue(key)}
                        >
                          <span className="truncate flex-1">{key.replace("ai-chat:", "")}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteKey(key)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={loadKeys}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="destructive" onClick={() => handleClearPattern("ai-chat:*")}>
            Clear AI Chat Cache
          </Button>
        </CardFooter>
      </Card>

      {selectedKey && (
        <Card>
          <CardHeader>
            <CardTitle>Cache Value</CardTitle>
            <CardDescription>{selectedKey}</CardDescription>
          </CardHeader>
          <CardContent>
            {valueLoading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : selectedValue ? (
              <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                <pre className="whitespace-pre-wrap break-words">
                  {typeof selectedValue === "string" ? selectedValue : JSON.stringify(selectedValue, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-center text-gray-500">No value found</div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={() => handleDeleteKey(selectedKey)}>
              Delete Key
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
