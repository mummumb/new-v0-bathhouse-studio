"use client"

import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { Event } from "@/lib/types"

interface EventFormProps {
  event?: Event | null
  onClose: () => void
  onSuccess: () => void
}

async function postData(url: string, data: any, method: "POST" | "PUT") {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to save event")
  return response.json()
}

export default function EventForm({ event, onClose, onSuccess }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({ defaultValues: event || { isPublished: false } })
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (data: Event) => {
      const url = event ? `/api/events/${event.id}` : "/api/events"
      const method = event ? "PUT" : "POST"
      return postData(url, data, method)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
      toast({ title: "Success", description: `Event ${event ? "updated" : "created"} successfully.` })
      onSuccess()
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save event.", variant: "destructive" })
    },
  })

  const onSubmit = (data: Event) => {
    mutation.mutate({
      ...data,
      price: Number(data.price),
      capacity: Number(data.capacity),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("title", { required: true })} placeholder="Title" />
      <Input {...register("slug", { required: true })} placeholder="Slug (e.g., my-first-event)" />
      <Textarea {...register("description", { required: true })} placeholder="Description" />
      <Input {...register("category", { required: true })} placeholder="Category" />
      <Input {...register("image", { required: true })} placeholder="Image URL" />
      <Input type="date" {...register("date", { required: true })} placeholder="Date" />
      <Input {...register("time", { required: true })} placeholder="Time" />
      <Input {...register("location", { required: true })} placeholder="Location" />
      <Input type="number" {...register("price", { required: true, valueAsNumber: true })} placeholder="Price" />
      <Input type="number" {...register("capacity", { required: true, valueAsNumber: true })} placeholder="Capacity" />
      <div className="flex items-center space-x-2">
        <Checkbox id="isPublished" {...register("isPublished")} />
        <Label htmlFor="isPublished">Published</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Event"}
        </Button>
      </div>
    </form>
  )
}
