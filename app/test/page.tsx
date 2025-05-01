import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TestPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">System Test Page</h1>

      <div className="grid gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Rendering Test</h2>
          <p className="mb-4">If you can see this page, basic Next.js rendering is working correctly.</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Navigation Test</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api/debug">API Debug Info</Link>
            </Button>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Site URL: {process.env.NEXT_PUBLIC_SITE_URL || "Not set"}</p>
        </div>
      </div>
    </div>
  )
}
