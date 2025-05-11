"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      setOtpSent(true)
      startResendTimer()
      // Handle OTP sending logic here
      console.log("OTP sent to:", email)
    }, 1500)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }
    
    if (value && !/^\d+$/.test(value)) {
      return // Only allow digits
    }
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setVerifying(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setVerifying(false)
      setVerified(true)
      // Handle OTP verification logic here
      console.log("OTP verified:", otp.join(''))
    }, 1500)
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // Handle password reset logic here
      console.log("Password reset successful")
      window.location.href = "/login"
    }, 1500)
  }

  const startResendTimer = () => {
    setResendDisabled(true)
    setCountdown(60)
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setResendDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resendOtp = () => {
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      startResendTimer()
      // Handle OTP resending logic here
      console.log("OTP resent to:", email)
    }, 1500)
  }

  return (
    <div className="flex-grow flex items-center justify-center p-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,250,250,0.15),transparent_50%)]"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#FAFAFA]/5 blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#FAFAFA]/10 blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#101010]/70 backdrop-blur-md border border-[#FAFAFA]/10 rounded-2xl p-8 shadow-xl">
          <div className="mb-6">
            <Link href="/login" className="inline-flex items-center text-[#FAFAFA]/60 hover:text-[#FAFAFA] mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center mr-3">
                  <img
                    src="/images/logo.png"
                    alt="Enzer Logo"
                    className="h-8 w-auto"
                    style={{ maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <h1 className="text-2xl font-bold">Enzer</h1>
              </div>
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-[#FAFAFA]/60 mt-2">
                {verified
                  ? "Create a new password"
                  : otpSent
                    ? "Enter the 6-digit code sent to your email"
                    : "Enter your email to receive a verification code"}
              </p>
            </div>
          </div>

          {!otpSent ? (
            <form onSubmit={handleOtpRequest} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
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

              <Button
                type="submit"
                className="w-full bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black font-medium py-6 text-base rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          ) : verified ? (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 h-4 w-4" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAFAFA]/40 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black font-medium py-6 text-base rounded-xl"
                disabled={isLoading || newPassword !== confirmPassword}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Resetting...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="otp-0" className="text-sm font-medium">Verification Code</label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg bg-[#353839]/50 border-[#FAFAFA]/10 focus:border-[#FAFAFA]/30 focus:ring-[#FAFAFA]/20"
                      required
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black font-medium py-6 text-base rounded-xl"
                disabled={verifying || otp.some(digit => digit === '')}
              >
                {verifying ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </Button>
              
              <div className="text-center mt-4">
                {resendDisabled ? (
                  <p className="text-[#FAFAFA]/60">
                    Resend code in {countdown}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={isLoading}
                    className="text-[#FAFAFA] hover:underline focus:outline-none"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-[#FAFAFA]/60">
              Remember your password?{" "}
              <Link href="/login" className="text-[#FAFAFA] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 