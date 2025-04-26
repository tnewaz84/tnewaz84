"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    console.log("Attempting registration with email:", email)

    try {
      // Register the user with Supabase Auth
      const { error: signUpError } = await signUp(email, password)

      if (signUpError) {
        console.error("Registration error:", signUpError)
        setError(signUpError.message)
        setIsLoading(false)
        return
      }

      // Get the user that was just created
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.error("User not found after registration")
        setError("User registration failed. Please try again.")
        setIsLoading(false)
        return
      }

      // Create a profile for the user
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          username,
          full_name: "",
          avatar_url: "",
          website: "",
        },
      ])

      if (profileError) {
        console.error("Profile creation error:", profileError)
        setError("Failed to create user profile. Please try again.")
        setIsLoading(false)
        return
      }

      console.log("Registration successful, redirecting to login")
      // Redirect to login page with success message
      router.push("/forum/login?registered=true")
    } catch (err) {
      console.error("Unexpected registration error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Create an Account</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            <p className="text-xs text-gray-400">Password must be at least 6 characters</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-900/50 rounded-md p-3 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-white text-black hover:bg-white/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-zinc-800 pt-4">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/forum/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

