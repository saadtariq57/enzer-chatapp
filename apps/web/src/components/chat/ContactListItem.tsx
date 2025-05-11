"use client";

import { Contact } from "@/types/chat";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/formatters";

interface ContactListItemProps {
  contact: Contact;
  isSelected: boolean;
  isClient: boolean;
  onClick: () => void;
  onAvatarClick: (e: React.MouseEvent) => void;
}

export function ContactListItem({
  contact,
  isSelected,
  isClient,
  onClick,
  onAvatarClick
}: ContactListItemProps) {
  return (
    <motion.div
      key={contact.id}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
      }}
      className={`p-4 hover:bg-[#353839]/20 transition-all duration-200 cursor-pointer ${
        isSelected ? 'bg-[#353839]/30' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={contact.avatar} 
            alt={contact.name} 
            className="w-12 h-12 rounded-full object-cover border border-[#353839] hover:shadow-md transition-shadow"
            onClick={(e) => {
              e.stopPropagation();
              onAvatarClick(e);
            }}
          />
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium truncate">{contact.name}</h3>
            <span className="text-xs text-[#FAFAFA]/50">
              {isClient ? formatDate(contact.timestamp) : '•••'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#FAFAFA]/70 truncate">
              {contact.lastMessage}
            </p>
            {contact.unreadCount ? (
              <span className="ml-2 bg-[#FAFAFA] text-black text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5">
                {contact.unreadCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 