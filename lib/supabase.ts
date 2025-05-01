import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a Supabase client for client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a Supabase client with service role for server-side usage
export const getServiceSupabase = () => {
  if (!supabaseServiceKey) {
    throw new Error("Missing Supabase service role key")
  }
  return createClient(supabaseUrl, supabaseServiceKey)
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

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  })

  return client
}
