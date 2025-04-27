"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RedisExample() {
  const [key, setKey] = useState("example-key")
  const [value, setValue] = useState("")
  const [storedValue, setStoredValue] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSetValue() {
    if (!key || !value) return

    setLoading(true)
    try {
      const response = await fetch("/api/redis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set", key, value }),
      })

      const result = await response.json()
      if (result.success) {
        setValue("")
        alert("Value stored successfully!")
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      alert(`Failed to store value: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleGetValue() {
    if (!key) return

    setLoading(true)
    try {
      const response = await fetch(`/api/redis?action=get&key=${encodeURIComponent(key)}`)
      const result = await response.json()

      if (result.success) {
        setStoredValue(result.data)
      } else {
        setStoredValue(null)
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      alert(`Failed to retrieve value: ${error}`)
      setStoredValue(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Redis Example</CardTitle>
        <CardDescription>Test Redis caching functionality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="key" className="text-sm font-medium">
            Key
          </label>
          <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Enter key" />
        </div>
        <div className="space-y-2">
          <label htmlFor="value" className="text-sm font-medium">
            Value
          </label>
          <Input
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value to store"
          />
        </div>
        {storedValue !== null && (
          <div className="p-3 bg-gray-100 rounded-md dark:bg-gray-800">
            <p className="text-sm font-medium">Stored Value:</p>
            <p className="font-mono break-all">{storedValue}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleSetValue} disabled={loading || !key || !value}>
          {loading ? "Storing..." : "Store Value"}
        </Button>
        <Button onClick={handleGetValue} variant="outline" disabled={loading || !key}>
          {loading ? "Retrieving..." : "Get Value"}
        </Button>
      </CardFooter>
    </Card>
  )
}
