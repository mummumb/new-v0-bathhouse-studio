"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import WysiwygEditor from "./wysiwyg-editor"
import type { StandalonePage } from "@/lib/types"

interface StandalonePageFormProps {
  page?: StandalonePage
  onSave: (page: Partial<StandalonePage>) => void
  onCancel: () => void
}

export default function StandalonePageForm({ page, onSave, onCancel }: StandalonePageFormProps) {
  const [formData, setFormData] = useState({
    title: page?.title || "",
    slug: page?.slug || "",
    content: page?.content || "",
    published: page?.published || false,
    seoTitle: page?.seoTitle || "",
    seoDescription: page?.seoDescription || "",
    author: page?.author || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
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
      onSave(formData)
    }
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className={errors.slug ? "border-red-500" : ""}
        />
        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
        <p className="text-sm text-gray-600 mt-1">URL: /p/{formData.slug}</p>
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

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="seoTitle">SEO Title</Label>
        <Input
          id="seoTitle"
          value={formData.seoTitle}
          onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="seoDescription">SEO Description</Label>
        <Input
          id="seoDescription"
          value={formData.seoDescription}
          onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) => setFormData({ ...formData, published: !!checked })}
        />
        <Label htmlFor="published">Published</Label>
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
