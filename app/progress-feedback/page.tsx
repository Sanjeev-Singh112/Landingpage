"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Home,
  TrendingUp,
  Calendar,
  Target,
  BookOpen,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface StudySession {
  id: string
  subject: string
  duration: number
  date: string
  score?: number
  type: "study" | "quiz" | "review"
}

interface WeeklyGoal {
  id: string
  title: string
  target: number
  current: number
  unit: string
}

const studySessions: StudySession[] = [
  { id: "1", subject: "Mathematics", duration: 120, date: "2024-01-15", score: 85, type: "study" },
  { id: "2", subject: "Physics", duration: 90, date: "2024-01-15", score: 92, type: "quiz" },
  { id: "3", subject: "Chemistry", duration: 75, date: "2024-01-14", type: "review" },
  { id: "4", subject: "Mathematics", duration: 105, date: "2024-01-14", score: 78, type: "study" },
  { id: "5", subject: "Biology", duration: 60, date: "2024-01-13", score: 88, type: "quiz" },
  { id: "6", subject: "Physics", duration: 135, date: "2024-01-13", type: "study" },
  { id: "7", subject: "Chemistry", duration: 80, date: "2024-01-12", score: 95, type: "quiz" },
]

const weeklyGoals: WeeklyGoal[] = [
  { id: "1", title: "Study Hours", target: 20, current: 16.5, unit: "hours" },
  { id: "2", title: "Quiz Attempts", target: 10, current: 8, unit: "quizzes" },
  { id: "3", title: "Notes Uploaded", target: 15, current: 12, unit: "files" },
  { id: "4", title: "Average Score", target: 85, current: 87, unit: "%" },
]

export default function ProgressFeedbackApp() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "semester">("week")

  const handleBackToMain = () => {
    window.open("/", "_blank")
  }

  const totalStudyTime = studySessions.reduce((acc, session) => acc + session.duration, 0)
  const averageScore = Math.round(
    studySessions.filter((s) => s.score).reduce((acc, s) => acc + (s.score || 0), 0) /
      studySessions.filter((s) => s.score).length,
  )
  const totalSessions = studySessions.length
  const subjectDistribution = studySessions.reduce(
    (acc, session) => {
      acc[session.subject] = (acc[session.subject] || 0) + session.duration
      return acc
    },
    {} as Record<string, number>,
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-blue-100 text-blue-700"
      case "review":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-teal-100 text-teal-700"
    }
  }

  const getGoalStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return { color: "text-green-600", status: "Completed" }
    if (percentage >= 80) return { color: "text-teal-600", status: "On Track" }
    if (percentage >= 60) return { color: "text-yellow-600", status: "Behind" }
    return { color: "text-red-600", status: "Needs Attention" }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToMain}
                className="text-gray-600 hover:text-teal-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Main
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Progress Feedback</h1>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleBackToMain} className="text-gray-600 hover:text-teal-600">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Your Learning
            <span className="text-teal-600 font-medium"> Progress</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Track your study habits, monitor your performance, and get personalized insights to optimize your learning
            journey.
          </p>

          {/* Period Selector */}
          <div className="flex justify-center space-x-4 mb-8">
            {[
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" },
              { key: "semester", label: "This Semester" },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={selectedPeriod === key ? "default" : "outline"}
                onClick={() => setSelectedPeriod(key as any)}
                className={selectedPeriod === key ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <Card className="border-teal-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{Math.round(totalStudyTime / 60)}h</div>
              <div className="text-sm text-gray-500">Total Study Time</div>
              <div className="text-xs text-teal-600 mt-1">+15% from last week</div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{averageScore}%</div>
              <div className="text-sm text-gray-500">Average Score</div>
              <div className="text-xs text-green-600 mt-1">+3% improvement</div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalSessions}</div>
              <div className="text-sm text-gray-500">Study Sessions</div>
              <div className="text-xs text-blue-600 mt-1">2 more than target</div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">7</div>
              <div className="text-sm text-gray-500">Day Streak</div>
              <div className="text-xs text-purple-600 mt-1">Personal best!</div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Goals */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Card className="border-teal-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-teal-600" />
                <span>Weekly Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {weeklyGoals.map((goal) => {
                  const percentage = Math.min((goal.current / goal.target) * 100, 100)
                  const status = getGoalStatus(goal.current, goal.target)
                  return (
                    <div key={goal.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{goal.title}</h4>
                        <Badge className={`${status.color} bg-transparent border-current`}>{status.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {goal.current} / {goal.target} {goal.unit}
                          </span>
                          <span className="font-medium text-gray-900">{Math.round(percentage)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          {/* Subject Distribution */}
          <Card className="border-teal-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-teal-600" />
                <span>Study Time by Subject</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(subjectDistribution).map(([subject, minutes]) => {
                  const percentage = (minutes / totalStudyTime) * 100
                  const hours = Math.round((minutes / 60) * 10) / 10
                  return (
                    <div key={subject} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{subject}</span>
                        <span className="text-sm text-gray-600">
                          {hours}h ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card className="border-teal-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                <span>Performance Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 bg-teal-50 rounded-lg">
                  <Activity className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Trending Upward!</h4>
                  <p className="text-sm text-gray-600">
                    Your performance has improved by 12% over the last two weeks. Keep up the excellent work!
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">+5%</div>
                    <div className="text-xs text-green-700">Quiz Scores</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">+2h</div>
                    <div className="text-xs text-blue-700">Study Time</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Card className="border-teal-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span>Recent Study Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studySessions.slice(0, 5).map((session, index) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.subject}</h4>
                        <p className="text-sm text-gray-500">{session.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getTypeColor(session.type)}>{session.type}</Badge>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{Math.round(session.duration / 60)}h</div>
                        {session.score && <div className="text-sm text-teal-600">{session.score}%</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Recommendations */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
          <Card className="bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Zap className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Insights & Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Best Study Time</h4>
                  <p className="text-sm text-gray-600">You perform 23% better during morning sessions (9-11 AM)</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Focus Area</h4>
                  <p className="text-sm text-gray-600">
                    Consider spending more time on Chemistry to balance your subjects
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Study Pattern</h4>
                  <p className="text-sm text-gray-600">Your 45-minute sessions show the highest retention rates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
