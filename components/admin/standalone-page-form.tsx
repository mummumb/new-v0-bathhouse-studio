"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { StandalonePage } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"

interface StandalonePageFormProps {
  page?: StandalonePage | null
  onClose: () => void
  onSuccess: () => void
}

export default function StandalonePageForm({ page, onClose, onSuccess }: StandalonePageFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StandalonePage>({
    defaultValues: page || {
      id: 0,
      title: "",
      slug: "",
      content: "",
      status: "draft",
      publishedAt: new Date().toISOString(),
      seoTitle: "",
      seoDescription: "",
    },
  })

  const watchTitle = watch("title")

  useEffect(() => {
    if (watchTitle && !page) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setValue("slug", slug)
    }
  }, [watchTitle, setValue, page])

  useEffect(() => {
    reset(
      page || {
        id: 0,
        title: "",
        slug: "",
        content: "",
        status: "draft",
        publishedAt: new Date().toISOString(),
        seoTitle: "",
        seoDescription: "",
      },
    )
  }, [page, reset])

  const mutation = useMutation({
    mutationFn: async (data: StandalonePage) => {
      const url = page ? `/api/standalone-pages/${page.id}` : "/api/standalone-pages"
      const method = page ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${page ? "update" : "create"} page`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["standalonePages"] })
      toast({
        title: "Success!",
        description: `Page has been ${page ? "updated" : "created"}.`,
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
    if (!data.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      })
      return
    }
    if (!data.slug.trim()) {
      toast({
        title: "Error",
        description: "Slug is required",
        variant: "destructive",
      })
      return
    }
    if (!data.content.trim()) {
      toast({
        title: "Error",
        description: "Content is required",
        variant: "destructive",
      })
      return
    }
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border p-6 rounded-lg bg-white">
      <h3 className="text-lg font-medium">{page ? `Edit "${page.title}"` : "Create New Page"}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: true })} placeholder="Page title" />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" {...register("slug", { required: true })} placeholder="page-url-slug" />
          {errors.slug && <p className="text-red-500 text-sm mt-1">Slug is required</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <WysiwygEditor content={field.value} onChange={field.onChange} />}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">Content is required</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="seoTitle">SEO Title (Optional)</Label>
          <Input id="seoTitle" {...register("seoTitle")} placeholder="Custom SEO title" />
        </div>

        <div>
          <Label htmlFor="seoDescription">SEO Description (Optional)</Label>
          <Input id="seoDescription" {...register("seoDescription")} placeholder="Custom SEO description" />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : page ? "Update Page" : "Create Page"}
        </Button>
      </div>
    </form>
  )
}
