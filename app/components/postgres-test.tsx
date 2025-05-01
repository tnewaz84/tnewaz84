"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PostgresTestProps {
  initialTestResult?: {
    success: boolean
    message: string
    timestamp?: string
    error?: string
  }
}

export default function PostgresTest({ initialTestResult }: PostgresTestProps) {
  const [testResult, setTestResult] = useState(initialTestResult)
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/postgres-test")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        message: "Error testing connection",
        error: (error as Error).message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>PostgreSQL Connection Test</CardTitle>
        <CardDescription>Test your direct PostgreSQL connection</CardDescription>
      </CardHeader>
      <CardContent>
        {testResult ? (
          <div
            className={`p-4 rounded-md ${testResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            <p className="font-medium">{testResult.message}</p>
            {testResult.timestamp && <p className="text-sm mt-2">Server time: {testResult.timestamp}</p>}
            {testResult.error && <p className="text-sm mt-2 text-red-600">Error: {testResult.error}</p>}
          </div>
        ) : (
          <p className="text-gray-500">Click the button below to test your PostgreSQL connection.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testConnection} disabled={isLoading}>
          {isLoading ? "Testing..." : "Test Connection"}
        </Button>
      </CardFooter>
    </Card>
  )
}
