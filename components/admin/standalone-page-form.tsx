"use client"

import { useForm, Controller } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import WysiwygEditor from "./wysiwyg-editor"
import type { StandalonePage } from "@/lib/types"

interface StandalonePageFormProps {
  page?: StandalonePage | null
  onClose: () => void
  onSuccess: () => void
}

async function postData(url: string, data: any, method: "POST" | "PUT") {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to save page")
  return response.json()
}

export default function StandalonePageForm({ page, onClose, onSuccess }: StandalonePageFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StandalonePage>({
    defaultValues: page || {
      slug: "",
      title: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      isPublished: false,
    },
  })
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (data: StandalonePage) => {
      const url = page ? `/api/standalone-pages/${page.id}` : "/api/standalone-pages"
      const method = page ? "PUT" : "POST"
      return postData(url, data, method)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["standalonePages"] })
      toast({ title: "Success", description: `Page ${page ? "updated" : "created"} successfully.` })
      onSuccess()
    },
    onError: (err) => {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    },
  })

  const onSubmit = (data: StandalonePage) => {
    mutation.mutate(data)
  }

  return (
    <div className="border p-6 rounded-lg bg-white space-y-6">
      <h3 className="text-lg font-medium">{page ? "Edit" : "Create"} Page</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Page Title</Label>
          <Input id="title" {...register("title", { required: true })} placeholder="About Us" />
          {errors.title && <p className="text-sm text-red-500 mt-1">Title is required.</p>}
        </div>
        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" {...register("slug", { required: true })} placeholder="about-us" />
          {errors.slug && <p className="text-sm text-red-500 mt-1">Slug is required.</p>}
        </div>
        <div>
          <Label>Content</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => <WysiwygEditor content={field.value} onChange={field.onChange} />}
          />
        </div>
        <div className="border-t pt-6 space-y-4">
          <h4 className="font-medium">SEO Settings</h4>
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input id="metaTitle" {...register("metaTitle")} placeholder="About Us | Bathhouse Studio" />
          </div>
          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Input id="metaDescription" {...register("metaDescription")} placeholder="Learn about our philosophy..." />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="isPublished"
            control={control}
            render={({ field }) => <Checkbox id="isPublished" checked={field.value} onCheckedChange={field.onChange} />}
          />
          <Label htmlFor="isPublished">Published</Label>
        </div>
        <div className="flex justify-end space-x-2">
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
