"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Database, Cloud, Zap, Brain } from "lucide-react"

interface ServiceStatus {
  name: string
  status: "healthy" | "error" | "warning" | "checking"
  message: string
  details?: string
  icon: React.ReactNode
}

export function TroubleshootDashboard() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "Supabase Database",
      status: "checking",
      message: "Checking connection...",
      icon: <Database className="h-5 w-5" />,
    },
    {
      name: "Upstash Redis",
      status: "checking",
      message: "Checking connection...",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      name: "Groq AI",
      status: "checking",
      message: "Checking API...",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Vercel Blob",
      status: "checking",
      message: "Checking storage...",
      icon: <Cloud className="h-5 w-5" />,
    },
  ])

  const [envVars, setEnvVars] = useState<Record<string, boolean>>({})
  const [isChecking, setIsChecking] = useState(false)

  const checkServices = async () => {
    setIsChecking(true)

    // Check environment variables
    const envCheck = await fetch("/api/troubleshoot/env")
    const envData = await envCheck.json()
    setEnvVars(envData.variables)

    // Check each service
    const serviceChecks = [
      { name: "Supabase Database", endpoint: "/api/troubleshoot/supabase" },
      { name: "Upstash Redis", endpoint: "/api/troubleshoot/redis" },
      { name: "Groq AI", endpoint: "/api/troubleshoot/groq" },
      { name: "Vercel Blob", endpoint: "/api/troubleshoot/blob" },
    ]

    const updatedServices = await Promise.all(
      serviceChecks.map(async (service, index) => {
        try {
          const response = await fetch(service.endpoint)
          const data = await response.json()

          return {
            ...services[index],
            status: data.status as "healthy" | "error" | "warning",
            message: data.message,
            details: data.details,
          }
        } catch (error) {
          return {
            ...services[index],
            status: "error" as const,
            message: "Failed to check service",
            details: error instanceof Error ? error.message : "Unknown error",
          }
        }
      }),
    )

    setServices(updatedServices)
    setIsChecking(false)
  }

  useEffect(() => {
    checkServices()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <RefreshCw className="h-5 w-5 text-gray-500 animate-spin" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Healthy
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Warning
          </Badge>
        )
      default:
        return <Badge variant="outline">Checking...</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button onClick={checkServices} disabled={isChecking} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
            {isChecking ? "Checking..." : "Refresh All"}
          </Button>
        </div>
      </div>

      {/* Environment Variables Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Environment Variables
          </CardTitle>
          <CardDescription>Required environment variables for your integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(envVars).map(([key, exists]) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-mono text-sm">{key}</span>
                {exists ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {service.icon}
                  {service.name}
                </div>
                {getStatusBadge(service.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                {getStatusIcon(service.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{service.message}</p>
                  {service.details && <p className="text-xs text-gray-500 mt-1">{service.details}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common troubleshooting actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Database className="h-6 w-6" />
              <span className="text-sm">Test Database</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Zap className="h-6 w-6" />
              <span className="text-sm">Clear Cache</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Brain className="h-6 w-6" />
              <span className="text-sm">Test AI</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Cloud className="h-6 w-6" />
              <span className="text-sm">Test Storage</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Runtime:</span>
              <span className="ml-2">Next.js {process.env.NODE_ENV}</span>
            </div>
            <div>
              <span className="font-medium">Region:</span>
              <span className="ml-2">{process.env.VERCEL_REGION || "Local"}</span>
            </div>
            <div>
              <span className="font-medium">Timestamp:</span>
              <span className="ml-2">{new Date().toISOString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
