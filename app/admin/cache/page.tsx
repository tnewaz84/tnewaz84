import type { Metadata } from "next"
import CacheManager from "./cache-manager"

export const metadata: Metadata = {
  title: "Cache Management | Admin",
  description: "Manage Redis cache for the application",
}

export default function CacheManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Cache Management</h1>
      <CacheManager />
    </div>
  )
}
