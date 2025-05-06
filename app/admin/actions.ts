"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function createAdminUser(email: string, password: string) {
  const supabase = createServerComponentClient({ cookies })

  try {
    // Check if user exists
    const { data: existingUser } = await supabase.from("auth.users").select("id").eq("email", email).single()

    let userId

    if (!existingUser) {
      // Create user if doesn't exist
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      })

      if (signUpError) throw signUpError
      userId = newUser.user.id
    } else {
      userId = existingUser.id
    }

    // Set user role to admin
    const { error: roleError } = await supabase.from("user_roles").upsert({
      user_id: userId,
      role: "admin",
    })

    if (roleError) throw roleError

    return { success: true }
  } catch (error) {
    console.error("Error creating admin user:", error)
    return {
      success: false,
      error: (error as Error).message,
    }
  }
}
