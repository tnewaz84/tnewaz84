import { Redis } from "@upstash/redis"

// Initialize Redis client with environment variables and fallback
export const redis = (() => {
  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_URL || ""
    const token = process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN || ""

    if (!url || !token) {
      console.warn("Redis URL or token is missing. Using mock Redis client.")
      return createMockRedisClient()
    }

    return new Redis({
      url,
      token,
      automaticDeserialization: true,
    })
  } catch (error) {
    console.error("Failed to initialize Redis client:", error)
    return createMockRedisClient()
  }
})()

// Create a mock Redis client for development or when Redis is unavailable
function createMockRedisClient() {
  const mockStorage = new Map<string, any>()

  return {
    get: async (key: string) => mockStorage.get(key) || null,
    set: async (key: string, value: any, options?: any) => {
      mockStorage.set(key, value)
      return "OK"
    },
    del: async (key: string) => {
      mockStorage.delete(key)
      return 1
    },
    keys: async (pattern: string) => {
      // Simple pattern matching for mock client
      const allKeys = Array.from(mockStorage.keys())
      if (pattern === "*") return allKeys

      // Very basic wildcard matching
      const regex = new RegExp(pattern.replace("*", ".*"))
      return allKeys.filter((key) => regex.test(key))
    },
    info: async () => "mock_info",
    ping: async () => "PONG",
  } as unknown as Redis
}

// Get a value from cache
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    return await redis.get(key)
  } catch (error) {
    console.error("Redis getCache error:", error)
    return null
  }
}

// Set a value in cache with optional expiration
export async function setCache(key: string, value: any, expireSeconds?: number): Promise<void> {
  try {
    if (expireSeconds) {
      await redis.set(key, value, { ex: expireSeconds })
    } else {
      await redis.set(key, value)
    }
  } catch (error) {
    console.error("Redis setCache error:", error)
  }
}

// Delete a value from cache
export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key)
  } catch (error) {
    console.error("Redis deleteCache error:", error)
  }
}

// Get all keys matching a pattern
export async function getKeys(pattern: string): Promise<string[]> {
  try {
    return await redis.keys(pattern)
  } catch (error) {
    console.error("Redis getKeys error:", error)
    return []
  }
}

// Get Redis info
export async function getRedisInfo(): Promise<any> {
  try {
    return await redis.info()
  } catch (error) {
    console.error("Redis info error:", error)
    return null
  }
}

// Check Redis connection
export async function pingRedis(): Promise<boolean> {
  try {
    const result = await redis.ping()
    return result === "PONG"
  } catch (error) {
    console.error("Redis ping error:", error)
    return false
  }
}

// Export redis as default as well
export default redis
