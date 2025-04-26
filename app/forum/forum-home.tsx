"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { supabase, type ForumPost } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, MessageSquare, Plus } from "lucide-react"

export default function ForumHome() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // First, fetch all posts
        const { data: postsData, error: postsError } = await supabase
          .from("forum_posts")
          .select("*")
          .order("created_at", { ascending: false })

        if (postsError) {
          console.error("Error fetching posts:", postsError)
          return
        }

        // If we have posts, fetch the profile information for each post's user_id
        if (postsData && postsData.length > 0) {
          const transformedPosts = [...postsData]

          // For each post, fetch the user profile information
          for (let i = 0; i < transformedPosts.length; i++) {
            const post = transformedPosts[i]
            const { data: profileData, error: profileError } = await supabase
              .from("profiles")
              .select("username, avatar_url")
              .eq("id", post.user_id)
              .single()

            if (!profileError && profileData) {
              transformedPosts[i] = {
                ...post,
                username: profileData.username,
                avatar_url: profileData.avatar_url,
              }
            }
          }

          setPosts(transformedPosts)
        } else {
          setPosts([])
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()

    // Subscribe to new posts
    const subscription = supabase
      .channel("forum_posts")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "forum_posts" }, (payload) => {
        // Fetch the user information for the new post
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

          const newPost = {
            ...payload.new,
            username: data.username,
            avatar_url: data.avatar_url,
          } as ForumPost

          setPosts((prevPosts) => [newPost, ...prevPosts])
        }

        fetchUserInfo()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

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
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Forum Discussions</h1>
        {user && (
          <Button asChild className="bg-white text-black hover:bg-white/90">
            <Link href="/forum/new-post">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" />
        </div>
      ) : posts.length === 0 ? (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">No discussions yet</h3>
            <p className="text-gray-400 mb-6 text-center">Be the first to start a discussion in our community forum.</p>
            {user ? (
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/forum/new-post">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/forum/login">Log in to Post</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <Link href={`/forum/post/${post.id}`}>
                  <CardTitle className="text-white hover:text-blue-400 transition-colors">{post.title}</CardTitle>
                </Link>
                <CardDescription className="flex items-center mt-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={post.avatar_url || "/placeholder.svg"} alt={post.username || ""} />
                    <AvatarFallback>{getInitials(post.username || "User")}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-400">
                    Posted by {post.username || "Anonymous"} on {formatDate(post.created_at)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 line-clamp-3">{post.content}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
                  <Link href={`/forum/post/${post.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Discussion
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

