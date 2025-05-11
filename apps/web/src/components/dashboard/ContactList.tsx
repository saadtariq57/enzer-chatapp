"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Contact } from "@/types/chat";
import { ContactListItem } from "../chat/ContactListItem";

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  isClient: boolean;
  onSelectContact: (contact: Contact) => void;
  onShowContactDetails: (contact: Contact) => void;
  onNewChat: () => void;
}

export function ContactList({
  contacts,
  selectedContact,
  isClient,
  onSelectContact,
  onShowContactDetails,
  onNewChat
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="flex flex-col h-full">
      {/* Search input */}
      <div className="p-4 border-b border-[#353839]">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/50" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#151515] border-[#353839] focus:border-[#FAFAFA]/50 rounded-xl w-full"
          />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="divide-y divide-[#353839]/50"
        >
          {filteredContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              isClient={isClient}
              onClick={() => onSelectContact(contact)}
              onAvatarClick={(e) => {
                e.stopPropagation();
                onShowContactDetails(contact);
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* New chat button */}
      <div className="p-4 border-t border-[#353839]">
        <Button 
          className="w-full bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black rounded-xl flex items-center justify-center gap-2"
          onClick={onNewChat}
        >
          <Plus size={18} />
          <span>New Chat</span>
        </Button>
      </div>
    </div>
  );
} 