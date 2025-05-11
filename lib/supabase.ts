import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aiplkdltytaucgfpcyow.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGxrZGx0eXRhdWNnZnBjeW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzI4MzQsImV4cCI6MjA1Nzk0ODgzNH0.6Yq-134u3wc5B4Rv8lMZNilW2NHNSg_9TUatIfOXBjU"

// Log the Supabase configuration (without exposing the full key)
console.log("Initializing Supabase client with URL:", supabaseUrl)
console.log("Supabase key available:", !!supabaseKey)

// Update the Supabase client initialization:
// Create a more robust Supabase client
export const supabase = (() => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase URL or key is missing. Using fallback values.")
      // Use fallback values only if environment variables are not available
      return createClient(
        "https://aiplkdltytaucgfpcyow.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGxrZGx0eXRhdWNnZnBjeW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzI4MzQsImV4cCI6MjA1Nzk0ODgzNH0.6Yq-134u3wc5B4Rv8lMZNilW2NHNSg_9TUatIfOXBjU",
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
          },
        },
      )
    }

    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    // Return a mock client that won't break the app
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signUp: async () => ({ error: new Error("Supabase client not available") }),
        signInWithPassword: async () => ({ error: new Error("Supabase client not available") }),
        signOut: async () => {},
      },
      // Add other methods as needed
    } as unknown as ReturnType<typeof createClient>
  }
})()

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
