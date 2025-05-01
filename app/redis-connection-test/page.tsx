import { Suspense } from "react"

export default function RedisConnectionTestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Redis Connection Test</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <Suspense fallback={<div>Loading environment status...</div>}>
          <EnvironmentStatus />
        </Suspense>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Redis Connection Test</h2>
        <Suspense fallback={<div>Testing Redis connection...</div>}>
          <RedisTest />
        </Suspense>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Redis URL Format</h2>
        <p className="mb-4">
          The Redis URL should be in the format:{" "}
          <code className="bg-gray-100 p-1 rounded">https://your-redis-host.upstash.io</code>
        </p>
        <p className="mb-4">If you're using Upstash Redis, you can find the correct URL in your Upstash dashboard.</p>
      </div>
    </div>
  )
}

async function EnvironmentStatus() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/validate-env`, { cache: "no-store" })
  const data = await res.json()

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h3 className="font-semibold mb-2">Redis Configuration:</h3>
      <ul className="list-disc pl-5">
        <li>URL Configured: {data.status.redis.url ? "Yes" : "No"}</li>
        <li>Token Configured: {data.status.redis.token ? "Yes" : "No"}</li>
        <li>URL Format Valid: {data.status.redis.isUrlValid ? "Yes" : "No"}</li>
        {data.status.redis.error && <li className="text-red-500">Error: {data.status.redis.error}</li>}
      </ul>
    </div>
  )
}

async function RedisTest() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/redis-test`, { cache: "no-store" })
    const data = await res.json()

    if (data.success) {
      return (
        <div className="bg-green-100 p-4 rounded">
          <p className="text-green-700 font-semibold">✅ Redis connection successful!</p>
          <p>Ping result: {data.ping}</p>
          <p>Test value: {data.testValue}</p>
        </div>
      )
    } else {
      return (
        <div className="bg-red-100 p-4 rounded">
          <p className="text-red-700 font-semibold">❌ Redis connection failed!</p>
          <p>Error: {data.error}</p>
          <p>Message: {data.message}</p>
        </div>
      )
    }
  } catch (error) {
    return (
      <div className="bg-red-100 p-4 rounded">
        <p className="text-red-700 font-semibold">❌ Redis test failed!</p>
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    )
  }
}
