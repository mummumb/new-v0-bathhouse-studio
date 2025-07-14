"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { PageContent } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"

interface PageContentFormProps {
  page?: PageContent
  onClose: () => void
  onSuccess: () => void
}

export default function PageContentForm({ page, onClose, onSuccess }: PageContentFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PageContent>({
    defaultValues: page || { id: "", title: "", content: "" },
  })

  useEffect(() => {
    reset(page || { id: "", title: "", content: "" })
  }, [page, reset])

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
    if (!data.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: true })} readOnly className="bg-gray-100" />
        {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
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
