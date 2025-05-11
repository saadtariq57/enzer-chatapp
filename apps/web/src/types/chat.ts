export interface Contact {
  id: string
  name: string
  username: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unreadCount?: number
  isOnline: boolean
}

export interface Message {
  id: string
  content: string
  sender: "user" | "contact"
  timestamp: Date
  status?: "sent" | "delivered" | "read"
  isAI?: boolean
}

export interface MediaPreview {
  type: 'image' | 'video' | 'audio' | 'file';
  url: string;
  name: string;
  size?: number;
}

// Sample data for development/testing
export const sampleContacts: Contact[] = [
  {
    id: "1",
    name: "Saad Ahmed",
    username: "saad_ahmed",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Hey there! How's your experience with the new app?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: "2",
    name: "Alex Johnson",
    username: "alex_j",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    lastMessage: "The meeting is scheduled for tomorrow at 2 PM",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isOnline: true,
  },
  {
    id: "3",
    name: "Maria Garcia",
    username: "maria_g",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    lastMessage: "Thanks for the update! I'll check it out.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isOnline: false,
  },
  {
    id: "4",
    name: "John Smith",
    username: "johnsmith",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    lastMessage: "Did you see the latest changes to the project?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "5",
    name: "Emma Wilson",
    username: "emma_w",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    lastMessage: "Let's catch up next week!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isOnline: false,
  },
  {
    id: "6",
    name: "David Lee",
    username: "david_lee",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    lastMessage: "The presentation went really well!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    isOnline: false,
  },
  {
    id: "7",
    name: "Sophia Chen",
    username: "sophia_c",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    lastMessage: "I've shared the document with you",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    isOnline: true,
  },
];

export const sampleMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      content: "Hey there! How's your experience with the new app?",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: "m2",
      content: "It's amazing! The interface is so clean and intuitive.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 55),
      status: "read",
    },
    {
      id: "m3",
      content: "That sounds interesting! What kind of project is it?",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 50),
    },
    {
      id: "m4",
      content: "It's a chat application with a sleek dark theme. I'm really excited about how it's turning out!",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: "read",
    },
    {
      id: "m5",
      content: "Great to hear! Have you tried the voice features yet? They're really impressive.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
    },
    {
      id: "m6",
      content: "Not yet, but I'm planning to check them out soon. I've heard great things about the AI suggestions too.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      status: "read",
    },
    {
      id: "m7",
      content: "Yes, the AI features are fantastic! They really help with quick responses.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "m8",
      content: "I'll definitely try them out. Thanks for the recommendation!",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      status: "delivered",
    },
    {
      id: "m9",
      content: "No problem! Let me know what you think after you try them.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
    },
    {
      id: "m10",
      content: "Will do! Talk to you later.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: "sent",
    },
    {
      id: "m11",
      content: "By the way, are you free for a quick call tomorrow to discuss the project updates?",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      id: "m12",
      content: "Sure, I'm available around 2 PM. Does that work for you?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: "sent",
    },
  ],
}; 