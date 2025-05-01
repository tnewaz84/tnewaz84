import { createClient } from "@vercel/postgres"

// Create a client that handles missing environment variables
export function getPostgresClient() {
  // Check if we have the required environment variables
  const connectionString =
    process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DIRECT_POSTGRES_URL

  if (!connectionString) {
    throw new Error("Database connection string is not defined")
  }

  // Create the client with the connection string
  return createClient({ connectionString })
}

// Lazy-loaded client to avoid initialization errors
let postgresClient: ReturnType<typeof createClient> | null = null

export function getClient() {
  if (!postgresClient) {
    try {
      postgresClient = getPostgresClient()
    } catch (error) {
      console.error("Failed to initialize Postgres client:", error)
      throw error
    }
  }
  return postgresClient
}

// Function to query the database
export async function queryDatabase(query: string, params: any[] = []) {
  try {
    const client = getClient()
    const result = await client.query(query, params)
    return { success: true, data: result.rows }
  } catch (error) {
    console.error("Database query error:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Function to test the database connection
export async function testDatabaseConnection() {
  try {
    const client = getClient()
    const result = await client.query("SELECT NOW() as current_time")
    return {
      success: true,
      message: "Database connection successful!",
      timestamp: result.rows[0].current_time,
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

// Helper functions for common database operations
export async function query(text: string, params?: any[]) {
  try {
    const client = getClient()
    const start = Date.now()
    const result = await client.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
