"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw } from "lucide-react"
import { getRedisInfo } from "@/lib/redis"

export default function RedisDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getRedisInfo()
      setStats(data)
    } catch (error) {
      console.error("Error fetching Redis stats:", error)
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Redis Dashboard</CardTitle>
          <CardDescription>Error loading Redis stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 text-red-800 p-4 rounded-md">{error}</div>
        </CardContent>
        <CardFooter>
          <Button onClick={fetchStats}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (loading && !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Redis Dashboard</CardTitle>
          <CardDescription>Loading Redis stats...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Redis Dashboard</CardTitle>
            <CardDescription>Real-time Redis statistics</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchStats} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
            <TabsTrigger value="keys">Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm font-medium text-gray-500 mb-1">Uptime</div>
                <div className="text-2xl font-bold">{stats?.uptime_days || 0} days</div>
                <div className="text-sm text-gray-500">{stats?.uptime_hours || 0} hours</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm font-medium text-gray-500 mb-1">Connected Clients</div>
                <div className="text-2xl font-bold">{stats?.connected_clients || 0}</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm font-medium text-gray-500 mb-1">Commands Processed</div>
                <div className="text-2xl font-bold">{stats?.total_commands_processed?.toLocaleString() || 0}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="memory">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-gray-500">
                    {stats?.used_memory_human || "0B"} / {stats?.maxmemory_human || "Unlimited"}
                  </span>
                </div>
                <Progress value={stats?.memory_percent || 0} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Used Memory</div>
                  <div className="text-2xl font-bold">{stats?.used_memory_human || "0B"}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Peak Memory</div>
                  <div className="text-2xl font-bold">{stats?.used_memory_peak_human || "0B"}</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keys">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Total Keys</div>
                  <div className="text-2xl font-bold">{stats?.total_keys || 0}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Expires</div>
                  <div className="text-2xl font-bold">{stats?.expires || 0}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Expired Keys</div>
                  <div className="text-2xl font-bold">{stats?.expired_keys || 0}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm font-medium text-gray-500 mb-1">Key Patterns</div>
                <div className="mt-2 space-y-2">
                  {stats?.key_patterns?.map((pattern: any) => (
                    <div key={pattern.pattern} className="flex justify-between">
                      <span>{pattern.pattern}</span>
                      <span className="font-medium">{pattern.count}</span>
                    </div>
                  )) || <div className="text-gray-500">No key patterns available</div>}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Last updated: {stats?.timestamp ? new Date(stats.timestamp).toLocaleString() : "Never"}
      </CardFooter>
    </Card>
  )
}
