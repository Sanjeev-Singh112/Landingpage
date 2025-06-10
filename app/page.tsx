"use client"

import { useState } from "react"
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
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/navigation"

const features = [
  {
    icon: Upload,
    title: "Notes Uploader",
    description: "Upload and organize your study materials with intelligent categorization",
    color: "bg-teal-100",
    route: "/notes-uploader",
    hasExternalLink: true,
  },
  {
    icon: Target,
    title: "Goal Setter",
    description: "Set and track your academic goals with personalized milestones",
    color: "bg-teal-50",
    route: "/goal-setter",
    hasExternalLink: true,
  },
  {
    icon: FileText,
    title: "Summariser",
    description: "Generate concise summaries from your notes and documents",
    color: "bg-teal-100",
    route: "/summariser",
    hasExternalLink: true,
  },
  {
    icon: Brain,
    title: "Quiz Generator",
    description: "Create custom quizzes from your study materials automatically",
    color: "bg-teal-50",
    route: "/quiz-generator",
    hasExternalLink: true,
  },
  {
    icon: TrendingUp,
    title: "Progress Feedback",
    description: "Weekly insights and analytics on your learning journey",
    color: "bg-teal-100",
    route: "/progress-feedback",
    hasExternalLink: true,
  },
  {
    icon: MessageCircle,
    title: "AI Companion",
    description: "Your personal study assistant available 24/7",
    color: "bg-teal-50",
    route: "/ai-companion",
    hasExternalLink: true,
  },
  {
    icon: CheckCircle,
    title: "Notes Corrector",
    description: "Intelligent proofreading and enhancement suggestions",
    color: "bg-teal-100",
    route: "/notes-corrector",
    hasExternalLink: true,
  },
  {
    icon: Calculator,
    title: "Paper Solver",
    description: "Step-by-step solutions for complex problems",
    color: "bg-teal-50",
    route: "/paper-solver",
    hasExternalLink: true,
  },
  {
    icon: Heart,
    title: "Mood Tracker",
    description: "Monitor your well-being and optimize study sessions",
    color: "bg-teal-100",
    route: "/mood-tracker",
    hasExternalLink: true,
  },
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  const handleFeatureClick = (route: string) => {
    window.open(route, "_blank")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 to-white">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Study
            <span className="text-teal-600 font-medium"> Smarter</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Transform your learning experience with AI-powered tools designed for modern students
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => handleFeatureClick("/notes-uploader")}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-bounce" />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-teal-300 rounded-full opacity-30 animate-pulse" />
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-gray-900 mb-6">
              Everything you need to
              <span className="text-teal-600 font-medium"> excel</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to enhance every aspect of your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                onClick={() => handleFeatureClick(feature.route)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full group-hover:shadow-teal-100">
                  <CardContent className="p-8 relative">
                    {feature.hasExternalLink && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-5 h-5 text-teal-600" />
                      </div>
                    )}
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-teal-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    {feature.hasExternalLink && (
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm text-teal-600 font-medium">Open dedicated app →</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-light text-gray-900 mb-6">Ready to transform your studies?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of students already achieving their academic goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => handleFeatureClick("/notes-uploader")}
            >
              Try Notes Uploader
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
