import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
  title: "Unauthorized",
  description: "You do not have permission to access this page",
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access the admin area. Please contact the site administrator if you believe this
          is an error.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Admin</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
