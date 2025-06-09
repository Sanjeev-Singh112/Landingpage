"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, File, ImageIcon, FileText, X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
}

export default function NotesUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

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

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Upload Your
            <span className="text-teal-600 font-medium"> Notes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Drag and drop your study materials or click to browse. We support PDFs, images, and text documents.
          </p>
        </div>

        {/* Upload Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
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
                <Upload
                  className={`w-16 h-16 mx-auto mb-6 transition-colors duration-300 ${
                    isDragOver ? "text-teal-600" : "text-gray-400"
                  }`}
                />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {isDragOver ? "Drop your files here" : "Upload your study materials"}
                </h3>
                <p className="text-gray-600 mb-6">Drag and drop files here, or click to browse</p>
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    document.getElementById("file-input")?.click()
                  }}
                >
                  Choose Files
                </Button>
              </div>
              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
            </CardContent>
          </Card>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Uploaded Files ({files.length})</h3>
            <div className="space-y-4">
              {files.map((file, index) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <div
                    key={file.id}
                    className="animate-in fade-in slide-in-from-left-4 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 hover:shadow-teal-100">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                              <FileIcon className="w-6 h-6 text-teal-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-medium text-gray-900 truncate">{file.name}</h4>
                              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                              {file.status === "uploading" && (
                                <div className="mt-2">
                                  <Progress value={file.progress} className="h-2" />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Uploading... {Math.round(file.progress)}%
                                  </p>
                                </div>
                              )}
                              {file.status === "processing" && (
                                <div className="flex items-center mt-2">
                                  <Loader2 className="w-4 h-4 animate-spin text-teal-600 mr-2" />
                                  <p className="text-xs text-teal-600">Processing...</p>
                                </div>
                              )}
                              {file.status === "completed" && (
                                <div className="flex items-center mt-2">
                                  <Check className="w-4 h-4 text-green-600 mr-2" />
                                  <p className="text-xs text-green-600">Ready for study</p>
                                </div>
                              )}
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
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {files.some((f) => f.status === "completed") && (
          <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="space-x-4">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 hover:scale-105 transition-all duration-300 shadow-lg">
                Generate Summary
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 hover:scale-105 transition-all duration-300 border-teal-200 hover:border-teal-400 hover:bg-teal-50"
              >
                Create Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
