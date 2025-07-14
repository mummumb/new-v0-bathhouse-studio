"use client"

import type React from "react"

import { useState, useRef } from "react"

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function WysiwygEditor({ value, onChange, placeholder }: WysiwygEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handleFormat("insertImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden relative">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-1 flex-wrap">
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => handleFormat("italic")}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => handleFormat("formatBlock", "h2")}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => handleFormat("formatBlock", "h3")}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => handleFormat("insertUnorderedList")}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => handleFormat("insertOrderedList")}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => handleFormat("formatBlock", "blockquote")}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          Quote
        </button>
        <button
          type="button"
          onClick={handleImageUpload}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          📷 Image
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-4 min-h-[200px] focus:outline-none"
        style={{
          fontSize: "14px",
          lineHeight: "1.5",
          color: "#374151",
        }}
      />

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {!value && !isEditing && (
        <div className="absolute top-12 left-4 text-gray-400 pointer-events-none">
          {placeholder || "Start typing..."}
        </div>
      )}
    </div>
  )
}
