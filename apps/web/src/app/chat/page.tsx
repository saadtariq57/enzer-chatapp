"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/use-media-query"

// Sample message data
interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey there! How are you doing today?",
    sender: "other",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "2",
    content: "I'm doing great! Just working on this new project.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
  },
  {
    id: "3",
    content: "That sounds interesting! What kind of project is it?",
    sender: "other",
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
  },
  {
    id: "4",
    content: "It's a chat application with a sleek dark theme. I'm really excited about how it's turning out!",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "5",
    content: "That sounds awesome! I'd love to see it when it's ready.",
    sender: "other",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-black text-[#FAFAFA]">
      {/* Header */}
      <header className="px-4 py-3 bg-[#353839] border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <img
                src="/images/logo.png"
                alt="Enzer Logo"
                className="h-6 w-auto"
                style={{ maxWidth: "100%", objectFit: "contain" }}
              />
            </div>
            <h1 className="text-xl font-bold">Enzer</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FAFAFA] rounded-full"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] ${isMobile ? "max-w-[90%]" : ""} rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-[#FAFAFA] text-black rounded-tr-none"
                  : "bg-[#353839] text-[#FAFAFA] rounded-tl-none"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs ${message.sender === "user" ? "opacity-70 text-black" : "opacity-70"} mt-1 text-right`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#353839] border-t border-gray-700">
        <form
          className="flex items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
        >
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-black border-gray-700 focus:ring-[#FAFAFA] focus:border-[#FAFAFA]"
          />
          <Button
            type="submit"
            className="bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black"
            size={isMobile ? "icon" : "default"}
          >
            {isMobile ? (
              <Send size={18} />
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Send
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
