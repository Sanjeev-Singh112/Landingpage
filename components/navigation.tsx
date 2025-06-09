"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, Upload, Target, FileText, Brain, TrendingUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "notes-uploader", label: "Upload", icon: Upload },
  { id: "goals", label: "Goals", icon: Target },
  { id: "summarise", label: "Summarise", icon: FileText },
  { id: "quiz", label: "Quiz", icon: Brain },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "chat", label: "Chat", icon: MessageCircle },
]

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-semibold text-gray-900 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveSection("home")}
          >
            Study<span className="text-mint-600">AI</span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-mint-100 text-mint-700"
                    : "text-gray-600 hover:text-mint-600 hover:bg-mint-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
            </Button>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-mint-600 hover:bg-mint-700 text-white rounded-full px-6">Sign Up</Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
