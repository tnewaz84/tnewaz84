import ForumNav from "./components/forum-nav"
import ForumHome from "./forum-home"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forum | Tanvir Newaz",
  description: "Join our community forum and chat with other members",
}

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ForumNav />
      <ForumHome />
    </div>
  )
}

