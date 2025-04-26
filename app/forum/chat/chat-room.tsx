"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { supabase, type ChatMessage } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Loader2, Send, Users } from "lucide-react"

export default function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<number>(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch messages with user information
        const { data, error } = await supabase
          .from("chat_messages")
          .select(`
            *,
            profiles:user_id (username, avatar_url)
          `)
          .order("created_at", { ascending: false })
          .limit(50)

        if (error) {
          console.error("Error fetching messages:", error)
          return
        }

        // Transform the data to include username and avatar_url directly in the message
        const transformedMessages = data
          .map((message) => ({
            ...message,
            username: message.profiles?.username,
            avatar_url: message.profiles?.avatar_url,
          }))
          .reverse()

        setMessages(transformedMessages)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()

    // Subscribe to new messages
    const subscription = supabase
      .channel("chat_messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        // Fetch the user information for the new message
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

          const newMessage = {
            ...payload.new,
            username: data.username,
            avatar_url: data.avatar_url,
          } as ChatMessage

          setMessages((prevMessages) => [...prevMessages, newMessage])
        }

        fetchUserInfo()
      })
      .subscribe()

    // Simulate online users count
    setOnlineUsers(Math.floor(Math.random() * 10) + 5)

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in to chat")
      return
    }

    if (!newMessage.trim()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from("chat_messages").insert([
        {
          content: newMessage,
          user_id: user.id,
          created_at: new Date().toISOString(),
        },
      ])

      if (insertError) {
        setError(insertError.message)
        setIsSubmitting(false)
        return
      }

      // Clear the message input
      setNewMessage("")
    } catch (err) {
      console.error("Error sending message:", err)
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Live Chat</CardTitle>
          <div className="flex items-center text-sm text-green-400">
            <Users className="h-4 w-4 mr-1" />
            {onlineUsers} online
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[500px] overflow-y-auto p-4 space-y-4 border-b border-zinc-800">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-white/70" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-400 mb-4">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.avatar_url || "/placeholder.svg"} alt={message.username || ""} />
                    <AvatarFallback>{getInitials(message.username || "User")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{message.username || "Anonymous"}</p>
                      <span className="text-xs text-gray-400 ml-2">{formatTime(message.created_at)}</span>
                    </div>
                    <p className="text-gray-300">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        {user ? (
          <form onSubmit={handleSubmitMessage} className="p-4 flex items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            <Button
              type="submit"
              className="bg-white text-black hover:bg-white/90"
              disabled={isSubmitting || !newMessage.trim()}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-400 mb-4">You need to be logged in to chat</p>
            <Button asChild className="bg-white text-black hover:bg-white/90">
              <Link href="/forum/login">Log in to Chat</Link>
            </Button>
          </div>
        )}
      </CardContent>
      {error && (
        <CardFooter className="pt-0">
          <div className="bg-red-900/20 border border-red-900/50 rounded-md p-3 flex items-start w-full">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
