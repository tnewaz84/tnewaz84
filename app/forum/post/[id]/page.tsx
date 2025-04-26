import PostDetail from "./post-detail"
import ForumNav from "../../components/forum-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Post | Forum",
  description: "View and discuss forum post",
}

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <ForumNav />
      <div className="container mx-auto px-4 py-8">
        <PostDetail postId={params.id} />
      </div>
    </div>
  )
}

