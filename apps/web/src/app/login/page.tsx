"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log("Login attempt with:", { email, password })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-[#FAFAFA] flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,250,250,0.15),transparent_50%)]"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#FAFAFA]/5 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#FAFAFA]/10 blur-[120px]"></div>

        {/* Left Column - Branding */}
        <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <div className="flex items-center mb-8">
              <div className="flex items-center mr-3">
                <img
                  src="/images/logo.png"
                  alt="Enzer Logo"
                  className="h-12 w-auto"
                  style={{ maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <h1 className="text-4xl font-bold">Enzer</h1>
            </div>
            
            <h2 className="text-5xl font-bold mb-6 leading-tight">Connect with the world securely</h2>
            <p className="text-xl text-[#FAFAFA]/70 mb-8">
              Experience the next generation of messaging with our sleek, secure, and intelligent chat platform.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#FAFAFA] rounded-full mr-2"></div>
                <span className="text-[#FAFAFA]/70">End-to-end encryption</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#FAFAFA] rounded-full mr-2"></div>
                <span className="text-[#FAFAFA]/70">AI-powered features</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#FAFAFA] rounded-full mr-2"></div>
                <span className="text-[#FAFAFA]/70">Modern user interface</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Form */}
        <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md z-10"
          >
            <div className="bg-[#101010]/70 backdrop-blur-md border border-[#FAFAFA]/10 rounded-2xl p-8 shadow-xl">
              <div className="mb-6 text-center md:text-left">
                <h1 className="text-3xl font-bold">Welcome</h1>
                <p className="text-[#FAFAFA]/60 mt-2">Sign in to your account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-[#FAFAFA]/60 hover:text-[#FAFAFA] transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 hover:text-[#FAFAFA] transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black font-medium py-6 text-base rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>

                <div className="relative flex items-center justify-center my-6">
                  <Separator className="absolute w-full bg-[#FAFAFA]/10" />
                  <span className="relative px-3 bg-[#101010] text-[#FAFAFA]/60 text-sm">Or continue with</span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#FAFAFA]/10 hover:bg-[#FAFAFA]/5 text-[#FAFAFA] hover:text-[#FAFAFA] py-6 rounded-xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="fill-current">
                    <path
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-[#FAFAFA]/60">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-[#FAFAFA] hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      

    </div>
  )
} 