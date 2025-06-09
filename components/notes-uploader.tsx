"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Upload Your
            <span className="text-mint-600 font-medium"> Notes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Drag and drop your study materials or click to browse. We support PDFs, images, and text documents.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card
            className={`border-2 border-dashed transition-all duration-300 ${
              isDragOver ? "border-mint-500 bg-mint-50" : "border-gray-300 hover:border-mint-400"
            }`}
          >
            <CardContent
              className="p-12 text-center cursor-pointer"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <motion.div animate={{ scale: isDragOver ? 1.05 : 1 }} transition={{ duration: 0.2 }}>
                <Upload className={`w-16 h-16 mx-auto mb-6 ${isDragOver ? "text-mint-600" : "text-gray-400"}`} />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {isDragOver ? "Drop your files here" : "Upload your study materials"}
                </h3>
                <p className="text-gray-600 mb-6">Drag and drop files here, or click to browse</p>
                <Button
                  className="bg-mint-600 hover:bg-mint-700 text-white rounded-full px-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    document.getElementById("file-input")?.click()
                  }}
                >
                  Choose Files
                </Button>
              </motion.div>
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
        </motion.div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Uploaded Files ({files.length})</h3>
              <div className="space-y-4">
                {files.map((file) => {
                  const FileIcon = getFileIcon(file.type)
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                              <div className="w-12 h-12 bg-mint-100 rounded-lg flex items-center justify-center">
                                <FileIcon className="w-6 h-6 text-mint-600" />
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
                                    <Loader2 className="w-4 h-4 animate-spin text-mint-600 mr-2" />
                                    <p className="text-xs text-mint-600">Processing...</p>
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
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {files.some((f) => f.status === "completed") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="space-x-4">
              <Button className="bg-mint-600 hover:bg-mint-700 text-white rounded-full px-8">Generate Summary</Button>
              <Button variant="outline" className="rounded-full px-8">
                Create Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
