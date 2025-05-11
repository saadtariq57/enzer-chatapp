"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { LucideIcon, LucideProps } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

// Import icons individually
import { ArrowRight } from "lucide-react"
import { MessageCircle } from "lucide-react"
import { Shield } from "lucide-react"
import { Zap } from "lucide-react"
import { Globe } from "lucide-react"
import { Mic } from "lucide-react"
import { Sparkles } from "lucide-react"
import { BrainCircuit } from "lucide-react"
import { MessageSquareText } from "lucide-react"
import { Phone } from "lucide-react"
import { Check } from "lucide-react"
import { Paperclip } from "lucide-react"
import { Video } from "lucide-react"
import { Camera } from "lucide-react"
import { AudioWaveform } from "lucide-react"

// Helper function to render icons with proper typing
function IconWrapper({ icon: Icon, ...props }: { icon: any } & LucideProps) {
  return <Icon {...props} />
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [aiRef, aiInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    // Check for hash in URL and scroll to that section immediately
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        // Use a very small timeout to ensure the DOM is fully loaded
        setTimeout(() => {
          const navbarHeight = 80 // Adjust based on your navbar height
          const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight
          window.scrollTo({ top: y })
        }, 10)
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-[#FAFAFA] overflow-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative py-20 md:py-32">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,250,250,0.15),transparent_50%)]"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#FAFAFA]/5 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#FAFAFA]/10 blur-[120px]"></div>

        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 bg-[#FAFAFA]/10 backdrop-blur-sm rounded-full mb-6 border border-[#FAFAFA]/20">
                <span className="text-[#FAFAFA] font-medium text-sm">Introducing Enzer</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Chat Smarter with <span className="text-[#FAFAFA]">AI-Powered</span> Messaging
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Experience the next generation of messaging with our sleek, secure, and intelligent chat platform
                designed for modern communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black px-8 py-6 text-lg rounded-xl group">
                  Try Now
                  <IconWrapper icon={ArrowRight} className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="mt-8">
                <p className="text-gray-400 text-sm">
                  <span className="text-[#FAFAFA]">✓</span> End-to-end encryption
                  <span className="mx-3">•</span>
                  <span className="text-[#FAFAFA]">✓</span> AI-powered features
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              {/* iPhone 16 Pro mockup */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-[300px] h-[610px] bg-[#1A1A1A] rounded-[54px] p-4 shadow-[0_0_60px_rgba(255,255,255,0.15)] border border-[#353839] overflow-hidden relative">
                  {/* Screen */}
                  <div className="w-full h-full bg-black rounded-[44px] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="h-10 px-6 flex justify-between items-center text-xs">
                      <div className="font-medium">9:41</div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          <div className="h-2.5 w-[18px] relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="h-[6px] w-[6px] rounded-full bg-[#FAFAFA] mr-[1px]"></div>
                              <div className="h-[8px] w-[1px] bg-[#FAFAFA] mr-[1px]"></div>
                              <div className="h-[10px] w-[1px] bg-[#FAFAFA] mr-[1px]"></div>
                              <div className="h-[12px] w-[1px] bg-[#FAFAFA]"></div>
                            </div>
                          </div>
                        </div>
                        <div className="h-2.5 w-[15px] relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="h-[6px] w-[6px] rounded-full border border-[#FAFAFA]"></div>
                            <div className="h-[1px] w-[2px] bg-[#FAFAFA] ml-[1px]"></div>
                            <div className="h-[4px] w-[1px] bg-[#FAFAFA] ml-[1px]"></div>
                            <div className="h-[6px] w-[1px] bg-[#FAFAFA] ml-[1px]"></div>
                          </div>
                        </div>
                        <div className="w-[20px] h-[10px] rounded-[2px] border border-[#FAFAFA] relative">
                          <div className="absolute top-0 bottom-0 left-0 w-[14px] bg-[#FAFAFA] m-[1px] rounded-[1px]"></div>
                          <div className="absolute -right-[2px] top-[3px] h-[4px] w-[1px] rounded-full bg-[#FAFAFA]"></div>
                        </div>
                      </div>
                    </div>

                    {/* App content */}
                    <div className="h-14 bg-[#353839] flex items-center px-4 border-b border-gray-800">
                      <div className="flex items-center flex-1">
                        <div className="w-8 h-8 rounded-full bg-[#FAFAFA]/20 overflow-hidden mr-3">
                          <img
                            src="/images/profile_photo.jpg"
                            alt="User avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">Saad</h3>
                          <p className="text-xs text-[#FAFAFA]/70">Online</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="w-8 h-8 rounded-full bg-[#353839] flex items-center justify-center hover:bg-[#454545]">
                          <IconWrapper icon={Video} className="w-4 h-4 text-[#FAFAFA]" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#353839] flex items-center justify-center hover:bg-[#454545]">
                          <IconWrapper icon={Phone} className="w-4 h-4 text-[#FAFAFA]" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 space-y-3 h-[calc(100%-14rem)] overflow-hidden">
                      <div className="flex justify-start">
                        <div className="flex items-start gap-1">
                          <div className="w-6 h-6 rounded-full bg-[#FAFAFA]/20 overflow-hidden">
                            <img
                              src="/images/profile_photo.jpg"
                              alt="User avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-[#353839] rounded-2xl rounded-tl-none p-2.5 max-w-[80%]">
                            <p className="text-xs">Hey there! How's your experience with the new app?</p>
                            <p className="text-[10px] opacity-70 mt-1 text-right">10:24 AM</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#FAFAFA] rounded-2xl rounded-tr-none p-2.5 max-w-[80%]">
                          <p className="text-xs text-black">It's amazing! The interface is so clean and intuitive.</p>
                          <div className="flex items-center justify-end mt-1 gap-1">
                            <p className="text-[10px] text-black/70">10:26 AM</p>
                            <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center">
                              <IconWrapper icon={Check} className="w-2 h-2 text-white" strokeWidth={2.5} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="flex items-start gap-1">
                          <div className="w-6 h-6 rounded-full bg-[#FAFAFA]/20 overflow-hidden">
                            <img
                              src="/images/profile_photo.jpg"
                              alt="User avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-[#353839] rounded-2xl rounded-tl-none p-2.5 max-w-[80%]">
                            <p className="text-xs">
                              Great to hear! Have you tried the voice features yet? They're really impressive.
                            </p>
                            <p className="text-[10px] opacity-70 mt-1 text-right">10:27 AM</p>
                          </div>
                        </div>
                      </div>

                      {/* AI Suggestions */}
                      <div className="mt-2 bg-black/60 p-2 rounded-xl border border-[#353839]">
                        <p className="text-xs text-[#FAFAFA] mb-1.5 flex items-center">
                          <IconWrapper icon={Sparkles} size={10} className="mr-1" /> AI Suggestions
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                          <div className="bg-[#353839]/50 px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap">
                            Not yet, I'll try them now!
                          </div>
                          <div className="bg-[#353839]/50 px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap">
                            What's your favorite feature?
                          </div>
                          <div className="bg-[#353839]/50 px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap">
                            Thanks for the recommendation
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 pb-5 bg-[#353839] border-t border-gray-800">
                      <div className="flex flex-col gap-2">
                        <div className="flex-1 text-xs text-gray-400 px-2 py-1.5">Type a message...</div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                              <IconWrapper icon={Paperclip} size={14} className="text-black" />
                            </button>
                            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                              <IconWrapper icon={Camera} size={14} className="text-black" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                              <IconWrapper icon={Mic} size={14} className="text-black" />
                            </button>
                            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                              <IconWrapper icon={AudioWaveform} size={14} className="text-black" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-[#FAFAFA]/20 rounded-full"></div>
                  </div>
                </div>

                {/* Reflections and highlights */}
                <div className="absolute top-[5%] left-[10%] w-[80%] h-[40%] bg-gradient-to-br from-[#FAFAFA]/5 to-transparent rounded-full blur-md"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FAFAFA]/20 rounded-full blur-[80px]"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,250,250,0.1),transparent_70%)]"></div>

        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#353839]/50 backdrop-blur-sm rounded-full mb-4">
              <span className="text-[#FAFAFA]/80 font-medium text-sm">Core Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Designed with modern features to make your communication seamless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Real-time Messaging",
                description: "Send and receive messages instantly with no delay or refresh needed.",
              },
              {
                icon: Shield,
                title: "End-to-End Encryption",
                description: "Your conversations are secure and private with our advanced encryption.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance ensures smooth experience even on slow connections.",
              },
              {
                icon: Globe,
                title: "Cross-Platform",
                description: "Available on all your devices - desktop, mobile, and web.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] p-8 rounded-2xl border border-[#353839] hover:border-[#FAFAFA]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FAFAFA]/10 group"
              >
                <div className="bg-black/50 p-4 inline-block rounded-xl mb-4 group-hover:bg-[#FAFAFA]/10 transition-colors duration-300">
                  <IconWrapper icon={feature.icon} className="h-10 w-10 text-[#FAFAFA]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Features Section */}
      <section id="ai" className="py-24 relative bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(250,250,250,0.1),transparent_60%)]"></div>

        <motion.div
          ref={aiRef}
          initial="hidden"
          animate={aiInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#353839]/50 backdrop-blur-sm rounded-full mb-4">
              <span className="text-[#FAFAFA]/80 font-medium text-sm">AI-Powered</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Smart Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leverage the power of artificial intelligence to enhance your messaging experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mic,
                title: "Speech-to-Text",
                description: "Dictate your messages naturally with our advanced voice recognition technology.",
              },
              {
                icon: MessageSquareText,
                title: "Smart Replies",
                description: "Get intelligent reply suggestions based on conversation context.",
              },
              {
                icon: BrainCircuit,
                title: "AI Assistant",
                description: "Ask questions, get recommendations, and automate tasks within your chats.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] p-8 rounded-2xl border border-[#353839] hover:border-[#FAFAFA]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FAFAFA]/10 group"
              >
                <div className="bg-black/50 p-4 inline-block rounded-xl mb-4 group-hover:bg-[#FAFAFA]/10 transition-colors duration-300">
                  <IconWrapper icon={feature.icon} className="h-10 w-10 text-[#FAFAFA]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* AI Feature Showcase */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mt-20">
            <div className="lg:w-1/2">
              <motion.div variants={fadeIn} className="relative">
                {/* Feature illustration or screenshot */}
                <div className="bg-gradient-to-br from-[#151515] to-[#0A0A0A] p-6 rounded-2xl border border-[#353839] overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#353839] flex items-center justify-center">
                      <IconWrapper icon={Mic} className="h-5 w-5 text-[#FAFAFA]" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold">Speech-to-Text</h4>
                      <p className="text-sm text-gray-400">Tap the mic and start speaking</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[#353839]/30 p-3 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#FAFAFA]/20 flex items-center justify-center mr-2">
                          <IconWrapper icon={Mic} className="h-4 w-4 text-[#FAFAFA]" />
                        </div>
                        <div className="text-sm">
                          <div className="flex items-center">
                            <span className="text-[#FAFAFA] mr-2">Listening...</span>
                            <div className="flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-[#FAFAFA] animate-pulse"
                                  style={{ animationDelay: `${i * 0.2}s` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#353839]/30 p-3 rounded-xl">
                      <p className="text-sm text-gray-300">
                        "Let's schedule a meeting for tomorrow at 2 PM to discuss the project updates."
                      </p>
                    </div>

                    <div className="bg-[#FAFAFA]/10 p-3 rounded-xl border border-[#FAFAFA]/20">
                      <div className="flex items-center mb-2">
                        <IconWrapper icon={Sparkles} className="h-4 w-4 text-[#FAFAFA] mr-2" />
                        <span className="text-xs text-[#FAFAFA]">AI Suggestions</span>
                      </div>
                      <p className="text-sm mb-2">How would you like to respond?</p>
                      <div className="flex flex-wrap gap-2">
                        <button className="bg-[#353839] text-[#FAFAFA] text-xs px-3 py-1 rounded-full">
                          I'll be there
                        </button>
                        <button className="bg-[#353839] text-[#FAFAFA] text-xs px-3 py-1 rounded-full">
                          Can we make it 3 PM?
                        </button>
                        <button className="bg-[#353839] text-[#FAFAFA] text-xs px-3 py-1 rounded-full">
                          What's the agenda?
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FAFAFA]/10 rounded-full blur-[50px]"></div>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Speak Naturally, <span className="text-[#FAFAFA]">Type Less</span>
                </h3>
                <p className="text-gray-300 mb-6">
                  Our advanced speech recognition technology understands natural language, allowing you to dictate
                  messages, commands, and even detect actionable items in your speech.
                </p>

                <ul className="space-y-4">
                  {[
                    "Dictate messages with high accuracy voice recognition",
                    "Supports multiple languages and accents",
                    "Automatically detects and suggests actions from your speech",
                    "Works seamlessly in noisy environments",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-[#FAFAFA]/20 p-1 rounded-full mr-3 mt-1">
                        <div className="bg-[#FAFAFA] w-3 h-3 rounded-full"></div>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button className="bg-[#353839] hover:bg-[#454545] text-[#FAFAFA] px-6 py-2 rounded-xl">
                    Learn More About AI Features
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,250,250,0.15),transparent_70%)]"></div>

        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-gradient-to-r from-[#151515]/80 to-[#202020]/80 p-12 md:p-16 rounded-3xl border border-[#353839] text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Smarter Messaging?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Try our free chat app with AI-powered features and see how it transforms your communication experience.
            </p>
            <div className="flex justify-center">
              <Button className="bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black px-8 py-6 text-lg rounded-xl">
                Get Started
              </Button>
            </div>
            <p className="text-gray-400 mt-6 text-sm">Start messaging in seconds.</p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}