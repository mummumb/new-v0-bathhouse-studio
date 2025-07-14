"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { StandalonePage } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"

interface StandalonePageFormProps {
  page?: StandalonePage
  onClose: () => void
  onSuccess: () => void
}

export default function StandalonePageForm({ page, onClose, onSuccess }: StandalonePageFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [content, setContent] = useState(page?.content || "")
  const [status, setStatus] = useState<"published" | "draft">(page?.status || "draft")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StandalonePage>({
    defaultValues: page || {
      id: 0,
      title: "",
      slug: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      status: "draft",
      createdAt: "",
      updatedAt: "",
    },
  })

  useEffect(() => {
    if (page) {
      reset(page)
      setContent(page.content)
      setStatus(page.status)
    }
  }, [page, reset])

  const mutation = useMutation({
    mutationFn: async (data: StandalonePage) => {
      const url = data.id ? `/api/standalone-pages/${data.id}` : "/api/standalone-pages"
      const method = data.id ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          content,
          status,
        }),
      })
      if (!response.ok) {
        throw new Error(`Failed to ${data.id ? "update" : "create"} page`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["standalonePages"] })
      toast({
        title: "Success!",
        description: `Page has been ${page?.id ? "updated" : "created"}.`,
      })
      onSuccess()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: StandalonePage) => {
    mutation.mutate(data)
  }

  return (
    <div className="bg-white p-6 rounded-lg border">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...register("slug", { required: "Slug is required" })} />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
            <Input id="metaTitle" {...register("metaTitle")} />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: "published" | "draft") => setStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
          <Input id="metaDescription" {...register("metaDescription")} />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <WysiwygEditor content={content} onChange={setContent} />
        </div>

        <div className="flex justify-end gap-2 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Page"}
          </Button>
        </div>
      </form>
    </div>
  )
}
