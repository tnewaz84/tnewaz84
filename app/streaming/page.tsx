import type { Metadata } from "next"
import StreamingPageClient from "./streaming-page-client"

export const metadata: Metadata = {
  title: "Live Streaming Platform | Tanvir Newaz",
  description: "Create and manage live streaming channels with our multi-channel streaming platform",
}

export default function StreamingPage() {
  return <StreamingPageClient />
}

