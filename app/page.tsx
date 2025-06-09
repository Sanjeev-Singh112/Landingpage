"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Upload,
  Target,
  FileText,
  Brain,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  Calculator,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import NotesUploader from "@/components/notes-uploader"

const features = [
  {
    icon: Upload,
    title: "Notes Uploader",
    description: "Upload and organize your study materials with intelligent categorization",
    color: "bg-mint-100",
  },
  {
    icon: Target,
    title: "Goal Setter",
    description: "Set and track your academic goals with personalized milestones",
    color: "bg-mint-50",
  },
  {
    icon: FileText,
    title: "Summariser",
    description: "Generate concise summaries from your notes and documents",
    color: "bg-mint-100",
  },
  {
    icon: Brain,
    title: "Quiz Generator",
    description: "Create custom quizzes from your study materials automatically",
    color: "bg-mint-50",
  },
  {
    icon: TrendingUp,
    title: "Progress Feedback",
    description: "Weekly insights and analytics on your learning journey",
    color: "bg-mint-100",
  },
  {
    icon: MessageCircle,
    title: "AI Companion",
    description: "Your personal study assistant available 24/7",
    color: "bg-mint-50",
  },
  {
    icon: CheckCircle,
    title: "Notes Corrector",
    description: "Intelligent proofreading and enhancement suggestions",
    color: "bg-mint-100",
  },
  {
    icon: Calculator,
    title: "Paper Solver",
    description: "Step-by-step solutions for complex problems",
    color: "bg-mint-50",
  },
  {
    icon: Heart,
    title: "Mood Tracker",
    description: "Monitor your well-being and optimize study sessions",
    color: "bg-mint-100",
  },
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === "home" && (
        <>
          {/* Hero Section */}
          <motion.section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mint-50 to-white" />
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
              <motion.h1
                className="text-6xl md:text-8xl font-light text-gray-900 mb-6 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Study
                <span className="text-mint-600 font-medium"> Smarter</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transform your learning experience with AI-powered tools designed for modern students
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-mint-600 hover:bg-mint-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                  onClick={() => setActiveSection("notes-uploader")}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-20 right-20 w-32 h-32 bg-mint-200 rounded-full opacity-20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-32 left-16 w-24 h-24 bg-mint-300 rounded-full opacity-30"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.section>

          {/* Features Section */}
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-light text-gray-900 mb-6">
                  Everything you need to
                  <span className="text-mint-600 font-medium"> excel</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Comprehensive tools designed to enhance every aspect of your learning journey
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer"
                    onClick={() => feature.title === "Notes Uploader" && setActiveSection("notes-uploader")}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      <CardContent className="p-8">
                        <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                          <feature.icon className="w-8 h-8 text-mint-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 bg-gradient-to-r from-mint-50 to-mint-100">
            <div className="max-w-4xl mx-auto text-center px-6">
              <motion.h2
                className="text-5xl font-light text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Ready to transform your studies?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of students already achieving their academic goals
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Start Free Trial
                </Button>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {activeSection === "notes-uploader" && <NotesUploader />}
    </div>
  )
}
