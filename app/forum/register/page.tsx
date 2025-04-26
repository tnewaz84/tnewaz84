import RegisterForm from "./register-form"
import Hero from "@/app/components/hero"

export const metadata = {
  title: "Register | Tanvir Newaz Community",
  description: "Create an account to join our community",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Hero height="auto" fullScreen={false}>
        <div className="w-full max-w-md mx-auto py-12">
          <h1 className="text-3xl font-bold text-center mb-8">Join Our Community</h1>
          <RegisterForm />
        </div>
      </Hero>
    </main>
  )
}

