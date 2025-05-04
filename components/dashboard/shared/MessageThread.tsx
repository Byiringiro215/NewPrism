"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Image, Paperclip, Smile } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  attachments?: { url: string; type: string }[];
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

interface MessageThreadProps {
  messages: Message[];
  currentUser: User;
  recipient: User;
  onSendMessage: (content: string) => void;
}

export default function MessageThread({
  messages,
  currentUser,
  recipient,
  onSendMessage,
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-white/10">
        <Avatar>
          <AvatarImage src={recipient.avatar} />
          <AvatarFallback>{recipient.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium text-white">{recipient.name}</h3>
          {recipient.role && (
            <p className="text-xs text-white/70">{recipient.role}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  isCurrentUser ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="mt-1">
                  <AvatarImage
                    src={
                      isCurrentUser ? currentUser.avatar : recipient.avatar
                    }
                  />
                  <AvatarFallback>
                    {isCurrentUser
                      ? currentUser.name[0]
                      : recipient.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex flex-col ${
                    isCurrentUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.attachments?.map((attachment, index) => (
                      <div
                        key={index}
                        className="mt-2 rounded border border-white/10 p-2"
                      >
                        {/* Handle different attachment types here */}
                        <p className="text-xs text-white/70">
                          {attachment.type} attachment
                        </p>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-white/50 mt-1">
                    {format(new Date(message.timestamp), "p")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-end gap-2">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[2.5rem]"
              multiline
            />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white/70">
                <Image className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/70">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/70">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} className="h-10">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}