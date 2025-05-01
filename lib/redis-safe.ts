// A safe version of Redis client that won't crash if Redis is not configured

class SafeRedisClient {
  private isConfigured: boolean
  private redisUrl: string
  private redisToken: string

  constructor() {
    // Check if Redis is properly configured
    this.redisUrl = process.env.UPSTASH_REDIS_URL || ""
    this.redisToken = process.env.KV_REST_API_TOKEN || ""

    // Validate URL format
    this.isConfigured = !!(this.redisUrl && this.redisToken && this.redisUrl.startsWith("https://"))

    if (!this.isConfigured) {
      console.warn("Redis is not properly configured. Using fallback implementation.")
      if (this.redisUrl && !this.redisUrl.startsWith("https://")) {
        console.error(`Invalid Redis URL format: ${this.redisUrl.substring(0, 10)}... (URL should start with https://)`)
      }
    }
  }

  // Implement basic Redis methods with fallbacks
  async get(key: string): Promise<any> {
    if (!this.isConfigured) {
      console.log(`[REDIS FALLBACK] GET ${key}`)
      return null
    }

    try {
      // Only import the real Redis client if we have a valid configuration
      const { Redis } = await import("@upstash/redis")
      const redis = new Redis({
        url: this.redisUrl,
        token: this.redisToken,
      })
      return redis.get(key)
    } catch (error) {
      console.error("Redis get error:", error)
      return null
    }
  }

  async set(key: string, value: any, options?: any): Promise<any> {
    if (!this.isConfigured) {
      console.log(`[REDIS FALLBACK] SET ${key}`)
      return "OK"
    }

    try {
      const { Redis } = await import("@upstash/redis")
      const redis = new Redis({
        url: this.redisUrl,
        token: this.redisToken,
      })
      return redis.set(key, value, options)
    } catch (error) {
      console.error("Redis set error:", error)
      return null
    }
  }

  async del(key: string): Promise<any> {
    if (!this.isConfigured) {
      console.log(`[REDIS FALLBACK] DEL ${key}`)
      return 1
    }

    try {
      const { Redis } = await import("@upstash/redis")
      const redis = new Redis({
        url: this.redisUrl,
        token: this.redisToken,
      })
      return redis.del(key)
    } catch (error) {
      console.error("Redis del error:", error)
      return 0
    }
  }

  async hset(hash: string, values: Record<string, any>): Promise<any> {
    if (!this.isConfigured) {
      console.log(`[REDIS FALLBACK] HSET ${hash}`)
      return 1
    }

    try {
      const { Redis } = await import("@upstash/redis")
      const redis = new Redis({
        url: this.redisUrl,
        token: this.redisToken,
      })
      return redis.hset(hash, values)
    } catch (error) {
      console.error("Redis hset error:", error)
      return 0
    }
  }

  async hget(hash: string, key: string): Promise<any> {
    if (!this.isConfigured) {
      console.log(`[REDIS FALLBACK] HGET ${hash} ${key}`)
      return null
    }

    try {
      const { Redis } = await import("@upstash/redis")
      const redis = new Redis({
        url: this.redisUrl,
        token: this.redisToken,
      })
      return redis.hget(hash, key)
    } catch (error) {
      console.error("Redis hget error:", error)
      return null
    }
  }

  async ping(): Promise<string> {
    if (!this.isConfigured) {
      console.log(`[REDIS FALLBACK] PING`)
      return "PONG"
    }

    try {
      const { Redis } = await import("@upstash/redis")
      const redis = new Redis({
        url: this.redisUrl,
        token: this.redisToken,
      })
      return redis.ping()
    } catch (error) {
      console.error("Redis ping error:", error)
      return "ERROR"
    }
  }
}

// Export a singleton instance
export const safeRedis = new SafeRedisClient()

// Export compatible helper functions
export async function getCache<T>(key: string): Promise<T | null> {
  const data = await safeRedis.get(key)
  if (!data) return null

  try {
    return typeof data === "string" ? (JSON.parse(data) as T) : (data as T)
  } catch (error) {
    console.error(`Error parsing Redis data for key ${key}:`, error)
    return null
  }
}

export async function setCache(key: string, value: any, expireSeconds?: number): Promise<string> {
  const options = expireSeconds ? { ex: expireSeconds } : undefined
  const valueToStore = typeof value === "string" ? value : JSON.stringify(value)
  return safeRedis.set(key, valueToStore, options)
}

export async function deleteCache(key: string): Promise<number> {
  return safeRedis.del(key)
}

// Alias functions for backward compatibility
export const getFromCache = getCache
export const setInCache = setCache
export const deleteFromCache = deleteCache
