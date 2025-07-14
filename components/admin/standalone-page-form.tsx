"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { StandalonePage } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"

const standalonePageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  metaDescription: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(["published", "draft"]),
})

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
    resolver: zodResolver(standalonePageSchema),
    defaultValues: page || {
      title: "",
      slug: "",
      content: "",
      metaDescription: "",
      image: "",
      status: "draft",
    },
  })

  const watchTitle = watch("title")

  useEffect(() => {
    if (page) {
      reset(page)
    }
  }, [page, reset])

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !page) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setValue("slug", slug)
    }
  }, [watchTitle, setValue, page])

  const mutation = useMutation({
    mutationFn: async (data: StandalonePage) => {
      const url = data.id ? `/api/standalone-pages/${data.id}` : "/api/standalone-pages"
      const method = data.id ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">{page?.id ? "Edit Page" : "Create New Page"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Input
              id="metaDescription"
              {...register("metaDescription")}
              placeholder="SEO description for search engines"
            />
            {errors.metaDescription && <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>}
          </div>

          <div>
            <Label htmlFor="image">Featured Image URL</Label>
            <Input id="image" {...register("image")} placeholder="https://example.com/image.jpg" />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <WysiwygEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="Write your page content here..."
                />
              )}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
    </div>
  )
}
