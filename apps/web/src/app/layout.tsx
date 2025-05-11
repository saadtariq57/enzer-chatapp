"use client"

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import NextTopLoader from "nextjs-toploader"
import { Footer } from "@/components/layout/Footer"

// export const metadata = {
//   title: "Enzer",
//   description: "A modern chat application",
//   manifest: "/manifest.json",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "black-translucent",
//     title: "Enzer",
//   },
//   generator: 'v0.dev'
// }

// export const viewport = {
//   themeColor: "#000000",
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  
  // Use state and effect to handle client-side rendering
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className=" bg-black text-[#FAFAFA] font-['Inter',sans-serif] flex flex-col">
        <NextTopLoader color="#FAFAFA" height={3} showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {mounted && !isDashboard && <Navbar />}
          <main className="flex-grow flex flex-col min-h-screen">{children}</main>
          {mounted && !isDashboard && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  )
}
