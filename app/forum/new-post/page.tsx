import NewPostForm from "./new-post-form"
import ForumNav from "../components/forum-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Post | Forum",
  description: "Create a new discussion post",
}

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ForumNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Create New Post</h1>
        <NewPostForm />
      </div>
    </div>
  )
}

