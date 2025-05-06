import { createClient } from "@vercel/postgres"

// Create a client that doesn't require native compilation
export const postgresClient = createClient()

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
