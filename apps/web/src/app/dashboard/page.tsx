"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from 'next-themes'
import { Resizable } from 're-resizable'
import { 
  MessageCircle, 
  Settings, 
  User, 
  Users,
  Phone, 
  Video, 
  X,
  UserPlus,
  PhoneCall,
  UsersRound
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "next/navigation"

// Types and sample data
import { Contact, Message, MediaPreview, sampleContacts, sampleMessages } from "@/types/chat"

// Components
import { MessageList } from "@/components/chat/MessageList"
import { MessageInput } from "@/components/chat/MessageInput"
import { ContactList } from "@/components/dashboard/ContactList"

// Dialogs and Modals
import {
  ContactDetailsDialog,
  SettingsDialog,
  PrivacySettingsDialog,
  HelpCenterDialog,
  NewChatDialog,
  ClearHistoryDialog
} from "@/components/dashboard/Dialogs"

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()
  
  // Client-side rendering detection to prevent hydration issues
  const [isClient, setIsClient] = useState(false)
  
  // State declarations
  const [selectedContact, setSelectedContact] = useState<Contact | null>(sampleContacts[0])
  const [messages, setMessages] = useState<Message[]>(
    selectedContact ? sampleMessages[selectedContact.id] || [] : []
  )
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSidebar, setShowSidebar] = useState(true)
  const [mediaPreview, setMediaPreview] = useState<MediaPreview | null>(null)
  
  // Dialog visibility states
  const [showContactDetails, setShowContactDetails] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showPrivacySettings, setShowPrivacySettings] = useState(false)
  const [showClearHistory, setShowClearHistory] = useState(false)
  const [showHelpCenter, setShowHelpCenter] = useState(false)
  const [showNewChat, setShowNewChat] = useState(false)
  
  // Tabs and other settings
  const [activeTab, setActiveTab] = useState<'chats' | 'groups' | 'calls'>('chats')
  const [notificationsMuted, setNotificationsMuted] = useState(false)
  const [blockedContacts, setBlockedContacts] = useState<string[]>([])
  const [readReceipts, setReadReceipts] = useState(true)
  const [onlineStatus, setOnlineStatus] = useState(true)
  const [lastSeenStatus, setLastSeenStatus] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  
  // Use this effect to handle client-side rendering safely
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sync theme with next-themes
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('enzer-theme')
    if (savedTheme && !theme) {
      setTheme(savedTheme)
    }
  }, [theme, setTheme])

  // Update messages when selected contact changes
  useEffect(() => {
    if (selectedContact) {
      setMessages(sampleMessages[selectedContact.id] || [])
    }
  }, [selectedContact])

  // Handle mobile view
  useEffect(() => {
    if (isMobile && selectedContact) {
      setShowSidebar(false)
    } else {
      setShowSidebar(true)
    }
  }, [isMobile, selectedContact])

  // Send a new message
  const handleSendMessage = () => {
    if ((!newMessage.trim() && !mediaPreview) || !selectedContact) return;

    let content = newMessage;
    let mediaContent = '';

    // Handle media message
    if (mediaPreview) {
      switch (mediaPreview.type) {
        case 'image':
          mediaContent = `[Image: ${mediaPreview.name}]`;
          break;
        case 'video':
          mediaContent = `[Video: ${mediaPreview.name}]`;
          break;
        case 'audio':
          mediaContent = `[Audio: ${mediaPreview.name}]`;
          break;
        case 'file':
          mediaContent = `[File: ${mediaPreview.name}]`;
          break;
      }

      // In a real app, you would upload the file to a server here
      if (content.trim()) {
        content = `${mediaContent}\n\n${content}`;
      } else {
        content = mediaContent;
      }

      // Clear the preview
      setMediaPreview(null);
    }

    const newMsg: Message = {
      id: Date.now().toString(),
      content: content,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'll get back to you soon.",
        sender: "contact",
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, replyMsg])

      // Simulate AI suggestion after 3 seconds
      setTimeout(() => {
        const aiSuggestion: Message = {
          id: (Date.now() + 2).toString(),
          content: "Would you like me to suggest some quick replies?",
          sender: "contact",
          timestamp: new Date(),
          isAI: true,
        }
        setMessages((prevMessages) => [...prevMessages, aiSuggestion])
      }, 1000)
    }, 2000)
  }

  // Message actions
  const copyMessage = (message: Message) => {
    if (message) {
      navigator.clipboard.writeText(message.content);
    }
  };

  const replyToMessage = (message: Message) => {
    // Implementation would go here
  };

  const forwardMessage = (message: Message) => {
    // Implementation would go here
  };

  const deleteMessage = (message: Message) => {
    if (message) {
      setMessages(prevMessages => prevMessages.filter(m => m.id !== message.id));
    }
  };

  const editMessage = (message: Message) => {
    // Implementation would go here  
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  return (
    <div className="flex h-screen bg-black text-[#FAFAFA] overflow-hidden">
      {/* Sidebar */}
      {(showSidebar || !selectedContact) && (
        <Resizable
          defaultSize={{ width: 320, height: "100%" }}
          minWidth={280}
          maxWidth={400}
          enable={{ right: true }}
          handleClasses={{
            right: "w-1 bg-[#353839] hover:bg-[#FAFAFA]/50 transition-colors cursor-col-resize"
          }}
          className="relative"
        >
          <motion.div 
            initial={isMobile ? { x: -300 } : { opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`${
              isMobile ? "absolute z-10 w-full md:w-full" : "w-full"
            } h-full bg-[#0A0A0A] border-r border-[#353839] flex flex-col`}
          >
            {/* User profile and settings */}
            <div className="p-4 border-b border-[#353839]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src="https://randomuser.me/api/portraits/men/15.jpg"
                      alt="Your profile"
                      className="w-10 h-10 rounded-full object-cover border border-[#353839]"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A]"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">Your Name</h3>
                    <p className="text-xs text-[#FAFAFA]/70">Online</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    className="p-2 rounded-full hover:bg-[#353839] transition-colors"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings size={20} className="text-[#FAFAFA]/70" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#353839] bg-[#151515]/30">
              <button 
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'chats' ? 'border-b-2 border-[#FAFAFA] text-[#FAFAFA]' : 'text-[#FAFAFA]/50 hover:text-[#FAFAFA] transition-colors'}`}
                onClick={() => setActiveTab('chats')}
              >
                <div className="flex items-center justify-center">
                  <MessageCircle size={16} className="mr-1.5" />
                  Chats
                </div>
              </button>
              <button 
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'groups' ? 'border-b-2 border-[#FAFAFA] text-[#FAFAFA]' : 'text-[#FAFAFA]/50 hover:text-[#FAFAFA] transition-colors'}`}
                onClick={() => setActiveTab('groups')}
              >
                <div className="flex items-center justify-center">
                  <Users size={16} className="mr-1.5" />
                  Groups
                </div>
              </button>
              <button 
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'calls' ? 'border-b-2 border-[#FAFAFA] text-[#FAFAFA]' : 'text-[#FAFAFA]/50 hover:text-[#FAFAFA] transition-colors'}`}
                onClick={() => setActiveTab('calls')}
              >
                <div className="flex items-center justify-center">
                  <Phone size={16} className="mr-1.5" />
                  Calls
                </div>
              </button>
            </div>

            {/* Contact list area */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'chats' && (
                <ContactList
                  contacts={sampleContacts}
                  selectedContact={selectedContact}
                  isClient={isClient}
                  onSelectContact={(contact) => {
                    setSelectedContact(contact);
                    if (isMobile) {
                      setShowSidebar(false);
                    }
                  }}
                  onShowContactDetails={(contact) => {
                    setSelectedContact(contact);
                    setShowContactDetails(true);
                  }}
                  onNewChat={() => setShowNewChat(true)}
                />
              )}
              
              {activeTab === 'groups' && (
                <div className="p-8 text-center">
                  <UsersRound size={40} className="text-[#353839] mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">No Groups Yet</h3>
                  <p className="text-sm text-[#FAFAFA]/60 mb-4">Create a group to chat with multiple contacts at once</p>
                  <button className="px-4 py-2 bg-[#353839] hover:bg-[#454545] transition-colors rounded-xl inline-flex items-center gap-2">
                    <UserPlus size={16} />
                    <span className="text-sm">Create Group</span>
                  </button>
                </div>
              )}
              
              {activeTab === 'calls' && (
                <div className="p-8 text-center">
                  <PhoneCall size={40} className="text-[#353839] mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">No Recent Calls</h3>
                  <p className="text-sm text-[#FAFAFA]/60 mb-4">Your call history will appear here</p>
                  <button className="px-4 py-2 bg-[#353839] hover:bg-[#454545] transition-colors rounded-xl inline-flex items-center gap-2">
                    <Phone size={16} />
                    <span className="text-sm">Start a Call</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </Resizable>
      )}

      {/* Main chat area */}
      {selectedContact ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col h-full"
        >
          {/* Chat header */}
          <div className="h-[72px] px-4 bg-[#151515] border-b border-[#353839] flex items-center justify-between">
            <div className="flex items-center">
              {isMobile && (
                <button
                  className="mr-2 p-2 rounded-full hover:bg-[#353839] transition-colors"
                  onClick={() => setShowSidebar(true)}
                >
                  <MessageCircle size={20} />
                </button>
              )}
              <div 
                className="flex items-center cursor-pointer hover:bg-[#353839]/30 p-2 rounded-xl transition-colors"
                onClick={() => setShowContactDetails(true)}
              >
                <div className="relative">
                  <img
                    src={selectedContact.avatar || '/images/default-avatar.jpg'}
                    alt={selectedContact.name || 'Contact'}
                    className="w-10 h-10 rounded-full object-cover border border-[#353839]"
                  />
                  {selectedContact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#151515]"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{selectedContact.name || 'Unknown Contact'}</h3>
                  <p className="text-xs text-[#FAFAFA]/70">
                    {selectedContact.isOnline ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-[#353839] transition-colors">
                <Phone size={20} className="text-[#FAFAFA]/70" />
              </button>
              <button className="p-2 rounded-full hover:bg-[#353839] transition-colors">
                <Video size={20} className="text-[#FAFAFA]/70" />
              </button>
            </div>
          </div>
          
          {/* Messages area */}
          <MessageList
            messages={messages}
            isClient={isClient}
            selectedContact={selectedContact}
            onCopyMessage={copyMessage}
            onReplyToMessage={replyToMessage}
            onForwardMessage={forwardMessage}
            onDeleteMessage={deleteMessage}
            onEditMessage={editMessage}
          />

          {/* Input area */}
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            onEmojiSelect={handleEmojiSelect}
          />
        </motion.div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#0A0A0A]">
          <div className="text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-[#353839]" />
            <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
            <p className="text-[#FAFAFA]/60 max-w-md">
              Choose a contact from the list or start a new conversation
            </p>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <ContactDetailsDialog
        isOpen={showContactDetails}
        onClose={() => setShowContactDetails(false)}
        contact={selectedContact}
      />

      <SettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        notificationsMuted={notificationsMuted}
        setNotificationsMuted={setNotificationsMuted}
        onShowPrivacySettings={() => {
          setShowSettings(false);
          setShowPrivacySettings(true);
        }}
        onShowClearHistory={() => {
          setShowSettings(false);
          setShowClearHistory(true);
        }}
        onShowHelpCenter={() => {
          setShowSettings(false);
          setShowHelpCenter(true);
        }}
      />

      <PrivacySettingsDialog
        isOpen={showPrivacySettings}
        onClose={() => setShowPrivacySettings(false)}
        onBack={() => {
          setShowPrivacySettings(false);
          setShowSettings(true);
        }}
        readReceipts={readReceipts}
        setReadReceipts={setReadReceipts}
        onlineStatus={onlineStatus}
        setOnlineStatus={setOnlineStatus}
        lastSeenStatus={lastSeenStatus}
        setLastSeenStatus={setLastSeenStatus}
        twoFactorAuth={twoFactorAuth}
        setTwoFactorAuth={setTwoFactorAuth}
        blockedContacts={blockedContacts}
      />

      <HelpCenterDialog
        isOpen={showHelpCenter}
        onClose={() => setShowHelpCenter(false)}
        onBack={() => {
          setShowHelpCenter(false);
          setShowSettings(true);
        }}
      />

      <NewChatDialog
        isOpen={showNewChat}
        onClose={() => setShowNewChat(false)}
        contacts={sampleContacts.filter(c => c.id !== selectedContact?.id)}
        selectedContact={selectedContact}
        onSelectContact={(contact) => {
          setSelectedContact(contact);
          setShowNewChat(false);
          if (isMobile) {
            setShowSidebar(false);
          }
        }}
        isMobile={isMobile}
      />

      <ClearHistoryDialog
        isOpen={showClearHistory}
        onClose={() => setShowClearHistory(false)}
        onBack={() => {
          setShowClearHistory(false);
          setShowSettings(true);
        }}
      />
    </div>
  );
}