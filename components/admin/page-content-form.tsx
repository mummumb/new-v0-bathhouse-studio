"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WysiwygEditor from "./wysiwyg-editor"
import type { PageContent } from "@/lib/types"

interface PageContentFormProps {
  pageContent?: PageContent
  onSave: (pageContent: PageContent) => void
  onCancel: () => void
}

export default function PageContentForm({ pageContent, onSave, onCancel }: PageContentFormProps) {
  const [formData, setFormData] = useState<PageContent>({
    id: pageContent?.id || "",
    title: pageContent?.title || "",
    content: pageContent?.content || "",
    lastUpdated: new Date().toISOString(),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave({
        ...formData,
        lastUpdated: new Date().toISOString(),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <WysiwygEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
          placeholder="Enter your page content..."
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
