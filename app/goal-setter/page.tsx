"use client"

import { useState } from "react"
import { ArrowLeft, Home, Target, Plus, Calendar, Trophy, TrendingUp, CheckCircle, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Goal {
  id: string
  title: string
  description: string
  category: string
  targetDate: string
  progress: number
  status: "active" | "completed" | "paused"
  milestones: Milestone[]
}

interface Milestone {
  id: string
  title: string
  completed: boolean
  dueDate: string
}

const sampleGoals: Goal[] = [
  {
    id: "1",
    title: "Master Calculus",
    description: "Complete all calculus topics with 90% understanding",
    category: "Mathematics",
    targetDate: "2024-06-15",
    progress: 75,
    status: "active",
    milestones: [
      { id: "1", title: "Complete derivatives", completed: true, dueDate: "2024-03-01" },
      { id: "2", title: "Master integrals", completed: true, dueDate: "2024-04-01" },
      { id: "3", title: "Practice applications", completed: false, dueDate: "2024-05-01" },
    ],
  },
  {
    id: "2",
    title: "Learn Spanish",
    description: "Achieve conversational fluency in Spanish",
    category: "Languages",
    targetDate: "2024-08-30",
    progress: 45,
    status: "active",
    milestones: [
      { id: "4", title: "Basic vocabulary (500 words)", completed: true, dueDate: "2024-02-15" },
      { id: "5", title: "Grammar fundamentals", completed: false, dueDate: "2024-04-15" },
      { id: "6", title: "Conversation practice", completed: false, dueDate: "2024-07-15" },
    ],
  },
]

export default function GoalSetterApp() {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals)
  const [showNewGoalForm, setShowNewGoalForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: "",
  })

  const handleBackToMain = () => {
    window.open("/", "_blank")
  }

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category || "General",
        targetDate: newGoal.targetDate,
        progress: 0,
        status: "active",
        milestones: [],
      }
      setGoals([...goals, goal])
      setNewGoal({ title: "", description: "", category: "", targetDate: "" })
      setShowNewGoalForm(false)
    }
  }

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map((milestone) =>
            milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone,
          )
          const completedCount = updatedMilestones.filter((m) => m.completed).length
          const progress = (completedCount / updatedMilestones.length) * 100
          return { ...goal, milestones: updatedMilestones, progress }
        }
        return goal
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "paused":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-teal-100 text-teal-700"
    }
  }

  const activeGoals = goals.filter((g) => g.status === "active")
  const completedGoals = goals.filter((g) => g.status === "completed")

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
                  <Target className="w-4 h-4 text-teal-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Goal Setter</h1>
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
            Set & Achieve Your
            <span className="text-teal-600 font-medium"> Academic Goals</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Break down your learning objectives into manageable milestones and track your progress with intelligent
            insights.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{activeGoals.length}</div>
              <div className="text-sm text-gray-500">Active Goals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{completedGoals.length}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length) || 0}%
              </div>
              <div className="text-sm text-gray-500">Avg Progress</div>
            </div>
          </div>
        </div>

        {/* Add New Goal Button */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <Button
            onClick={() => setShowNewGoalForm(!showNewGoalForm)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-3 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Goal
          </Button>
        </div>

        {/* New Goal Form */}
        {showNewGoalForm && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <Card className="border-teal-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  <span>Create New Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                    <Input
                      placeholder="e.g., Master Python Programming"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <Input
                      placeholder="e.g., Programming, Mathematics"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    placeholder="Describe your goal and what you want to achieve..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                  <Input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleAddGoal} className="bg-teal-600 hover:bg-teal-700">
                    Create Goal
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewGoalForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {goals.map((goal, index) => (
            <div
              key={goal.id}
              className="animate-in fade-in slide-in-from-left-4 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:shadow-teal-100 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-2">{goal.title}</CardTitle>
                      <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-600">{Math.round(goal.progress)}%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">
                        {goal.milestones.filter((m) => m.completed).length} / {goal.milestones.length} milestones
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                  </div>

                  {/* Target Date */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Target: {goal.targetDate}</span>
                  </div>

                  {/* Milestones */}
                  {goal.milestones.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Milestones</h4>
                      <div className="space-y-2">
                        {goal.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                            onClick={() => toggleMilestone(goal.id, milestone.id)}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                milestone.completed
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-300 hover:border-teal-400"
                              }`}
                            >
                              {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                              <span
                                className={`text-sm ${
                                  milestone.completed ? "text-gray-500 line-through" : "text-gray-700"
                                }`}
                              >
                                {milestone.title}
                              </span>
                              <div className="text-xs text-gray-400">{milestone.dueDate}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-6">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Clock className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 flex-1">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        {completedGoals.length > 0 && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Card className="bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Congratulations!</h3>
                <p className="text-gray-600 mb-6">
                  You've completed {completedGoals.length} goal{completedGoals.length > 1 ? "s" : ""}. Keep up the
                  excellent work!
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6">
                    <Star className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 border-teal-200 hover:bg-teal-50">
                    Share Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
