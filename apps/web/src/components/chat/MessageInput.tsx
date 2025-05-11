"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  X,
  AudioLines,
  File 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { MediaPreview } from "@/types/chat";
import { formatFileSize } from "@/utils/formatters";
import { getIconComponent } from "@/utils/icons";
import EmojiPicker from 'emoji-picker-react';
import type { Theme as EmojiPickerTheme } from 'emoji-picker-react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
  mediaPreview: MediaPreview | null;
  setMediaPreview: (preview: MediaPreview | null) => void;
  onEmojiSelect: (emoji: string) => void;
}

export function MessageInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
  mediaPreview,
  setMediaPreview,
  onEmojiSelect
}: MessageInputProps) {
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close emoji picker if clicked outside
      if (
        showEmojiPicker && 
        emojiPickerRef.current && 
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
      
      // Close attach menu if clicked outside (similar logic can be applied)
      if (
        showAttachMenu && 
        !document.querySelector('.attach-menu')?.contains(event.target as Node) &&
        !document.querySelector('.attach-button')?.contains(event.target as Node)
      ) {
        setShowAttachMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker, showAttachMenu]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear previous preview
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview.url);
    }

    // Determine file type
    let type: MediaPreview['type'] = 'file';
    if (file.type.startsWith('image/')) {
      type = 'image';
    } else if (file.type.startsWith('video/')) {
      type = 'video';
    } else if (file.type.startsWith('audio/')) {
      type = 'audio';
    }

    // Create preview
    const preview: MediaPreview = {
      type,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    };

    setMediaPreview(preview);
  };

  // Cancel media preview
  const cancelMediaPreview = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview.url);
      setMediaPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 bg-[#151515] border-t border-[#353839]">
      {/* Hidden file input for media uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileSelect} 
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
      />
      
      {/* Media Preview */}
      {mediaPreview && (
        <div className="mb-3 p-3 bg-[#252525] rounded-xl border border-[#353839] shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Preview</h4>
            <button 
              className="p-1 rounded-full hover:bg-[#353839] transition-colors"
              onClick={cancelMediaPreview}
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="flex items-start">
            {mediaPreview.type === 'image' && (
              <div className="relative w-full max-w-xs mx-auto">
                <img 
                  src={mediaPreview.url} 
                  alt={mediaPreview.name} 
                  className="w-full h-auto rounded-lg object-contain max-h-60"
                />
              </div>
            )}
            
            {mediaPreview.type === 'video' && (
              <div className="relative w-full max-w-xs mx-auto">
                <video 
                  src={mediaPreview.url} 
                  controls 
                  className="w-full h-auto rounded-lg max-h-60"
                />
              </div>
            )}
            
            {mediaPreview.type === 'audio' && (
              <div className="w-full">
                <audio 
                  src={mediaPreview.url} 
                  controls 
                  className="w-full"
                />
              </div>
            )}
            
            {mediaPreview.type === 'file' && (
              <div className="flex items-center p-3 bg-[#151515] rounded-lg w-full">
                <File className="mr-3 text-[#FAFAFA]/70" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm truncate">{mediaPreview.name}</p>
                  <p className="text-xs text-[#FAFAFA]/50">{formatFileSize(mediaPreview.size)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Input Form */}
      <form
        className="flex items-center space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-[#353839] transition-colors attach-button"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
          >
            <Paperclip size={20} className="text-[#FAFAFA]/70" />
          </button>
          
          {/* Attachment Menu with Animation */}
          <AnimatePresence>
            {showAttachMenu && (
              <motion.div 
                className="absolute bottom-14 left-0 bg-[#151515] rounded-xl shadow-lg border border-[#353839] p-2 w-[220px] z-10 attach-menu"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: "Camera", label: "Camera", accept: "image/*", capture: "user" },
                    { icon: "Image", label: "Gallery", accept: "image/*" },
                    { icon: "File", label: "Document", accept: ".pdf,.doc,.docx,.xls,.xlsx,.txt" },
                    { icon: "Mic", label: "Audio", accept: "audio/*" },
                    { icon: "Video", label: "Video", accept: "video/*" },
                    { icon: "Map", label: "Location" }
                  ].map((item, index) => {
                    const IconComponent = getIconComponent(item.icon);
                    return (
                      <motion.button
                        key={index}
                        className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-[#353839] transition-colors"
                        whileHover={{ scale: 1.05, backgroundColor: "#353839" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAttachMenu(false);
                          
                          // Handle special cases
                          if (item.label === "Location") {
                            // In a real app, this would open a location picker
                            alert("Location sharing would be implemented in a real app");
                            return;
                          }
                          
                          // Trigger file input for media types
                          if (fileInputRef.current && item.accept) {
                            fileInputRef.current.accept = item.accept;
                            if (item.capture) {
                              fileInputRef.current.setAttribute("capture", item.capture);
                            } else {
                              fileInputRef.current.removeAttribute("capture");
                            }
                            fileInputRef.current.click();
                          }
                        }}
                      >
                        <IconComponent size={20} className="mb-1" />
                        <span className="text-xs">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-[#353839] transition-colors"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              ref={emojiButtonRef}
            >
              <Smile size={18} className="text-[#FAFAFA]/70" />
            </button>
          </div>
          
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-[#0A0A0A] border-[#353839] focus:border-[#FAFAFA]/50 rounded-xl pl-12 pr-12"
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-[#353839] transition-colors"
            >
              <Mic size={18} className="text-[#FAFAFA]/70" />
            </button>
          </div>
          
          {/* Emoji Picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div 
                ref={emojiPickerRef}
                className="absolute bottom-14 left-0 bg-[#151515] rounded-xl shadow-lg border border-[#353839] p-3 z-10"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Emojis</h4>
                  <button 
                    className="p-1 rounded-full hover:bg-[#353839] transition-colors"
                    onClick={() => setShowEmojiPicker(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <EmojiPicker 
                  theme={("dark" as EmojiPickerTheme)}
                  searchPlaceholder="Search emoji..."
                  width={300}
                  height={400}
                  onEmojiClick={(emojiData) => {
                    onEmojiSelect(emojiData.emoji);
                    setShowEmojiPicker(false);
                  }}
                  previewConfig={{ showPreview: false }}
                  skinTonesDisabled
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {newMessage && newMessage.trim() ? (
          <motion.button
            type="submit"
            className="bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={18} />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            className="bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AudioLines size={18} />
          </motion.button>
        )}
      </form>
    </div>
  );
} 