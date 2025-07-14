"use client"

import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { JournalPost } from "@/lib/types"

interface JournalPostFormProps {
  post?: JournalPost | null
  onClose: () => void
  onSuccess: () => void
}

async function postData(url: string, data: any, method: "POST" | "PUT") {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to save post")
  return response.json()
}

export default function JournalPostForm({ post, onClose, onSuccess }: JournalPostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalPost>({ defaultValues: post || { isPublished: false } })
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (data: JournalPost) => {
      const url = post ? `/api/journal/${post.id}` : "/api/journal"
      const method = post ? "PUT" : "POST"
      return postData(url, data, method)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journalPosts"] })
      toast({ title: "Success", description: `Post ${post ? "updated" : "created"} successfully.` })
      onSuccess()
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save post.", variant: "destructive" })
    },
  })

  const onSubmit = (data: JournalPost) => {
    const dataToSubmit = {
      ...data,
      date: new Date().toISOString(),
      readTime: `${Math.ceil(data.content.split(" ").length / 200)} min read`,
      author: { name: "Amanda Berger", avatar: "/images/amanda-berger-headshot.jpeg" },
      categories: data.categories
        .toString()
        .split(",")
        .map((s) => s.trim()),
    }
    mutation.mutate(dataToSubmit as any)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("title", { required: true })} placeholder="Title" />
      <Input {...register("slug", { required: true })} placeholder="Slug (e.g., my-first-post)" />
      <Textarea {...register("excerpt", { required: true })} placeholder="Excerpt" />
      <Textarea {...register("content", { required: true })} placeholder="Content (HTML)" rows={10} />
      <Input {...register("categories", { required: true })} placeholder="Categories (comma-separated)" />
      <Input {...register("image", { required: true })} placeholder="Image URL (e.g., /images/foo.png)" />
      <Input {...register("imageAlt", { required: true })} placeholder="Image Alt Text" />
      <div className="flex items-center space-x-2">
        <Checkbox id="isPublished" {...register("isPublished")} />
        <Label htmlFor="isPublished">Published</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Post"}
        </Button>
      </div>
    </form>
  )
}
