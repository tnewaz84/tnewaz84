import type { Metadata } from "next"
import StreamViewerClient from "./stream-viewer-client"

export const metadata: Metadata = {
  title: "Live Stream Viewer | Tanvir Newaz",
  description: "Watch our live stream broadcasts and events",
}

export default function StreamViewerPage() {
  return <StreamViewerClient />
}

