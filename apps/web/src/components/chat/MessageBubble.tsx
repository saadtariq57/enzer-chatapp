"use client";

import { Message } from "@/types/chat";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatTime } from "@/utils/formatters";
import { 
  MoreVertical, 
  Copy, 
  Reply, 
  Forward, 
  Edit, 
  Trash2,
  Sparkles,
  CheckCheck 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface MessageBubbleProps {
  message: Message;
  isClient: boolean;
  onCopy: (message: Message) => void;
  onReply: (message: Message) => void;
  onForward: (message: Message) => void;
  onDelete: (message: Message) => void;
  onEdit: (message: Message) => void;
  selectedContact?: { name: string; avatar: string } | null;
}

export function MessageBubble({
  message,
  isClient,
  onCopy,
  onReply, 
  onForward,
  onDelete,
  onEdit,
  selectedContact
}: MessageBubbleProps) {
  // Determine message status icon
  const renderStatusIcon = () => {
    if (message.sender !== "user" || !message.status) return null;
    
    if (message.status === "sent") {
      return (
        <svg 
          viewBox="0 0 12 12" 
          className="w-3.5 h-3.5 text-current opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6l2 2 4-4" />
        </svg>
      );
    }
    
    if (message.status === "delivered") {
      return (
        <svg 
          viewBox="0 0 16 12" 
          className="w-4 h-3.5 text-current opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1.5 6l2 2 4-4 M9.5 6l2 2 4-4" />
        </svg>
      );
    }
    
    if (message.status === "read") {
      return (
        <svg 
          viewBox="0 0 16 12" 
          className="w-4 h-3.5 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1.5 6l2 2 4-4 M9.5 6l2 2 4-4" />
        </svg>
      );
    }
    
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} group relative`}
    >
      {message.sender === "contact" && !message.isAI && selectedContact && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1 border border-[#353839] shadow-md">
          <img
            src={selectedContact.avatar}
            alt={selectedContact.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="max-w-[70%] relative group">
        <div
          className={`rounded-2xl px-4 py-2.5 relative shadow-md ${
            message.isAI
              ? "bg-[#353839]/30 border border-[#FAFAFA]/10 text-[#FAFAFA] ml-10 backdrop-blur-sm"
              : message.sender === "user"
              ? "bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] text-black rounded-tr-none"
              : "bg-gradient-to-br from-[#353839] to-[#252525] text-[#FAFAFA] rounded-tl-none backdrop-blur-sm"
          }`}
        >
          {message.isAI && (
            <div className="flex items-center mb-1 text-xs text-[#FAFAFA]/70">
              <Sparkles size={12} className="mr-1" />
              AI Assistant
            </div>
          )}
          <p className="text-sm">{message.content}</p>
          <div
            className={`flex items-center justify-end mt-1 gap-1 ${
              message.sender === "user" ? "text-black/60" : "text-[#FAFAFA]/60"
            }`}
          >
            <span className="text-xs">{isClient ? formatTime(message.timestamp) : '•••'}</span>
            {message.sender === "user" && message.status && (
              <div className="ml-1.5 flex items-center">
                {renderStatusIcon()}
              </div>
            )}
          </div>
        </div>

        {/* Fixed position 3-dot menu with shadcn dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`p-1.5 rounded-full bg-[#252525] absolute border border-[#353839] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 top-2 ${
                message.sender === "user" ? "-left-8" : "-right-8"
              }`}
            >
              <MoreVertical size={14} className="text-[#FAFAFA]/70" />
            </button>
          </DropdownMenuTrigger>
          {/* @ts-ignore - shadcn/ui components type issue */}
          <DropdownMenuContent
            sideOffset={5}
            side={message.sender === "user" ? "left" : "right"}
            align="start"
            alignOffset={-5}
            className="w-48 rounded-xl bg-[#151515] border border-[#353839] shadow-xl text-[#FAFAFA] p-1"
          >
            {/* @ts-ignore */}
            <DropdownMenuItem 
              onClick={() => onCopy(message)}
              className="flex items-center cursor-pointer text-[#FAFAFA] hover:text-[#FAFAFA] focus:text-[#FAFAFA] hover:bg-[#353839] focus:bg-[#353839] rounded-lg px-3 py-2 text-sm"
            >
              <Copy size={14} className="mr-2.5" />
              <span>Copy</span>
            </DropdownMenuItem>
            {/* @ts-ignore */}
            <DropdownMenuItem 
              onClick={() => onReply(message)}
              className="flex items-center cursor-pointer text-[#FAFAFA] hover:text-[#FAFAFA] focus:text-[#FAFAFA] hover:bg-[#353839] focus:bg-[#353839] rounded-lg px-3 py-2 text-sm"
            >
              <Reply size={14} className="mr-2.5" />
              <span>Reply</span>
            </DropdownMenuItem>
            {/* @ts-ignore */}
            <DropdownMenuItem 
              onClick={() => onForward(message)}
              className="flex items-center cursor-pointer text-[#FAFAFA] hover:text-[#FAFAFA] focus:text-[#FAFAFA] hover:bg-[#353839] focus:bg-[#353839] rounded-lg px-3 py-2 text-sm"
            >
              <Forward size={14} className="mr-2.5" />
              <span>Forward</span>
            </DropdownMenuItem>
            {message.sender === "user" && (
              /* @ts-ignore */
              <DropdownMenuItem 
                onClick={() => onEdit(message)}
                className="flex items-center cursor-pointer text-[#FAFAFA] hover:text-[#FAFAFA] focus:text-[#FAFAFA] hover:bg-[#353839] focus:bg-[#353839] rounded-lg px-3 py-2 text-sm"
              >
                <Edit size={14} className="mr-2.5" />
                <span>Edit</span>
              </DropdownMenuItem>
            )}
            {/* @ts-ignore */}
            <DropdownMenuSeparator className="bg-[#353839] my-1" />
            {/* @ts-ignore */}
            <DropdownMenuItem 
              onClick={() => onDelete(message)}
              className="flex items-center cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400 hover:bg-red-950/30 focus:bg-red-950/30 rounded-lg px-3 py-2 text-sm"
            >
              <Trash2 size={14} className="mr-2.5" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
} 