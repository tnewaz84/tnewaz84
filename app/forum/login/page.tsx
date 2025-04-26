import LoginForm from "./login-form"
import Hero from "@/app/components/hero"
import { Suspense } from "react"

export const metadata = {
  title: "Login | Tanvir Newaz Community",
  description: "Log in to your account",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Hero height="auto" fullScreen={false}>
        <div className="w-full max-w-md mx-auto py-12">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </Hero>
    </main>
  )
}

