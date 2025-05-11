"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, setTheme } = useTheme()
  
  // Sync theme with our app state
  useEffect(() => {
    // This will be used by the dashboard page to sync its internal state
    window.localStorage.setItem('enzer-theme', theme || 'dark')
  }, [theme])

  return (
    <div className="h-screen w-full overflow-hidden">
      {children}
    </div>
  )
}
