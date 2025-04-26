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

