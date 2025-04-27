"use server"

import { getCache, setCache } from "@/lib/redis"

// Example function to get data with Redis caching
export async function getDataWithCache<T>(
  key: string,
  fetchFunction: () => Promise<T>,
  expireSeconds = 3600,
): Promise<T> {
  try {
    // Try to get data from cache first
    const cachedData = await getCache<T>(key)

    if (cachedData) {
      console.log(`Cache hit for key: ${key}`)
      return cachedData
    }

    // If not in cache, fetch the data
    console.log(`Cache miss for key: ${key}, fetching data...`)
    const freshData = await fetchFunction()

    // Store in cache for future requests
    await setCache(key, freshData, expireSeconds)

    return freshData
  } catch (error) {
    console.error(`Error in getDataWithCache for key ${key}:`, error)
    // If cache fails, still try to get the data directly
    return fetchFunction()
  }
}

// Example function to invalidate cache
export async function invalidateCache(key: string) {
  try {
    await setCache(key, null, 1) // Set to null with 1 second expiry
    return { success: true }
  } catch (error) {
    console.error(`Error invalidating cache for key ${key}:`, error)
    return { success: false, error: (error as Error).message }
  }
}
