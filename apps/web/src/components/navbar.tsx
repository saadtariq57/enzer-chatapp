"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

type NavItem = {
  name: string
  type: "scroll" | "link"
  target: string
}

const navItems: NavItem[] = [
  { name: "Home", type: "scroll", target: "hero" },
  { name: "Features", type: "scroll", target: "features" },
  { name: "AI", type: "scroll", target: "ai" },
  { name: "About", type: "link", target: "/about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()
  const isHomePage = pathname === "/"

  // Handle scroll effect - client-side only
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Only update active section when on home page
      if (isHomePage) {
        const sections = ["hero", "features", "ai"]
        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element && window.scrollY >= element.offsetTop - 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  // Reset active section when navigating away from home page
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("")
    }
  }, [isHomePage])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  // Handle nav item click
  const handleNavItemClick = (item: NavItem) => {
    if (item.type === "scroll") {
      if (pathname !== "/") {
        // If we're not on the home page, navigate to home with the section as a hash
        router.push(`/#${item.target}`)
      } else {
        // If already on home page, just scroll
        scrollToSection(item.target)
      }
    }
    // For "link" type, Next.js Link component will handle navigation
  }

  // Function to determine if a nav item should be highlighted
  const isNavItemActive = (item: NavItem) => {
    if (item.type === "scroll") {
      return isHomePage && activeSection === item.target
    } else {
      return pathname === item.target
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-black/90 backdrop-blur-md border-b border-[#353839]" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 z-50 cursor-pointer"
            onClick={() => {
              if (pathname !== "/") {
                router.push("/")
              } else {
                scrollToSection("hero")
              }
            }}
          >
            <div className="flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Enzer Logo"
                className="h-7 w-auto"
                style={{ maxWidth: "100%", objectFit: "contain" }}
              />
            </div>
            <span className="text-xl font-bold text-[#FAFAFA]">Enzer</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) =>
              item.type === "scroll" ? (
                <button
                  key={item.target}
                  onClick={() => handleNavItemClick(item)}
                  className="relative px-4 py-2 text-[#FAFAFA]/80 hover:text-[#FAFAFA] transition-colors"
                >
                  {item.name}
                  {isNavItemActive(item) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FAFAFA]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ) : (
                <Link
                  key={item.target}
                  href={item.target}
                  className="relative px-4 py-2 text-[#FAFAFA]/80 hover:text-[#FAFAFA] transition-colors"
                >
                  {item.name}
                  {isNavItemActive(item) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FAFAFA]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ),
            )}
          </div>

          {/* Login Button */}
          <div className="flex items-center z-50">
            <Button className="bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black px-4 py-1.5 text-sm font-medium rounded-[8px]">
              Login
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
