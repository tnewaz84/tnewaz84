"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase, type ForumPost, type ForumComment } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, ArrowLeft, Loader2, MessageSquare, Send } from "lucide-react"

export default function PostDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<ForumPost | null>(null)
  const [comments, setComments] = useState<ForumComment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch post with user information
        const { data: postData, error: postError } = await supabase
          .from("forum_posts")
          .select(`
            *,
            profiles:user_id (username, avatar_url)
          `)
          .eq("id", postId)
          .single()

        if (postError) {
          console.error("Error fetching post:", postError)
          if (postError.code === "PGRST116") {
            // Post not found
            router.push("/forum")
          }
          return
        }

        // Transform the post data
        const transformedPost = {
          ...postData,
          username: postData.profiles?.username,
          avatar_url: postData.profiles?.avatar_url,
        }

        setPost(transformedPost)

        // Fetch comments with user information
        const { data: commentsData, error: commentsError } = await supabase
          .from("forum_comments")
          .select(`
            *,
            profiles:user_id (username, avatar_url)
          `)
          .eq("post_id", postId)
          .order("created_at", { ascending: true })

        if (commentsError) {
          console.error("Error fetching comments:", commentsError)
          return
        }

        // Transform the comments data
        const transformedComments = commentsData.map((comment) => ({
          ...comment,
          username: comment.profiles?.username,
          avatar_url: comment.profiles?.avatar_url,
        }))

        setComments(transformedComments)
      } catch (error) {
        console.error("Error fetching post and comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPostAndComments()

    // Subscribe to new comments
    const subscription = supabase
      .channel(`post_${postId}_comments`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "forum_comments", filter: `post_id=eq.${postId}` },
        (payload) => {
          // Fetch the user information for the new comment
          const fetchUserInfo = async () => {
            const { data, error } = await supabase
              .from("profiles")
              .select("username, avatar_url")
              .eq("id", payload.new.user_id)
              .single()

            if (error) {
              console.error("Error fetching user info:", error)
              return
            }

            const newComment = {
              ...payload.new,
              username: data.username,
              avatar_url: data.avatar_url,
            } as ForumComment

            setComments((prevComments) => [...prevComments, newComment])
          }

          fetchUserInfo()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [postId, router])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in to comment")
      return
    }

    if (!newComment.trim()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from("forum_comments").insert([
        {
          post_id: Number(postId),
          content: newComment,
          user_id: user.id,
          created_at: new Date().toISOString(),
        },
      ])

      if (insertError) {
        setError(insertError.message)
        setIsSubmitting(false)
        return
      }

      // Clear the comment input
      setNewComment("")
    } catch (err) {
      console.error("Error creating comment:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-white/70" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Post not found</h2>
        <Button asChild variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
          <Link href="/forum">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
        <Link href="/forum">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forum
        </Link>
      </Button>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">{post.title}</CardTitle>
          <div className="flex items-center mt-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={post.avatar_url || "/placeholder.svg"} alt={post.username || ""} />
              <AvatarFallback>{getInitials(post.username || "User")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.username || "Anonymous"}</p>
              <p className="text-xs text-gray-400">{formatDate(post.created_at)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-6 text-center">
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-zinc-900 border-zinc-800">
                <CardContent className="py-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar_url || "/placeholder.svg"} alt={comment.username || ""} />
                      <AvatarFallback>{getInitials(comment.username || "User")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{comment.username || "Anonymous"}</p>
                        <p className="text-xs text-gray-400">{formatDate(comment.created_at)}</p>
                      </div>
                      <p className="mt-2 text-gray-300 whitespace-pre-line">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {user ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="min-h-[100px] bg-zinc-800 border-zinc-700 text-white"
                />

                {error && (
                  <div className="bg-red-900/20 border border-red-900/50 rounded-md p-3 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-white text-black hover:bg-white/90"
                    disabled={isSubmitting || !newComment.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Post Comment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-6 text-center">
              <p className="text-gray-400 mb-4">You need to be logged in to comment</p>
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/forum/login">Log in to Comment</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
