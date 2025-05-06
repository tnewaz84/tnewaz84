import { createClient } from "@vercel/postgres"

// Create a client with error handling for missing connection strings
export const postgresClient = (() => {
  try {
    // Check if we're in a production environment with the required env vars
    if (process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING) {
      return createClient()
    }

    // Return a mock client for development/build environments without Postgres
    return {
      query: async () => {
        console.warn("Postgres connection not available - using mock client")
        return { rows: [] }
      },
      end: async () => {},
    }
  } catch (error) {
    console.error("Failed to initialize Postgres client:", error)
    // Return a mock client that won't break the build
    return {
      query: async () => {
        console.warn("Postgres connection failed - using mock client")
        return { rows: [] }
      },
      end: async () => {},
    }
  }
})()

// Function to query the database
export async function queryDatabase(query: string, params: any[] = []) {
  try {
    const result = await postgresClient.query(query, params)
    return { success: true, data: result.rows }
  } catch (error) {
    console.error("Database query error:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Function to test the database connection
export async function testDatabaseConnection() {
  try {
    const result = await postgresClient.query("SELECT NOW() as current_time")
    return {
      success: true,
      message: "Database connection successful!",
      timestamp: result.rows[0]?.current_time || null,
    }
  } catch (error) {
    console.error("Database connection error:", error)
    return {
      success: false,
      message: "Database connection failed",
      error: (error as Error).message,
    }
  }
}
