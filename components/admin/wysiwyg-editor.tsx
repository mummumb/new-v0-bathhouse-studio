"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, Link, Eye, Edit } from "lucide-react"

interface WysiwygEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function WysiwygEditor({ content, onChange, placeholder }: WysiwygEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertText = (before: string, after = "") => {
    const textarea = document.querySelector('textarea[data-wysiwyg="true"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatText = (type: string) => {
    switch (type) {
      case "bold":
        insertText("**", "**")
        break
      case "italic":
        insertText("*", "*")
        break
      case "list":
        insertText("\n- ", "")
        break
      case "link":
        insertText("[", "](url)")
        break
    }
  }

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-5">$1</ul>')
      .replace(/\n/g, "<br>")
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
        <Button type="button" variant="ghost" size="sm" onClick={() => formatText("bold")} disabled={isPreview}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => formatText("italic")} disabled={isPreview}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => formatText("list")} disabled={isPreview}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => formatText("link")} disabled={isPreview}>
          <Link className="h-4 w-4" />
        </Button>
        <div className="ml-auto">
          <Button type="button" variant="ghost" size="sm" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      <div className="p-3">
        {isPreview ? (
          <div
            className="min-h-[200px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
          />
        ) : (
          <Textarea
            data-wysiwyg="true"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Start writing..."}
            className="min-h-[200px] border-0 resize-none focus-visible:ring-0"
          />
        )}
      </div>
    </div>
  )
}
