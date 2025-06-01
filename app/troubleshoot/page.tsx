import { TroubleshootDashboard } from "./troubleshoot-dashboard"

export default function TroubleshootPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Diagnostics</h1>
          <p className="text-gray-600">Check the health of all your integrations and services</p>
        </div>
        <TroubleshootDashboard />
      </div>
    </div>
  )
}
