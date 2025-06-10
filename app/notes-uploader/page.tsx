"use client"

import type React from "react"
import { useState, useCallback } from "react"
import {
  Upload,
  File,
  ImageIcon,
  FileText,
  X,
  Check,
  Loader2,
  ArrowLeft,
  Home,
  Sparkles,
  FolderOpen,
  Search,
  Filter,
  Brain,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  category?: string
  tags?: string[]
}

const categories = ["Mathematics", "Science", "History", "Literature", "Languages", "Other"]

export default function NotesUploaderApp() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleBackToMain = () => {
    window.open("/", "_blank")
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(selectedFiles)
    }
  }, [])

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
      category: categories[Math.floor(Math.random() * categories.length)],
      tags: ["study", "notes", file.type.includes("pdf") ? "pdf" : "document"],
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15

      setFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, progress: Math.min(progress, 100) } : file)),
      )

      if (progress >= 100) {
        clearInterval(interval)
        setFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, status: "processing", progress: 100 } : file)),
        )

        // Simulate processing
        setTimeout(() => {
          setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "completed" } : file)))
        }, 2000)
      }
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.includes("pdf")) return FileText
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || file.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const completedFiles = files.filter((f) => f.status === "completed")

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
                className="text-gray-600 hover:text-teal-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Main
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-4 h-4 text-teal-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Notes Uploader</h1>
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
            Upload & Organize Your
            <span className="text-teal-600 font-medium"> Study Materials</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Drag and drop your notes, PDFs, images, and documents. Our AI will automatically categorize and organize
            them for optimal studying.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{files.length}</div>
              <div className="text-sm text-gray-500">Total Files</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{completedFiles.length}</div>
              <div className="text-sm text-gray-500">Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{new Set(files.map((f) => f.category)).size}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 mb-12">
          <Card
            className={`border-2 border-dashed transition-all duration-300 ${
              isDragOver
                ? "border-teal-500 bg-teal-50 scale-105"
                : "border-gray-300 hover:border-teal-400 hover:shadow-lg"
            }`}
          >
            <CardContent
              className="p-12 text-center cursor-pointer"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <div className={`transition-transform duration-300 ${isDragOver ? "scale-110" : ""}`}>
                <div className="relative">
                  <Upload
                    className={`w-20 h-20 mx-auto mb-6 transition-colors duration-300 ${
                      isDragOver ? "text-teal-600" : "text-gray-400"
                    }`}
                  />
                  <Sparkles className="w-6 h-6 text-teal-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                  {isDragOver ? "Drop your files here" : "Upload your study materials"}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Drag and drop files here, or click to browse. We support PDFs, images, Word docs, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-3 text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      document.getElementById("file-input")?.click()
                    }}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Files
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-3 text-lg border-teal-200 hover:border-teal-400 hover:bg-teal-50"
                  >
                    <FolderOpen className="w-5 h-5 mr-2" />
                    Browse Folders
                  </Button>
                </div>
              </div>
              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.ppt,.pptx"
              />
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        {files.length > 0 && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-teal-600" />
                  <span>Search & Filter</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search files..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedCategory === "All" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("All")}
                      className={selectedCategory === "All" ? "bg-teal-600 hover:bg-teal-700" : ""}
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-teal-600 hover:bg-teal-700" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* File List */}
        {filteredFiles.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Your Files ({filteredFiles.length})</h3>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Sort by Date
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFiles.map((file, index) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <div
                    key={file.id}
                    className="animate-in fade-in slide-in-from-left-4 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:shadow-teal-100">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                              <FileIcon className="w-6 h-6 text-teal-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-medium text-gray-900 truncate">{file.name}</h4>
                              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-200"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Category and Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {file.category && (
                            <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                              {file.category}
                            </Badge>
                          )}
                          {file.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Status */}
                        {file.status === "uploading" && (
                          <div className="mb-4">
                            <Progress value={file.progress} className="h-2 mb-2" />
                            <p className="text-xs text-gray-500">Uploading... {Math.round(file.progress)}%</p>
                          </div>
                        )}
                        {file.status === "processing" && (
                          <div className="flex items-center mb-4">
                            <Loader2 className="w-4 h-4 animate-spin text-teal-600 mr-2" />
                            <p className="text-sm text-teal-600">AI is processing your file...</p>
                          </div>
                        )}
                        {file.status === "completed" && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Check className="w-4 h-4 text-green-600 mr-2" />
                              <p className="text-sm text-green-600">Ready for study</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                View
                              </Button>
                              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-xs">
                                Study
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {completedFiles.length > 0 && (
          <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <Card className="bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Study?</h3>
                <p className="text-gray-600 mb-6">
                  Your files are processed and ready. Choose how you'd like to study with them.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-3 hover:scale-105 transition-all duration-300 shadow-lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Summary
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-3 border-teal-200 hover:border-teal-400 hover:bg-teal-50"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Create Quiz
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-3 border-teal-200 hover:border-teal-400 hover:bg-teal-50"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ask AI
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
