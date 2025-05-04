'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, Smile } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "TechCorp HR",
    avatar: "/avatars/hr.png",
    lastMessage: "We'd like to schedule a follow-up interview",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    name: "InnovateTech Recruiter",
    avatar: "/avatars/recruiter.png",
    lastMessage: "Your application has been reviewed",
    time: "1d ago",
    unread: false,
  },
  {
    id: 3,
    name: "Interview Coach",
    avatar: "/avatars/coach.png",
    lastMessage: "Practice session feedback available",
    time: "2d ago",
    unread: true,
  },
]

const messages = [
  {
    id: 1,
    sender: "TechCorp HR",
    avatar: "/avatars/hr.png",
    content: "Hello! We've reviewed your application and would like to schedule a technical interview.",
    time: "10:30 AM",
    isUser: false,
  },
  {
    id: 2,
    sender: "You",
    avatar: "/avatars/user.png",
    content: "Thank you for the opportunity! I'm available next week Monday through Wednesday.",
    time: "10:35 AM",
    isUser: true,
  },
  {
    id: 3,
    sender: "TechCorp HR",
    avatar: "/avatars/hr.png",
    content: "Great! How about Monday at 2 PM? We'll be conducting a 60-minute technical interview focusing on React and TypeScript.",
    time: "10:40 AM",
    isUser: false,
  },
]

export default function Messages() {
  return (
    <Card className="card-gradient border-0 text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Messages</CardTitle>
            <CardDescription className="text-white/70">Communicate with recruiters and interviewers</CardDescription>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            New Message
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{conversation.name}</p>
                        <span className="text-xs text-white/50">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-white/70 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 p-4 border-b border-white/10">
              <Avatar>
                <AvatarImage src="/avatars/hr.png" />
                <AvatarFallback>TH</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">TechCorp HR</h4>
                <p className="text-sm text-white/70">Active now</p>
              </div>
            </div>
            <ScrollArea className="h-[500px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!message.isUser && (
                      <Avatar>
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[70%] ${message.isUser ? "text-right" : "text-left"}`}>
                      <div className={`p-3 rounded-lg ${message.isUser ? "bg-purple-500" : "bg-white/5"}`}>
                        <p>{message.content}</p>
                      </div>
                      <p className="text-xs text-white/50 mt-1">{message.time}</p>
                    </div>
                    {message.isUser && (
                      <Avatar>
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>Y</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                  <Smile className="w-5 h-5" />
                </Button>
                <Button size="icon" className="bg-purple-500 hover:bg-purple-600">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 