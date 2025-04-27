import RedisExample from "../components/redis-example"

export const metadata = {
  title: "Redis Test | Tanvir Newaz",
  description: "Test Redis caching functionality",
}

export default function RedisTestPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Redis Test</h1>
      <RedisExample />
    </div>
  )
}
