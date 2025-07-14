"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { Ritual } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"
import { PlusCircle, Trash2 } from "lucide-react"

interface RitualFormProps {
  ritual?: Ritual
  onClose: () => void
  onSuccess: () => void
}

export default function RitualForm({ ritual, onClose, onSuccess }: RitualFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [longDescription, setLongDescription] = useState(ritual?.longDescription || "")
  const [instructorBio, setInstructorBio] = useState(ritual?.instructor.bio || "")

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Ritual>({
    defaultValues: ritual || {
      id: "",
      title: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
      image: "",
      status: "draft",
      instructor: { name: "", bio: "", image: "" },
      schedule: [],
      benefits: [],
      faq: [],
    },
  })

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({ control, name: "schedule" })
  const {
    fields: benefitsFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({ control, name: "benefits" })
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control, name: "faq" })

  useEffect(() => {
    if (ritual) {
      reset(ritual)
      setLongDescription(ritual.longDescription)
      setInstructorBio(ritual.instructor.bio)
    }
  }, [ritual, reset])

  const mutation = useMutation({
    mutationFn: async (data: Ritual) => {
      const url = data.id ? `/api/rituals/${data.id}` : "/api/rituals"
      const method = data.id ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          longDescription,
          instructor: {
            ...data.instructor,
            bio: instructorBio,
          },
        }),
      })
      if (!response.ok) {
        throw new Error(`Failed to ${data.id ? "update" : "create"} ritual`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rituals"] })
      toast({
        title: "Success!",
        description: `Ritual has been ${ritual?.id ? "updated" : "created"}.`,
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

  const onSubmit = (data: Ritual) => {
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

        <div>
          <Label htmlFor="shortDescription">Short Description</Label>
          <Textarea
            id="shortDescription"
            {...register("shortDescription", { required: "Short description is required" })}
          />
          {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>}
        </div>

        <div>
          <Label htmlFor="longDescription">Long Description</Label>
          <WysiwygEditor content={longDescription} onChange={setLongDescription} />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" {...register("image", { required: "Image URL is required" })} />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium">Instructor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="instructor.name">Name</Label>
              <Input
                id="instructor.name"
                {...register("instructor.name", { required: "Instructor name is required" })}
              />
              {errors.instructor?.name && <p className="text-red-500 text-sm mt-1">{errors.instructor.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="instructor.image">Image URL</Label>
              <Input
                id="instructor.image"
                {...register("instructor.image", { required: "Instructor image is required" })}
              />
              {errors.instructor?.image && (
                <p className="text-red-500 text-sm mt-1">{errors.instructor.image.message}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="instructor.bio">Bio</Label>
            <WysiwygEditor content={instructorBio} onChange={setInstructorBio} />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium">Schedule</h3>
          {scheduleFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mt-2">
              <Input {...register(`schedule.${index}.day`)} placeholder="Day (e.g., Monday)" />
              <Input {...register(`schedule.${index}.time`)} placeholder="Time (e.g., 7:00 PM)" />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeSchedule(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 bg-transparent"
            onClick={() => appendSchedule({ day: "", time: "" })}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Schedule
          </Button>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium">Benefits</h3>
          {benefitsFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mt-2">
              <Input {...register(`benefits.${index}`)} placeholder="e.g., Stress Reduction" />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 bg-transparent"
            onClick={() => appendBenefit("")}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Benefit
          </Button>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium">FAQ</h3>
          {faqFields.map((field, index) => (
            <div key={field.id} className="space-y-2 mt-4 p-4 border rounded-md">
              <Input {...register(`faq.${index}.question`)} placeholder="Question" />
              <Textarea {...register(`faq.${index}.answer`)} placeholder="Answer" />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeFaq(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 bg-transparent"
            onClick={() => appendFaq({ question: "", answer: "" })}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add FAQ
          </Button>
        </div>

        <div className="flex justify-end gap-2 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Ritual"}
          </Button>
        </div>
      </form>
    </div>
  )
}
