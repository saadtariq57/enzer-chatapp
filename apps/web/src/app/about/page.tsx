"use client"

import Link from "next/link"
import { ArrowLeft, MessageCircle, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Footer } from "@/components/layout/Footer"

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

// Team members data
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex has over 15 years of experience in tech and previously founded two successful startups.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sarah is an AI expert with a PhD in Computer Science and previously worked at leading tech companies.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Design",
    bio: "Michael brings 10+ years of UX/UI design experience and has designed products used by millions.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Priya Patel",
    role: "Head of Product",
    bio: "Priya has led product teams at several tech companies and specializes in communication tools.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

// Company values
const values = [
  {
    title: "User Privacy First",
    description: "We believe in building products that respect and protect user privacy at all costs.",
  },
  {
    title: "Thoughtful Design",
    description: "We create intuitive, accessible, and beautiful experiences that delight our users.",
  },
  {
    title: "Responsible AI",
    description: "We develop AI features that are transparent, fair, and put humans in control.",
  },
  {
    title: "Global Accessibility",
    description: "We're committed to making our platform available and accessible to everyone worldwide.",
  },
]

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-[#FAFAFA] overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,250,250,0.15),transparent_50%)]"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#FAFAFA]/5 blur-[100px]"></div>

        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <Link
            href="/"
            className="inline-flex items-center text-[#FAFAFA]/80 hover:text-[#FAFAFA] mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-[#FAFAFA]">Enzer</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're on a mission to transform how people communicate by creating the most intuitive, secure, and
              intelligent messaging platform on the planet.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 relative">
        <motion.div
          ref={storyRef}
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="w-full h-[400px] bg-gradient-to-br from-[#151515] to-[#0A0A0A] rounded-2xl overflow-hidden flex items-center justify-center border border-[#353839]">
                  <MessageCircle className="w-24 h-24 text-[#FAFAFA]/20" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FAFAFA]/10 rounded-full blur-[50px]"></div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 bg-[#353839]/50 backdrop-blur-sm rounded-full mb-4">
                <span className="text-[#FAFAFA]/80 font-medium text-sm">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">From Idea to Innovation</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Enzer began in 2022 when our founders recognized a gap in the messaging landscape. While there were
                  many communication tools available, none seamlessly integrated advanced AI capabilities while
                  maintaining a focus on user privacy and intuitive design.
                </p>
                <p>
                  What started as a small project among friends quickly grew into something bigger. We assembled a team
                  of experts in AI, design, and security to build a messaging platform that would set new standards for
                  what communication tools could be.
                </p>
                <p>
                  Today, we're a growing team passionate about creating technology that brings people together and makes
                  communication more natural, efficient, and enjoyable.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,250,250,0.1),transparent_70%)]"></div>

        <motion.div
          ref={teamRef}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#353839]/50 backdrop-blur-sm rounded-full mb-4">
              <span className="text-[#FAFAFA]/80 font-medium text-sm">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the People Behind Enzer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're a diverse team of designers, engineers, and AI specialists united by our passion for creating
              exceptional communication experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] rounded-2xl border border-[#353839] overflow-hidden group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[#FAFAFA]/60 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <motion.div
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#353839]/50 backdrop-blur-sm rounded-full mb-4">
              <span className="text-[#FAFAFA]/80 font-medium text-sm">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Stand For</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] p-8 rounded-2xl border border-[#353839]"
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(250,250,250,0.1),transparent_60%)]"></div>

        <motion.div
          ref={contactRef}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10"
        >
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-gradient-to-r from-[#151515]/80 to-[#202020]/80 p-12 md:p-16 rounded-3xl border border-[#353839] text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Have questions about Chat App? We'd love to hear from you. Reach out to our team through any of the
              channels below.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="mailto:hello@chatapp.com"
                className="flex items-center gap-2 px-6 py-3 bg-[#151515] rounded-xl border border-[#353839] hover:border-[#FAFAFA]/30 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@chatapp.com</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-[#151515] rounded-xl border border-[#353839] hover:border-[#FAFAFA]/30 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>@ChatApp</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-[#151515] rounded-xl border border-[#353839] hover:border-[#FAFAFA]/30 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-[#151515] rounded-xl border border-[#353839] hover:border-[#FAFAFA]/30 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="mt-8">
              <Button className="bg-[#FAFAFA] hover:bg-[#FAFAFA]/90 text-black px-8 py-6 text-lg rounded-xl">
                Join Our Team
              </Button>
            </div>
            <p className="text-gray-400 mt-4 text-sm">We're always looking for talented people to join us</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
