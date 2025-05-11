"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Contact } from "@/types/chat";
import { useState } from "react";

// Base Dialog wrapper
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onBack?: () => void; // Optional back handler
}

function DialogWrapper({ isOpen, onClose, title, children, onBack }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div 
        className="relative bg-[#151515] dark:bg-[#151515] rounded-2xl p-4 w-[90%] max-w-md border border-[#353839] dark:border-[#353839] z-[9999] max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {onBack && (
              <button 
                className="p-1 mr-2 rounded-full hover:bg-[#353839] transition-colors"
                onClick={onBack}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
          <button 
            className="p-1 rounded-full hover:bg-[#353839] transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

// Contact Details Dialog
interface ContactDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export function ContactDetailsDialog({ isOpen, onClose, contact }: ContactDetailsDialogProps) {
  if (!contact) return null;
  
  return (
    <DialogWrapper isOpen={isOpen} onClose={onClose} title="Contact Info">
      <div className="space-y-4">
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-24 h-24 mb-3">
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              className="w-full h-full rounded-full object-cover border-2 border-[#353839]"
            />
            {contact.isOnline && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#151515]" />
            )}
          </div>
          <h3 className="text-xl font-bold">{contact.name}</h3>
          <p className="text-sm text-[#FAFAFA]/70">@{contact.username}</p>
          <p className="text-sm text-[#FAFAFA]/70 mt-1">
            {contact.isOnline ? "Online" : "Last seen recently"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 p-3 bg-[#252525] hover:bg-[#353839] rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="text-sm">Call</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 bg-[#252525] hover:bg-[#353839] rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span className="text-sm">Video</span>
          </button>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <p className="text-sm">Notifications</p>
                <p className="text-xs text-[#FAFAFA]/50">On</p>
              </div>
            </div>
            <div className="w-11 h-6 bg-[#454545] rounded-full relative">
              <div className="absolute top-1 right-1 w-4 h-4 bg-[#FAFAFA] rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div>
                <p className="text-sm">Privacy</p>
                <p className="text-xs text-[#FAFAFA]/50">Last seen, media</p>
              </div>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/50">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
              <p className="text-sm text-red-400">Block Contact</p>
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}

// Settings Dialog
interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notificationsMuted: boolean;
  setNotificationsMuted: (value: boolean) => void;
  onShowPrivacySettings: () => void;
  onShowClearHistory: () => void;
  onShowHelpCenter: () => void;
}

export function SettingsDialog({ 
  isOpen, 
  onClose, 
  notificationsMuted, 
  setNotificationsMuted,
  onShowPrivacySettings,
  onShowClearHistory,
  onShowHelpCenter
}: SettingsDialogProps) {
  return (
    <DialogWrapper isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-2">Notifications</h3>
          
          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <div>
                <p className="text-sm">Mute Notifications</p>
                <p className="text-xs text-[#FAFAFA]/50">Turn off all notification sounds</p>
              </div>
            </div>
            <button 
              className={`w-11 h-6 ${notificationsMuted ? 'bg-[#454545]' : 'bg-[#353839]'} rounded-full relative`}
              onClick={() => setNotificationsMuted(!notificationsMuted)}
            >
              <div className={`absolute top-1 ${notificationsMuted ? 'right-1' : 'left-1'} w-4 h-4 ${notificationsMuted ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]/70'} rounded-full transition-all duration-200`}></div>
            </button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <div>
                <p className="text-sm">Appearance</p>
                <p className="text-xs text-[#FAFAFA]/50">Dark mode</p>
              </div>
            </div>
            <div className="w-16 h-6 bg-[#353839] rounded-full flex items-center justify-center text-xs font-medium">
              Dark
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-2">Privacy & Security</h3>
          
          <button 
            className="flex justify-between items-center p-3 bg-[#252525] hover:bg-[#353839] rounded-xl w-full transition-colors"
            onClick={onShowPrivacySettings}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div>
                <p className="text-sm">Privacy Settings</p>
                <p className="text-xs text-[#FAFAFA]/50">Manage who can see your info</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/50">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          <button 
            className="flex justify-between items-center p-3 bg-[#252525] hover:bg-[#353839] rounded-xl w-full transition-colors"
            onClick={onShowClearHistory}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              <div>
                <p className="text-sm">Clear History</p>
                <p className="text-xs text-[#FAFAFA]/50">Delete your chat history</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/50">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-2">Support</h3>
          
          <button 
            className="flex justify-between items-center p-3 bg-[#252525] hover:bg-[#353839] rounded-xl w-full transition-colors"
            onClick={onShowHelpCenter}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <div>
                <p className="text-sm">Help Center</p>
                <p className="text-xs text-[#FAFAFA]/50">Get help using the app</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/50">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          <div className="p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <div>
                <p className="text-sm">About</p>
                <p className="text-xs text-[#FAFAFA]/50">Version 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}

// Privacy Settings Dialog
interface PrivacySettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  readReceipts: boolean;
  setReadReceipts: (value: boolean) => void;
  onlineStatus: boolean;
  setOnlineStatus: (value: boolean) => void;
  lastSeenStatus: boolean;
  setLastSeenStatus: (value: boolean) => void;
  twoFactorAuth: boolean;
  setTwoFactorAuth: (value: boolean) => void;
  blockedContacts: string[];
}

export function PrivacySettingsDialog({
  isOpen,
  onClose,
  onBack,
  readReceipts,
  setReadReceipts,
  onlineStatus,
  setOnlineStatus,
  lastSeenStatus,
  setLastSeenStatus,
  twoFactorAuth,
  setTwoFactorAuth,
  blockedContacts
}: PrivacySettingsDialogProps) {
  return (
    <DialogWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Privacy Settings"
      onBack={onBack}
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-2">Chat Privacy</h3>
          
          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
              <div>
                <p className="text-sm">Read Receipts</p>
                <p className="text-xs text-[#FAFAFA]/50">Let others know when you've read their messages</p>
              </div>
            </div>
            <button 
              className={`w-11 h-6 ${readReceipts ? 'bg-[#454545]' : 'bg-[#353839]'} rounded-full relative`}
              onClick={() => setReadReceipts(!readReceipts)}
            >
              <div className={`absolute top-1 ${readReceipts ? 'right-1' : 'left-1'} w-4 h-4 ${readReceipts ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]/70'} rounded-full transition-all duration-200`}></div>
            </button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <div>
                <p className="text-sm">Online Status</p>
                <p className="text-xs text-[#FAFAFA]/50">Show when you're active in the app</p>
              </div>
            </div>
            <button 
              className={`w-11 h-6 ${onlineStatus ? 'bg-[#454545]' : 'bg-[#353839]'} rounded-full relative`}
              onClick={() => setOnlineStatus(!onlineStatus)}
            >
              <div className={`absolute top-1 ${onlineStatus ? 'right-1' : 'left-1'} w-4 h-4 ${onlineStatus ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]/70'} rounded-full transition-all duration-200`}></div>
            </button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <p className="text-sm">Last Seen</p>
                <p className="text-xs text-[#FAFAFA]/50">Show your last active time</p>
              </div>
            </div>
            <button 
              className={`w-11 h-6 ${lastSeenStatus ? 'bg-[#454545]' : 'bg-[#353839]'} rounded-full relative`}
              onClick={() => setLastSeenStatus(!lastSeenStatus)}
            >
              <div className={`absolute top-1 ${lastSeenStatus ? 'right-1' : 'left-1'} w-4 h-4 ${lastSeenStatus ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]/70'} rounded-full transition-all duration-200`}></div>
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-2">Security</h3>
          
          <div className="flex justify-between items-center p-3 bg-[#252525] rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-[#FAFAFA]/70">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <div>
                <p className="text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-[#FAFAFA]/50">Add an extra layer of security</p>
              </div>
            </div>
            <button 
              className={`w-11 h-6 ${twoFactorAuth ? 'bg-[#454545]' : 'bg-[#353839]'} rounded-full relative`}
              onClick={() => setTwoFactorAuth(!twoFactorAuth)}
            >
              <div className={`absolute top-1 ${twoFactorAuth ? 'right-1' : 'left-1'} w-4 h-4 ${twoFactorAuth ? 'bg-[#FAFAFA]' : 'bg-[#FAFAFA]/70'} rounded-full transition-all duration-200`}></div>
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-2">Blocked Contacts</h3>
          
          {blockedContacts.length === 0 ? (
            <div className="p-3 bg-[#252525] rounded-xl">
              <p className="text-sm text-center text-[#FAFAFA]/50">No blocked contacts</p>
            </div>
          ) : (
            <div className="p-3 bg-[#252525] rounded-xl">
              <ul className="space-y-2">
                {blockedContacts.map((contact, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-sm">{contact}</span>
                    <button className="p-1 rounded-full hover:bg-[#353839] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button className="w-full p-3 bg-[#252525] hover:bg-[#353839] rounded-xl text-sm transition-colors">
            + Block a new contact
          </button>
        </div>
      </div>
    </DialogWrapper>
  );
}

// Help Center Dialog
interface HelpCenterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
}

export function HelpCenterDialog({ isOpen, onClose, onBack }: HelpCenterDialogProps) {
  return (
    <DialogWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Help Center"
      onBack={onBack}
    >
      <div className="space-y-4">
        <div className="p-4 bg-[#252525] rounded-xl mb-4">
          <h3 className="text-sm font-bold mb-2">Need help with Enzer?</h3>
          <p className="text-xs text-[#FAFAFA]/70 mb-3">Find answers to common questions or contact our support team.</p>
          
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/50">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search help topics..." 
              className="w-full bg-[#151515] border border-[#353839] rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-[#FAFAFA]/30"
            />
          </div>
        </div>
        
        <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-2">Frequently Asked Questions</h3>
        
        <div className="space-y-2">
          {[
            { 
              title: "How do I send messages?", 
              icon: "MessageCircle",
              content: "Type your message in the text box at the bottom of the chat window and press Enter or click the send button."
            },
            { 
              title: "Is my data secure?", 
              icon: "Lock",
              content: "Yes, all messages are end-to-end encrypted, meaning only you and the intended recipient can read them."
            },
            { 
              title: "How does voice messaging work?", 
              icon: "Mic",
              content: "Hold the microphone button while speaking and release to send. Your voice will be converted to text automatically."
            },
            { 
              title: "What are AI suggestions?", 
              icon: "Sparkles",
              content: "Our AI analyzes conversation context to suggest relevant responses, saving you time while typing."
            },
            { 
              title: "How do I share photos and files?", 
              icon: "Image",
              content: "Tap the attachment icon (paperclip) and select the type of media you want to share from the options."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-[#252525] p-3 rounded-xl">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-[#151515] rounded-full flex items-center justify-center mr-3">
                  {faq.icon === "MessageCircle" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/70">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  )}
                  {faq.icon === "Lock" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/70">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  )}
                  {faq.icon === "Mic" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/70">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  )}
                  {faq.icon === "Sparkles" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/70">
                      <path d="M12 3l1.91 5.89 6.09.83-4.4 4.3 1.04 6.04-4.64-2.44-4.64 2.44 1.04-6.04-4.4-4.3 6.09-.83z"></path>
                    </svg>
                  )}
                  {faq.icon === "Image" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA]/70">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  )}
                </div>
                <p className="text-sm font-medium">{faq.title}</p>
              </div>
              <p className="text-xs text-[#FAFAFA]/70 pl-11">{faq.content}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-[#353839]">
          <h3 className="text-sm font-medium text-[#FAFAFA]/70 mb-3">Still need help?</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-[#252525] hover:bg-[#353839] rounded-xl flex flex-col items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span className="text-xs">Chat Support</span>
            </button>
            <button className="p-3 bg-[#252525] hover:bg-[#353839] rounded-xl flex flex-col items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-xs">Schedule Call</span>
            </button>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}

// New Chat Dialog
interface NewChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  isMobile: boolean;
}

export function NewChatDialog({
  isOpen,
  onClose,
  contacts,
  selectedContact,
  onSelectContact,
  isMobile
}: NewChatDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle contact selection
  const handleSelectContact = (contact: Contact) => {
    onSelectContact(contact);
    // Close dialog if on mobile
    if (isMobile) {
      onClose();
    }
  };
  
  return (
    <DialogWrapper isOpen={isOpen} onClose={onClose} title="New Conversation">
      <div className="space-y-4">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/50">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="w-full bg-[#151515] border border-[#353839] rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-[#FAFAFA]/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="h-[min(50vh,400px)] overflow-y-auto pr-1">
          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#353839] mb-3">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p className="text-sm text-[#FAFAFA]/50">No contacts found</p>
              <p className="text-xs text-[#FAFAFA]/30 mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`flex items-center p-3 rounded-xl w-full transition-colors ${
                    selectedContact?.id === contact.id
                      ? "bg-[#353839]"
                      : "bg-[#252525] hover:bg-[#353839]"
                  }`}
                  onClick={() => handleSelectContact(contact)}
                >
                  <div className="relative mr-3">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name} 
                      className="w-10 h-10 rounded-full object-cover border border-[#353839]"
                    />
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#151515]" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-[#FAFAFA]/50">@{contact.username}</p>
                  </div>
                  {selectedContact?.id === contact.id && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FAFAFA] ml-2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 pt-3 border-t border-[#353839]">
          <button 
            className="px-4 py-2 bg-[#353839] hover:bg-[#454545] transition-colors rounded-xl text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className={`px-4 py-2 transition-colors rounded-xl text-sm ${
              selectedContact 
                ? "bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black" 
                : "bg-[#353839]/50 text-[#FAFAFA]/50 cursor-not-allowed"
            }`}
            disabled={!selectedContact}
            onClick={onClose}
          >
            Chat
          </button>
        </div>
      </div>
    </DialogWrapper>
  );
}

// Clear History Dialog
interface ClearHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
}

export function ClearHistoryDialog({ isOpen, onClose, onBack }: ClearHistoryDialogProps) {
  return (
    <DialogWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Clear Chat History"
      onBack={onBack}
    >
      <div className="space-y-4">
        <p className="text-sm text-[#FAFAFA]/70">Are you sure you want to clear your chat history? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-[#353839] hover:bg-[#454545] transition-colors rounded-xl text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded-xl text-sm">
            Clear
          </button>
        </div>
      </div>
    </DialogWrapper>
  );
} 