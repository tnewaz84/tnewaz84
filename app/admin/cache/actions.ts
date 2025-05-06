"use server"

import { redis } from "@/lib/redis"
import { revalidatePath } from "next/cache"

// Get all cache keys with a specific pattern
export async function getCacheKeys(pattern = "*") {
  try {
    const keys = await redis.keys(pattern)
    return { success: true, keys }
  } catch (error) {
    console.error("Error getting cache keys:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Get cache value for a specific key
export async function getCacheValue(key: string) {
  try {
    const value = await redis.get(key)
    return { success: true, value }
  } catch (error) {
    console.error(`Error getting cache value for key ${key}:`, error)
    return { success: false, error: (error as Error).message }
  }
}

// Delete a specific cache key
export async function deleteCacheKey(key: string) {
  try {
    await redis.del(key)
    revalidatePath("/admin/cache")
    return { success: true }
  } catch (error) {
    console.error(`Error deleting cache key ${key}:`, error)
    return { success: false, error: (error as Error).message }
  }
}

// Clear all cache keys with a specific pattern
export async function clearCachePattern(pattern: string) {
  try {
    const keys = await redis.keys(pattern)

    if (keys.length === 0) {
      return { success: true, message: "No keys found matching the pattern" }
    }

    // Delete each key
    for (const key of keys) {
      await redis.del(key)
    }

    revalidatePath("/admin/cache")
    return { success: true, message: `Cleared ${keys.length} cache entries` }
  } catch (error) {
    console.error(`Error clearing cache pattern ${pattern}:`, error)
    return { success: false, error: (error as Error).message }
  }
}
