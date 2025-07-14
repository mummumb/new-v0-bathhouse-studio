"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { PageContent } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"

const pageContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
})

interface PageContentFormProps {
  pageContent?: PageContent
  onClose: () => void
}

export default function PageContentForm({ pageContent, onClose }: PageContentFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PageContent>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: pageContent || { id: "", title: "", content: "" },
  })

  useEffect(() => {
    reset(pageContent || { id: "", title: "", content: "" })
  }, [pageContent, reset])

  const mutation = useMutation({
    mutationFn: async (data: PageContent) => {
      const response = await fetch(`/api/pages/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Failed to update page content")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] })
      toast({
        title: "Success!",
        description: "Page content has been updated.",
      })
      onClose()
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} readOnly className="bg-gray-100" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <WysiwygEditor content={field.value} onChange={field.onChange} />}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
