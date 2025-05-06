import type { Metadata } from "next"
import AdminLoginForm from "./admin-login-form"

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login to the admin dashboard",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <AdminLoginForm />
      </div>
    </div>
  )
}
