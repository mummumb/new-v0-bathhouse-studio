"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { PageContent } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"

interface PageContentFormProps {
  page: PageContent
  onClose: () => void
  onSuccess: () => void
}

export default function PageContentForm({ page, onClose, onSuccess }: PageContentFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [content, setContent] = useState(page.content)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PageContent>({
    defaultValues: page,
  })

  useEffect(() => {
    reset(page)
    setContent(page.content)
  }, [page, reset])

  const mutation = useMutation({
    mutationFn: async (data: PageContent) => {
      const response = await fetch(`/api/pages/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          content,
          lastUpdated: new Date().toISOString(),
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to update page content")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pageContent"] })
      toast({
        title: "Success!",
        description: "Page content has been updated.",
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

  const onSubmit = (data: PageContent) => {
    mutation.mutate(data)
  }

  return (
    <div className="bg-white p-6 rounded-lg border">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: "Title is required" })} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
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
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
