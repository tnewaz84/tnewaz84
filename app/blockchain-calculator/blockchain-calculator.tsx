"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { InfoIcon, RefreshCw } from "lucide-react"
import { calculateRewards } from "./calculate-rewards"
import { fetchTokenPrices } from "./token-prices"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface TokenPrice {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
}

export interface BlockchainNetwork {
  id: string
  name: string
  token: string
  resourceType: "compute" | "storage" | "bandwidth"
  rewardRate: number
  difficulty: number
}

const defaultNetworks: BlockchainNetwork[] = [
  {
    id: "filecoin",
    name: "Filecoin",
    token: "FIL",
    resourceType: "storage",
    rewardRate: 0.05,
    difficulty: 1.2,
  },
  {
    id: "theta",
    name: "Theta",
    token: "THETA",
    resourceType: "bandwidth",
    rewardRate: 0.02,
    difficulty: 1.0,
  },
  {
    id: "livepeer",
    name: "Livepeer",
    token: "LPT",
    resourceType: "compute",
    rewardRate: 0.03,
    difficulty: 1.1,
  },
  {
    id: "arweave",
    name: "Arweave",
    token: "AR",
    resourceType: "storage",
    rewardRate: 0.04,
    difficulty: 1.3,
  },
  {
    id: "render",
    name: "Render Network",
    token: "RNDR",
    resourceType: "compute",
    rewardRate: 0.06,
    difficulty: 1.4,
  },
]

