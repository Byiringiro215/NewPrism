"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"

interface Message {
  id: string
  sender: {
    name: string
    avatar: string
    role: string
  }
  content: string
  timestamp: string
  isUnread: boolean
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      role: "Senior Frontend Developer Applicant"
    },
    content: "Thank you for considering my application. I'm very interested in the position and would love to discuss further.",
    timestamp: "2 hours ago",
    isUnread: true
  },
  {
    id: "2",
    sender: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
      role: "Product Manager Applicant"
    },
    content: "I have a few questions about the role requirements. Would it be possible to schedule a quick call?",
    timestamp: "5 hours ago",
    isUnread: false
  }
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMessage) return

    // In a real app, this would send the message to the API
    setNewMessage("")
  }

  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-white/70">Communicate with candidates</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Messages List */}
          <Card className="col-span-4 bg-card/50 backdrop-blur-xl border-white/10">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10"
                />
              </div>
              <div className="space-y-2">
                {messages.map(message => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full text-left p-3 rounded-lg transition-colors
                      ${message === selectedMessage ? 'bg-white/10' : 'hover:bg-white/5'}
                      ${message.isUnread ? 'bg-white/5' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white truncate">
                            {message.sender.name}
                          </p>
                          <span className="text-xs text-white/50">{message.timestamp}</span>
                        </div>
                        <p className="text-xs text-white/70 truncate">{message.content}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Content */}
          <Card className="col-span-8 bg-card/50 backdrop-blur-xl border-white/10">
            <CardContent className="p-4">
              {selectedMessage ? (
                <div className="flex flex-col h-[calc(100vh-16rem)]">
                  {/* Message Header */}
                  <div className="flex items-center gap-4 p-4 border-b border-white/10">
                    <Avatar>
                      <AvatarImage src={selectedMessage.sender.avatar} />
                      <AvatarFallback>{selectedMessage.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-medium text-white">{selectedMessage.sender.name}</h3>
                      <p className="text-xs text-white/70">{selectedMessage.sender.role}</p>
                    </div>
                  </div>

                  {/* Message Thread */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="mt-1">
                        <AvatarImage src={selectedMessage.sender.avatar} />
                        <AvatarFallback>{selectedMessage.sender.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{selectedMessage.sender.name}</span>
                          <span className="text-xs text-white/50">{selectedMessage.timestamp}</span>
                        </div>
                        <p className="text-sm text-white/90 mt-1">{selectedMessage.content}</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[calc(100vh-16rem)] flex items-center justify-center text-white/50">
                  Select a conversation to start messaging
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}