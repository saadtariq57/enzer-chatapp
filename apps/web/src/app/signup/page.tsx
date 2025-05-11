"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Lock, Mail, User, UserCheck, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Username validation
  useEffect(() => {
    if (!username) {
      setUsernameError("")
      return
    }
    
    if (username.includes(" ")) {
      setUsernameError("Username cannot contain spaces")
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError("Username can only contain letters, numbers and underscores")
    } else if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters")
    } else {
      setUsernameError("")
    }
  }, [username])

  // Password strength indicators
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0
    
    let strength = 0
    
    if (pass.length > 8) strength += 1
    if (/[A-Z]/.test(pass)) strength += 1
    if (/[0-9]/.test(pass)) strength += 1
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1
    
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  
  const getStrengthText = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength === 1) return "Weak"
    if (passwordStrength === 2) return "Fair"
    if (passwordStrength === 3) return "Good"
    return "Strong"
  }
  
  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-transparent"
    if (passwordStrength === 1) return "bg-red-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength === 3) return "bg-green-400"
    return "bg-green-500"
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (usernameError) {
      alert("Please fix the username errors")
      return
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // Handle signup logic here
      console.log("Signup attempt with:", { fullName, username, email, password })
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
            
            <h2 className="text-5xl font-bold mb-6 leading-tight">Start your messaging journey</h2>
            <p className="text-xl text-[#FAFAFA]/70 mb-8">
              Join the Enzer community and experience a new level of secure, intelligent communication.
            </p>
            
            <div className="bg-[#353839]/30 backdrop-blur-sm border border-[#FAFAFA]/10 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Why join Enzer?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#FAFAFA]/20 flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-3 w-3 text-[#FAFAFA]" />
                  </div>
                  <span className="text-[#FAFAFA]/80">End-to-end encrypted messaging for privacy</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#FAFAFA]/20 flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-3 w-3 text-[#FAFAFA]" />
                  </div>
                  <span className="text-[#FAFAFA]/80">Smart AI features to enhance conversations</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#FAFAFA]/20 flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-3 w-3 text-[#FAFAFA]" />
                  </div>
                  <span className="text-[#FAFAFA]/80">Seamless experience across all your devices</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Form */}
        <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md z-10 my-8 md:my-0"
          >
            <div className="bg-[#101010]/70 backdrop-blur-md border border-[#FAFAFA]/10 rounded-2xl p-8 shadow-xl">
              <div className="mb-6 text-center md:text-left">
                <h1 className="text-3xl font-bold">Join Enzer</h1>
                <p className="text-[#FAFAFA]/60 mt-2">Create your account</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 h-4 w-4" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 h-4 w-4" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`pl-10 bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20 ${
                        usernameError ? "border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {usernameError && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{usernameError}</span>
                    </div>
                  )}
                  <p className="text-xs text-[#FAFAFA]/60 mt-1">
                    Username can only contain letters, numbers, and underscores.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
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
                  <Label htmlFor="password">Password</Label>
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
                  
                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex space-x-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 w-10 rounded-full ${i < passwordStrength ? getStrengthColor() : "bg-[#FAFAFA]/10"}`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs ${
                          passwordStrength === 1 ? "text-red-500" :
                          passwordStrength === 2 ? "text-yellow-500" :
                          passwordStrength === 3 ? "text-green-400" :
                          passwordStrength === 4 ? "text-green-500" : ""
                        }`}>
                          {getStrengthText()}
                        </span>
                      </div>
                      <p className="text-xs text-[#FAFAFA]/60">
                        Password should have at least 8 characters, include uppercase, numbers and symbols
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20 ${
                        confirmPassword && password !== confirmPassword ? "border-red-500" : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 hover:text-[#FAFAFA] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>Passwords do not match</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="border-[#FAFAFA]/30 data-[state=checked]:bg-[#FAFAFA] data-[state=checked]:text-black"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none text-[#FAFAFA]/70 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#FAFAFA] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#FAFAFA] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black font-medium py-6 text-base rounded-xl mt-6"
                  disabled={isLoading || !agreedToTerms || (confirmPassword && password !== confirmPassword) || !!usernameError}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Create Account
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
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#FAFAFA] hover:underline">
                    Sign in
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