export function BlockchainCalculator() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("filecoin")
  const [cpuCores, setCpuCores] = useState<number>(4)
  const [ramGB, setRamGB] = useState<number>(8)
  const [storageGB, setStorageGB] = useState<number>(1000)
  const [bandwidthMbps, setBandwidthMbps] = useState<number>(100)
  const [uptimePercentage, setUptimePercentage] = useState<number>(95)
  const [tokenPrices, setTokenPrices] = useState<TokenPrice[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rewards, setRewards] = useState<{
    daily: { tokens: number; usd: number }
    weekly: { tokens: number; usd: number }
    monthly: { tokens: number; usd: number }
  } | null>(null)

  const network = defaultNetworks.find((n) => n.id === selectedNetwork) || defaultNetworks[0]

  useEffect(() => {
    loadTokenPrices()
  }, [])

  const loadTokenPrices = async () => {
    setIsLoading(true)
    try {
      const prices = await fetchTokenPrices(defaultNetworks.map((n) => n.token))
      setTokenPrices(prices)
    } catch (error) {
      console.error("Failed to fetch token prices:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCalculate = () => {
    const tokenPrice = tokenPrices.find((t) => t.symbol === network.token)?.price || 0

    const calculatedRewards = calculateRewards({
      network,
      tokenPrice,
      cpuCores,
      ramGB,
      storageGB,
      bandwidthMbps,
      uptimePercentage,
    })

    setRewards(calculatedRewards)
  }

  useEffect(() => {
    if (tokenPrices.length > 0) {
      handleCalculate()
    }
  }, [selectedNetwork, cpuCores, ramGB, storageGB, bandwidthMbps, uptimePercentage, tokenPrices])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatTokenAmount = (value: number) => {
    return value.toFixed(4)
  }

  return (
    <Card className="w-full bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl text-green-500">Blockchain Reward Calculator</CardTitle>
        <CardDescription>Estimate your potential earnings from contributing to blockchain networks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="network">Blockchain Network</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadTokenPrices}
                  disabled={isLoading}
                  className="h-8 px-2 text-xs"
                >
                  <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh Prices
                </Button>
              </div>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a network" />
                </SelectTrigger>
                <SelectContent>
                  {defaultNetworks.map((network) => (
                    <SelectItem key={network.id} value={network.id}>
                      {network.name} ({network.token})
                      {tokenPrices.find((t) => t.symbol === network.token) && (
                        <span className="ml-2 text-xs opacity-70">
                          {formatCurrency(tokenPrices.find((t) => t.symbol === network.token)?.price || 0)}
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {tokenPrices.find((t) => t.symbol === network.token) && (
                <div className="mt-2 text-sm">
                  <span className="text-gray-400">Current price: </span>
                  <span className="font-medium">
                    {formatCurrency(tokenPrices.find((t) => t.symbol === network.token)?.price || 0)}
                  </span>
                  <span
                    className={`ml-2 ${
                      (tokenPrices.find((t) => t.symbol === network.token)?.change24h || 0) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {(tokenPrices.find((t) => t.symbol === network.token)?.change24h || 0) >= 0 ? "+" : ""}
                    {(tokenPrices.find((t) => t.symbol === network.token)?.change24h || 0).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="cpu-cores" className="mr-2">
                    CPU Cores
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">Number of CPU cores available for computation tasks.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="cpu-cores"
                    min={1}
                    max={32}
                    step={1}
                    value={[cpuCores]}
                    onValueChange={(value) => setCpuCores(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={cpuCores}
                    onChange={(e) => setCpuCores(Number(e.target.value))}
                    className="w-16"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="ram" className="mr-2">
                    RAM (GB)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">Amount of RAM available in gigabytes.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="ram"
                    min={1}
                    max={128}
                    step={1}
                    value={[ramGB]}
                    onValueChange={(value) => setRamGB(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={ramGB}
                    onChange={(e) => setRamGB(Number(e.target.value))}
                    className="w-16"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="storage" className="mr-2">
                    Storage (GB)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">Amount of storage space available in gigabytes.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="storage"
                    min={100}
                    max={10000}
                    step={100}
                    value={[storageGB]}
                    onValueChange={(value) => setStorageGB(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={storageGB}
                    onChange={(e) => setStorageGB(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="bandwidth" className="mr-2">
                    Bandwidth (Mbps)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">Your internet connection speed in megabits per second.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="bandwidth"
                    min={10}
                    max={1000}
                    step={10}
                    value={[bandwidthMbps]}
                    onValueChange={(value) => setBandwidthMbps(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={bandwidthMbps}
                    onChange={(e) => setBandwidthMbps(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="uptime" className="mr-2">
                    Uptime (%)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Percentage of time your device will be online and contributing to the network.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="uptime"
                    min={50}
                    max={100}
                    step={1}
                    value={[uptimePercentage]}
                    onValueChange={(value) => setUptimePercentage(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={uptimePercentage}
                    onChange={(e) => setUptimePercentage(Number(e.target.value))}
                    className="w-16"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Estimated Rewards</CardTitle>
                <CardDescription>Based on current {network.token} price and network conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="daily" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Token Rewards:</span>
                        <span className="text-xl font-bold">
                          {rewards ? formatTokenAmount(rewards.daily.tokens) : "0.0000"} {network.token}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">USD Value:</span>
                        <span className="text-xl font-bold text-green-500">
                          {rewards ? formatCurrency(rewards.daily.usd) : "$0.00"}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="weekly" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Token Rewards:</span>
                        <span className="text-xl font-bold">
                          {rewards ? formatTokenAmount(rewards.weekly.tokens) : "0.0000"} {network.token}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">USD Value:</span>
                        <span className="text-xl font-bold text-green-500">
                          {rewards ? formatCurrency(rewards.weekly.usd) : "$0.00"}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="monthly" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Token Rewards:</span>
                        <span className="text-xl font-bold">
                          {rewards ? formatTokenAmount(rewards.monthly.tokens) : "0.0000"} {network.token}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">USD Value:</span>
                        <span className="text-xl font-bold text-green-500">
                          {rewards ? formatCurrency(rewards.monthly.usd) : "$0.00"}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-0">
                <p className="text-xs text-gray-400 mt-4">
                  Note: These estimates are based on current network conditions and token prices. Actual rewards may
                  vary based on network participation, token price fluctuations, and other factors.
                </p>
              </CardFooter>
            </Card>

            <div className="mt-6 bg-zinc-800 p-4 rounded-lg border border-zinc-700">
              <h3 className="font-medium mb-2">Resource Utilization for {network.name}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {network.name} primarily utilizes your{" "}
                {network.resourceType === "compute"
                  ? "CPU and RAM"
                  : network.resourceType === "storage"
                    ? "storage space"
                    : "internet bandwidth"}{" "}
                to contribute to the network.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Utilization:</span>
                  <span className={network.resourceType === "compute" ? "text-green-500" : "text-gray-400"}>
                    {network.resourceType === "compute"
                      ? "High"
                      : network.resourceType === "bandwidth"
                        ? "Medium"
                        : "Low"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Storage Utilization:</span>
                  <span className={network.resourceType === "storage" ? "text-green-500" : "text-gray-400"}>
                    {network.resourceType === "storage" ? "High" : "Low"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bandwidth Utilization:</span>
                  <span
                    className={
                      network.resourceType === "bandwidth"
                        ? "text-green-500"
                        : network.resourceType === "storage"
                          ? "Medium"
                          : "Low"
                    }
                  >
                    {network.resourceType === "bandwidth"
                      ? "High"
                      : network.resourceType === "storage"
                        ? "Medium"
                        : "Low"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

