import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aiplkdltytaucgfpcyow.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGxrZGx0eXRhdWNnZnBjeW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzI4MzQsImV4cCI6MjA1Nzk0ODgzNH0.6Yq-134u3wc5B4Rv8lMZNilW2NHNSg_9TUatIfOXBjU"

// Log the Supabase configuration (without exposing the full key)
console.log("Initializing Supabase client with URL:", supabaseUrl)
console.log("Supabase key available:", !!supabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Add a constant for the admin email
export const ADMIN_EMAIL = "tnewaz84@gmail.com"

// Types for our database tables
export type Profile = {
  id: string
  username: string
  full_name: string
  avatar_url: string
  website: string
  created_at: string
  updated_at: string
}

export type ForumPost = {
  id: number
  title: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
  username?: string
  avatar_url?: string
}

export type ForumComment = {
  id: number
  post_id: number
  content: string
  user_id: string
  created_at: string
  username?: string
  avatar_url?: string
}

export type ChatMessage = {
  id: number
  content: string
  user_id: string
  created_at: string
  username?: string
  avatar_url?: string
}

const supabaseUrlOld = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrlOld || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a Supabase client for client-side usage

// Create a Supabase client with service role for server-side usage
export const getServiceSupabase = () => {
  if (!supabaseServiceKey) {
    throw new Error("Missing Supabase service role key")
  }
  return createClient(supabaseUrlOld, supabaseServiceKey)
}

// Helper function to get authenticated supabase client on the server
export const getAuthenticatedSupabase = async () => {
  const { cookies } = await import("next/headers")
  const cookieStore = cookies()

  const supabaseAccessToken = cookieStore.get("supabase-access-token")?.value
  const supabaseRefreshToken = cookieStore.get("supabase-refresh-token")?.value

  if (!supabaseAccessToken || !supabaseRefreshToken) {
    return supabase
  }

  const client = createClient(supabaseUrlOld, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  })

  return client
}
