"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { Sparkles } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  isClient: boolean;
  selectedContact: { name: string; avatar: string } | null;
  onCopyMessage: (message: Message) => void;
  onReplyToMessage: (message: Message) => void;
  onForwardMessage: (message: Message) => void;
  onDeleteMessage: (message: Message) => void;
  onEditMessage: (message: Message) => void;
}

export function MessageList({
  messages,
  isClient,
  selectedContact,
  onCopyMessage,
  onReplyToMessage,
  onForwardMessage,
  onDeleteMessage,
  onEditMessage
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div 
      ref={messagesContainerRef} 
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0A0A0A] to-[#151515]"
    >
      <div className="flex flex-col space-y-6">
        {/* Date separator */}
        <div className="flex justify-center">
          <div className="bg-[#353839]/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-[#FAFAFA]/70 shadow-sm">
            Today
          </div>
        </div>

        {/* Render messages */}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isClient={isClient}
            onCopy={onCopyMessage}
            onReply={onReplyToMessage}
            onForward={onForwardMessage}
            onDelete={onDeleteMessage}
            onEdit={onEditMessage}
            selectedContact={selectedContact}
          />
        ))}

        {/* AI Suggestions */}
        {messages.length > 0 && messages[messages.length - 1].isAI && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-start ml-10"
          >
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-[70%]">
              {["Yes, please!", "No thanks", "What kind of replies?"].map((suggestion, index) => (
                <button
                  key={index}
                  className="bg-[#353839]/50 hover:bg-[#353839] px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
} 