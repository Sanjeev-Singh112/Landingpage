"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Home,
  FileText,
  Upload,
  Sparkles,
  Download,
  Copy,
  Wand2,
  BookOpen,
  Clock,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Summary {
  id: string
  title: string
  originalLength: number
  summaryLength: number
  compressionRatio: number
  content: string
  keyPoints: string[]
  createdAt: string
  type: "bullet" | "paragraph" | "outline"
}

const sampleSummaries: Summary[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    originalLength: 2500,
    summaryLength: 450,
    compressionRatio: 82,
    content:
      "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It involves algorithms that can identify patterns in data and make predictions or decisions based on those patterns. The three main types are supervised learning (using labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error with rewards).",
    keyPoints: [
      "ML is a subset of AI that learns from experience",
      "Three main types: supervised, unsupervised, reinforcement",
      "Algorithms identify patterns and make predictions",
      "No explicit programming required for learning",
    ],
    createdAt: "2024-01-15",
    type: "paragraph",
  },
  {
    id: "2",
    title: "World War II Timeline",
    originalLength: 1800,
    summaryLength: 320,
    compressionRatio: 78,
    content:
      "World War II (1939-1945) was a global conflict involving most nations. Key events include Germany's invasion of Poland (1939), Pearl Harbor attack (1941), D-Day landings (1944), and atomic bombs on Japan (1945). The war ended with Allied victory and significant geopolitical changes.",
    keyPoints: [
      "Global conflict from 1939-1945",
      "Started with Germany invading Poland",
      "Pearl Harbor brought US into war",
      "D-Day marked turning point in Europe",
      "Ended with atomic bombs and Allied victory",
    ],
    createdAt: "2024-01-14",
    type: "bullet",
  },
]

export default function SummariserApp() {
  const [summaries, setSummaries] = useState<Summary[]>(sampleSummaries)
  const [inputText, setInputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [summaryType, setSummaryType] = useState<"bullet" | "paragraph" | "outline">("paragraph")

  const handleBackToMain = () => {
    window.open("/", "_blank")
  }

  const generateSummary = async () => {
    if (!inputText.trim()) return

    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      const wordCount = inputText.split(" ").length
      const summaryLength = Math.floor(wordCount * 0.3)
      const compressionRatio = Math.floor(((wordCount - summaryLength) / wordCount) * 100)

      const newSummary: Summary = {
        id: Date.now().toString(),
        title: `Summary ${summaries.length + 1}`,
        originalLength: wordCount,
        summaryLength: summaryLength,
        compressionRatio: compressionRatio,
        content: `This is an AI-generated summary of your ${wordCount}-word text. The key concepts have been distilled into the most important points while maintaining the original meaning and context.`,
        keyPoints: [
          "Main concept identified and explained",
          "Supporting details summarized",
          "Key relationships highlighted",
          "Conclusion and implications noted",
        ],
        createdAt: new Date().toISOString().split("T")[0],
        type: summaryType,
      }

      setSummaries([newSummary, ...summaries])
      setInputText("")
      setIsGenerating(false)
    }, 3000)
  }

  const copySummary = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bullet":
        return "bg-blue-100 text-blue-700"
      case "outline":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-teal-100 text-teal-700"
    }
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
                  <FileText className="w-4 h-4 text-teal-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Summariser</h1>
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
            <span className="text-teal-600 font-medium"> Text Summariser</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform lengthy documents, articles, and notes into concise, meaningful summaries that capture the essence
            of your content.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{summaries.length}</div>
              <div className="text-sm text-gray-500">Summaries Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round(summaries.reduce((acc, s) => acc + s.compressionRatio, 0) / summaries.length) || 0}%
              </div>
              <div className="text-sm text-gray-500">Avg Compression</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {summaries.reduce((acc, s) => acc + s.originalLength, 0)}
              </div>
              <div className="text-sm text-gray-500">Words Processed</div>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <Card className="border-teal-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5 text-teal-600" />
                <span>Create New Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Summary Type</label>
                <div className="flex space-x-4">
                  {[
                    { type: "paragraph", label: "Paragraph", icon: FileText },
                    { type: "bullet", label: "Bullet Points", icon: BookOpen },
                    { type: "outline", label: "Outline", icon: BarChart3 },
                  ].map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => setSummaryType(type as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                        summaryType === type
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text to Summarize ({inputText.split(" ").filter(Boolean).length} words)
                </label>
                <Textarea
                  placeholder="Paste your text here... (articles, notes, documents, etc.)"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={generateSummary}
                  disabled={!inputText.trim() || isGenerating}
                  className="bg-teal-600 hover:bg-teal-700 text-white flex-1 py-3"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Generating Summary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Summary
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1 py-3">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Document
                </Button>
              </div>

              {/* Progress Bar for Generation */}
              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={66} className="h-2" />
                  <p className="text-sm text-teal-600 text-center">AI is analyzing your text...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summaries List */}
        {summaries.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Your Summaries ({summaries.length})</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>

            <div className="space-y-6">
              {summaries.map((summary, index) => (
                <div
                  key={summary.id}
                  className="animate-in fade-in slide-in-from-left-4 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:shadow-teal-100">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 mb-2">{summary.title}</CardTitle>
                          <div className="flex items-center space-x-4 mb-4">
                            <Badge className={getTypeColor(summary.type)}>{summary.type}</Badge>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{summary.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-600">{summary.compressionRatio}%</div>
                          <div className="text-xs text-gray-500">Compressed</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{summary.originalLength}</div>
                          <div className="text-xs text-gray-500">Original Words</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-teal-600">{summary.summaryLength}</div>
                          <div className="text-xs text-gray-500">Summary Words</div>
                        </div>
                      </div>

                      {/* Summary Content */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Summary</h4>
                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                          <p className="text-gray-700 leading-relaxed">{summary.content}</p>
                        </div>
                      </div>

                      {/* Key Points */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Key Points</h4>
                        <ul className="space-y-2">
                          {summary.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copySummary(summary.content)}
                          className="flex-1"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 flex-1">
                          <Wand2 className="w-4 h-4 mr-2" />
                          Refine
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
