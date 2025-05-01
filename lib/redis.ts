// This file is a wrapper around the Redis client that avoids initialization during build
// It exports the same interface as the real Redis client, but defers initialization until runtime

// Export the safe Redis client and helper functions
export {
  safeRedis as redis,
  getCache,
  setCache,
  deleteCache,
  getFromCache,
  setInCache,
  deleteFromCache,
} from "./redis-safe"

// Export additional functions that might be used elsewhere
export async function setCacheWithHash(hash: string, key: string, value: any): Promise<number> {
  const { safeRedis } = await import("./redis-safe")
  const valueToStore = typeof value === "string" ? value : JSON.stringify(value)
  return safeRedis.hset(hash, { [key]: valueToStore })
}

export async function getCacheFromHash<T>(hash: string, key: string): Promise<T | null> {
  const { safeRedis } = await import("./redis-safe")
  const data = await safeRedis.hget(hash, key)
  if (!data) return null

  try {
    return typeof data === "string" ? (JSON.parse(data) as T) : (data as T)
  } catch (error) {
    console.error(`Error parsing Redis hash data for ${hash}:${key}:`, error)
    return null
  }
}
