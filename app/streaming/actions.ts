"use server"

// The API key is stored server-side and not exposed to the client
const API_TOKEN = process.env.LIVEPEER_API_KEY || ""
const API_URL = "https://livepeer.studio/api/stream"

export type StreamChannel = {
  id: string
  name: string
  ingest?: {
    url: string
  }
  streamKey: string
  playbackId: string
  createdAt: string
  status: string
}

export async function createStreamingChannel() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `Channel-${Date.now()}`,
        profiles: [
          {
            name: "720p",
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating streaming channel:", error)
    throw error
  }
}

export async function getStreamingChannels(): Promise<StreamChannel[]> {
  try {
    // If API key is not set, return an empty array to avoid errors
    if (!API_TOKEN) {
      console.warn("LIVEPEER_API_KEY is not set")
      return []
    }

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching streaming channels:", error)
    // Return empty array instead of throwing to prevent UI errors
    return []
  }
}
