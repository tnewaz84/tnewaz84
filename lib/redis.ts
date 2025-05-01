import { Redis } from "@upstash/redis"

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error("UPSTASH_REDIS_URL is not defined")
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.KV_REST_API_TOKEN || "",
})

// Helper function to safely get data from Redis with error handling
export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    return await redis.get(key)
  } catch (error) {
    console.error("Redis get error:", error)
    return null
  }
}

// Helper function to safely set data in Redis with error handling
export async function setInCache(key: string, value: any, expireInSeconds?: number): Promise<boolean> {
  try {
    if (expireInSeconds) {
      await redis.set(key, value, { ex: expireInSeconds })
    } else {
      await redis.set(key, value)
    }
    return true
  } catch (error) {
    console.error("Redis set error:", error)
    return false
  }
}

// Helper function to safely delete data from Redis with error handling
export async function deleteFromCache(key: string): Promise<boolean> {
  try {
    await redis.del(key)
    return true
  } catch (error) {
    console.error("Redis delete error:", error)
    return false
  }
}
