import { Redis } from "@upstash/redis"

// Initialize Redis client with environment variables
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_URL || "",
  token: process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || "",
})

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
