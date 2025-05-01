import { Redis } from "@upstash/redis"

// Create Redis client using environment variables
const redisUrl = process.env.UPSTASH_REDIS_URL || ""
const redisToken = process.env.KV_REST_API_TOKEN || ""

// Validate Redis URL format
if (redisUrl && !redisUrl.startsWith("https://")) {
  console.warn("Invalid Redis URL format. URL should start with https://")
}

export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
})

// Helper functions for common Redis operations
export async function setCache(key: string, value: any, expireSeconds?: number): Promise<string> {
  if (expireSeconds) {
    return redis.set(key, JSON.stringify(value), { ex: expireSeconds })
  }
  return redis.set(key, JSON.stringify(value))
}

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redis.get<string>(key)
  if (!data) return null
  try {
    return JSON.parse(data) as T
  } catch (error) {
    console.error(`Error parsing Redis data for key ${key}:`, error)
    return null
  }
}

export async function deleteCache(key: string): Promise<number> {
  return redis.del(key)
}

export async function setCacheWithHash(hash: string, key: string, value: any): Promise<number> {
  return redis.hset(hash, { [key]: JSON.stringify(value) })
}

export async function getCacheFromHash<T>(hash: string, key: string): Promise<T | null> {
  const data = await redis.hget<string>(hash, key)
  if (!data) return null
  try {
    return JSON.parse(data) as T
  } catch (error) {
    console.error(`Error parsing Redis hash data for ${hash}:${key}:`, error)
    return null
  }
}

// Alias functions for backward compatibility
export const getFromCache = getCache
export const setInCache = setCache
export const deleteFromCache = deleteCache
