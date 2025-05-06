import type { Metadata } from "next"
import AdminSetupForm from "./admin-setup-form"

export const metadata: Metadata = {
  title: "Admin Setup",
  description: "Set up the first admin user",
}

export default function AdminSetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Setup</h1>
        <p className="text-gray-600 mb-6 text-center">Create the first admin user for your site.</p>
        <AdminSetupForm />
      </div>
    </div>
  )
}
