"use client"

import { useState, useEffect } from "react"
import { Home, Upload, Target, FileText, Brain, TrendingUp, MessageCircle, Menu } from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-2xl font-semibold text-gray-900 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => setActiveSection("home")}
          >
            Study<span className="text-teal-600">AI</span>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${
                  activeSection === item.id
                    ? "bg-teal-100 text-teal-700"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 hover:scale-105 transition-transform duration-200">
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-teal-100 text-teal-700"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
