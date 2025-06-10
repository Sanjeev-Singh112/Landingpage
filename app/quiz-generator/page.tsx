"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Home,
  Brain,
  Play,
  CheckCircle,
  X,
  RotateCcw,
  Trophy,
  Clock,
  Sparkles,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  createdAt: string
  category: string
}

interface QuizAttempt {
  questionId: string
  selectedAnswer: number | null
  isCorrect: boolean | null
}

const sampleQuizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of basic JavaScript concepts",
    category: "Programming",
    createdAt: "2024-01-15",
    questions: [
      {
        id: "1",
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
        correctAnswer: 0,
        explanation: "The 'var' keyword is used to declare variables in JavaScript.",
        difficulty: "easy",
      },
      {
        id: "2",
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correctAnswer: 1,
        explanation: "The push() method adds one or more elements to the end of an array.",
        difficulty: "medium",
      },
    ],
  },
  {
    id: "2",
    title: "World History Quiz",
    description: "Test your knowledge of major historical events",
    category: "History",
    createdAt: "2024-01-14",
    questions: [
      {
        id: "3",
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation: "World War II ended in 1945 with the surrender of Japan.",
        difficulty: "easy",
      },
    ],
  },
]

export default function QuizGeneratorApp() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(sampleQuizzes)
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [newQuizText, setNewQuizText] = useState("")

  const handleBackToMain = () => {
    window.open("/", "_blank")
  }

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
    setCurrentQuestionIndex(0)
    setQuizAttempts(
      quiz.questions.map((q) => ({
        questionId: q.id,
        selectedAnswer: null,
        isCorrect: null,
      })),
    )
    setShowResults(false)
  }

  const selectAnswer = (answerIndex: number) => {
    if (!activeQuiz) return

    const currentQuestion = activeQuiz.questions[currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.correctAnswer

    setQuizAttempts((prev) =>
      prev.map((attempt) =>
        attempt.questionId === currentQuestion.id ? { ...attempt, selectedAnswer: answerIndex, isCorrect } : attempt,
      ),
    )
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setActiveQuiz(null)
    setCurrentQuestionIndex(0)
    setQuizAttempts([])
    setShowResults(false)
  }

  const generateQuiz = async () => {
    if (!newQuizText.trim()) return

    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        title: `Generated Quiz ${quizzes.length + 1}`,
        description: "AI-generated quiz from your content",
        category: "Custom",
        createdAt: new Date().toISOString().split("T")[0],
        questions: [
          {
            id: `q${Date.now()}`,
            question: "What is the main topic discussed in the provided text?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: 0,
            explanation: "This is based on the key concepts identified in your text.",
            difficulty: "medium",
          },
        ],
      }

      setQuizzes([newQuiz, ...quizzes])
      setNewQuizText("")
      setIsGenerating(false)
    }, 3000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700"
      case "hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const correctAnswers = quizAttempts.filter((a) => a.isCorrect).length
  const totalQuestions = quizAttempts.length
  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  if (activeQuiz && !showResults) {
    const currentQuestion = activeQuiz.questions[currentQuestionIndex]
    const currentAttempt = quizAttempts.find((a) => a.questionId === currentQuestion.id)

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={resetQuiz} className="text-gray-600 hover:text-teal-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Quizzes
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-xl font-semibold text-gray-900">{activeQuiz.title}</h1>
              </div>
              <div className="text-sm text-gray-500">
                {currentQuestionIndex + 1} of {activeQuiz.questions.length}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100)}%
              </span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="border-teal-200 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(currentQuestion.difficulty)}>{currentQuestion.difficulty}</Badge>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Question {currentQuestionIndex + 1}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">{currentQuestion.question}</h2>

              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      currentAttempt?.selectedAnswer === index
                        ? currentAttempt.isCorrect
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-teal-400 hover:bg-teal-50"
                    }`}
                    disabled={currentAttempt?.selectedAnswer !== null}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          currentAttempt?.selectedAnswer === index
                            ? currentAttempt.isCorrect
                              ? "border-green-500 bg-green-500"
                              : "border-red-500 bg-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        {currentAttempt?.selectedAnswer === index && (
                          <>
                            {currentAttempt.isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <X className="w-4 h-4 text-white" />
                            )}
                          </>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {currentAttempt?.selectedAnswer !== null && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-in fade-in duration-300">
                  <h4 className="font-medium text-blue-900 mb-2">Explanation</h4>
                  <p className="text-blue-800">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {currentAttempt?.selectedAnswer !== null && (
                <Button
                  onClick={nextQuestion}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
                >
                  {currentQuestionIndex < activeQuiz.questions.length - 1 ? "Next Question" : "View Results"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Quiz Results</h1>
              <Button variant="ghost" size="sm" onClick={resetQuiz} className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Results Card */}
          <Card className="border-teal-200 shadow-lg mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">
                You scored {score}% on {activeQuiz?.title}
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">{score}%</div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
                  <div className="text-sm text-gray-500">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600">{totalQuestions}</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <Button onClick={resetQuiz} className="bg-teal-600 hover:bg-teal-700">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Another Quiz
                </Button>
                <Button variant="outline" onClick={() => startQuiz(activeQuiz!)}>
                  <Play className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
                  <Brain className="w-4 h-4 text-teal-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Quiz Generator</h1>
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
            AI-Powered
            <span className="text-teal-600 font-medium"> Quiz Generator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your study materials into interactive quizzes. Test your knowledge and track your progress with
            AI-generated questions.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{quizzes.length}</div>
              <div className="text-sm text-gray-500">Quizzes Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0)}
              </div>
              <div className="text-sm text-gray-500">Questions Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{new Set(quizzes.map((q) => q.category)).size}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
          </div>
        </div>

        {/* Generate New Quiz */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <Card className="border-teal-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <span>Generate New Quiz</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Study Material ({newQuizText.split(" ").filter(Boolean).length} words)
                </label>
                <Textarea
                  placeholder="Paste your notes, articles, or study materials here to generate quiz questions..."
                  value={newQuizText}
                  onChange={(e) => setNewQuizText(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={generateQuiz}
                  disabled={!newQuizText.trim() || isGenerating}
                  className="bg-teal-600 hover:bg-teal-700 text-white flex-1 py-3"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Generate Quiz
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1 py-3">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload Document
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-teal-600 text-center">
                    AI is creating quiz questions from your content...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Available Quizzes */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">Available Quizzes ({quizzes.length})</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="animate-in fade-in slide-in-from-left-4 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:shadow-teal-100 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg text-gray-900">{quiz.title}</CardTitle>
                      <Badge variant="outline">{quiz.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{quiz.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Quiz Stats */}
                      <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-teal-600">{quiz.questions.length}</div>
                          <div className="text-xs text-gray-500">Questions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">
                            {Math.round(
                              quiz.questions.reduce((acc, q) => {
                                const difficultyScore = q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3
                                return acc + difficultyScore
                              }, 0) / quiz.questions.length,
                            )}
                            /3
                          </div>
                          <div className="text-xs text-gray-500">Difficulty</div>
                        </div>
                      </div>

                      {/* Difficulty Distribution */}
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">Difficulty Distribution</div>
                        <div className="flex space-x-1">
                          {["easy", "medium", "hard"].map((difficulty) => {
                            const count = quiz.questions.filter((q) => q.difficulty === difficulty).length
                            const percentage = (count / quiz.questions.length) * 100
                            return (
                              <div
                                key={difficulty}
                                className={`h-2 rounded-full ${
                                  difficulty === "easy"
                                    ? "bg-green-400"
                                    : difficulty === "medium"
                                      ? "bg-yellow-400"
                                      : "bg-red-400"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            )
                          })}
                        </div>
                      </div>

                      {/* Created Date */}
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Created {quiz.createdAt}</span>
                      </div>

                      {/* Start Quiz Button */}
                      <Button
                        onClick={() => startQuiz(quiz)}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white hover:scale-105 transition-all duration-300"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
