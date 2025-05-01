import { Pool } from "pg"

// Create a connection pool
let pool: Pool | null = null

export function getPool() {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL || process.env.DIRECT_POSTGRES_URL

    if (!connectionString) {
      throw new Error("Database connection string is not defined")
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  }

  return pool
}

// Helper function to execute queries with error handling
export async function query(text: string, params?: any[]) {
  const pool = getPool()

  try {
    const start = Date.now()
    const result = await pool.query(text, params)
    const duration = Date.now() - start

    console.log("Executed query", { text, duration, rows: result.rowCount })

    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Helper function to safely close the pool
export async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
}
