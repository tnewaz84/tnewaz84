import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deployment Test Page",
  description: "A simple page to test if the deployment is working",
}

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Deployment Test Page</h1>

        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded-md">
            <p className="text-green-800 font-medium">✅ Next.js is working correctly</p>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Environment Information:</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Node.js Version: {process.version}</li>
              <li>Next.js Runtime: {process.env.NEXT_RUNTIME || "default"}</li>
              <li>Environment: {process.env.NODE_ENV}</li>
              <li>Timestamp: {new Date().toISOString()}</li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              If you can see this page, your basic Next.js setup is working correctly. Check the{" "}
              <a href="/api/health" className="text-blue-600 hover:underline">
                health check endpoint
              </a>{" "}
              for more detailed diagnostics.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
