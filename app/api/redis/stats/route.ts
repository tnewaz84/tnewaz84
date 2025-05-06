import { NextResponse } from "next/server"
import { redis, getRedisInfo } from "@/lib/redis"

export async function GET() {
  try {
    // Get Redis info
    const info = await redis.info()

    // Parse Redis info
    const parsedInfo: Record<string, any> = {}

    if (typeof info === "string") {
      const sections = info.split("#")

      for (const section of sections) {
        const lines = section.split("\r\n").filter(Boolean)

        for (const line of lines) {
          if (line.includes(":")) {
            const [key, value] = line.split(":")
            if (key && value) {
              // Try to convert to number if possible
              parsedInfo[key.trim()] = isNaN(Number(value)) ? value : Number(value)
            }
          }
        }
      }
    }

    // Get key patterns and counts
    const allKeys = await getRedisInfo("*")
    const keyPatterns: Record<string, number> = {}

    for (const key of allKeys) {
      // Extract pattern (everything before the first colon)
      const pattern = key.split(":")[0] || "other"
      keyPatterns[pattern] = (keyPatterns[pattern] || 0) + 1
    }

    // Format key patterns for display
    const formattedKeyPatterns = Object.entries(keyPatterns).map(([pattern, count]) => ({
      pattern,
      count,
    }))

    // Calculate memory usage percentage if maxmemory is set
    let memoryPercent = 0
    if (parsedInfo.maxmemory && parsedInfo.used_memory) {
      memoryPercent = (parsedInfo.used_memory / parsedInfo.maxmemory) * 100
    }

    // Calculate uptime in days and hours
    const uptimeSeconds = parsedInfo.uptime_in_seconds || 0
    const uptimeDays = Math.floor(uptimeSeconds / 86400)
    const uptimeHours = Math.floor((uptimeSeconds % 86400) / 3600)

    return NextResponse.json({
      // Server info
      redis_version: parsedInfo.redis_version,
      uptime_seconds: uptimeSeconds,
      uptime_days: uptimeDays,
      uptime_hours: uptimeHours,

      // Memory info
      used_memory: parsedInfo.used_memory,
      used_memory_human: parsedInfo.used_memory_human,
      used_memory_peak: parsedInfo.used_memory_peak,
      used_memory_peak_human: parsedInfo.used_memory_peak_human,
      maxmemory: parsedInfo.maxmemory,
      maxmemory_human: parsedInfo.maxmemory_human,
      memory_percent: memoryPercent,

      // Client info
      connected_clients: parsedInfo.connected_clients,

      // Stats
      total_commands_processed: parsedInfo.total_commands_processed,
      instantaneous_ops_per_sec: parsedInfo.instantaneous_ops_per_sec,

      // Keys
      total_keys: allKeys.length,
      expires: parsedInfo.expires,
      expired_keys: parsedInfo.expired_keys,
      key_patterns: formattedKeyPatterns,

      // Timestamp
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error getting Redis stats:", error)

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
