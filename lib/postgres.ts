import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export async function query(text: string, params: any[]) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error("Error executing query:", error)
    throw error
  }
}
