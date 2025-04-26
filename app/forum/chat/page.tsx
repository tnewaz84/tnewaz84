import ChatRoom from "./chat-room"
import ForumNav from "../components/forum-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat | Forum",
  description: "Chat with other community members in real-time",
}

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ForumNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Community Chat</h1>
        <ChatRoom />
      </div>
    </div>
  )
}

