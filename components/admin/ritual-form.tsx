"use client"

import { useEffect } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { Ritual } from "@/lib/types"
import WysiwygEditor from "./wysiwyg-editor"
import { PlusCircle, Trash2 } from "lucide-react"

const ritualSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  image: z.string().url("Must be a valid URL"),
  status: z.enum(["published", "draft"]),
  instructor: z.object({
    name: z.string().min(1, "Instructor name is required"),
    bio: z.string().min(1, "Instructor bio is required"),
    image: z.string().url("Must be a valid URL"),
  }),
  schedule: z.array(
    z.object({
      day: z.string().min(1, "Day is required"),
      time: z.string().min(1, "Time is required"),
    }),
  ),
  benefits: z.array(z.string().min(1, "Benefit cannot be empty")),
  faq: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    }),
  ),
})

interface RitualFormProps {
  ritual?: Ritual
  onClose: () => void
}

export default function RitualForm({ ritual, onClose }: RitualFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Ritual>({
    resolver: zodResolver(ritualSchema),
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
    }
  }, [ritual, reset])

  const mutation = useMutation({
    mutationFn: async (data: Ritual) => {
      const url = data.id ? `/api/rituals/${data.id}` : "/api/rituals"
      const method = data.id ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  const onSubmit = (data: Ritual) => {
    mutation.mutate(data)
  }

  return (
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
        <Label htmlFor="shortDescription">Short Description</Label>
        <Textarea id="shortDescription" {...register("shortDescription")} />
        {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>}
      </div>

      <div>
        <Label htmlFor="longDescription">Long Description</Label>
        <Controller
          name="longDescription"
          control={control}
          render={({ field }) => <WysiwygEditor content={field.value} onChange={field.onChange} />}
        />
        {errors.longDescription && <p className="text-red-500 text-sm mt-1">{errors.longDescription.message}</p>}
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" {...register("image")} />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium">Instructor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="instructor.name">Name</Label>
            <Input id="instructor.name" {...register("instructor.name")} />
            {errors.instructor?.name && <p className="text-red-500 text-sm mt-1">{errors.instructor.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="instructor.image">Image URL</Label>
            <Input id="instructor.image" {...register("instructor.image")} />
            {errors.instructor?.image && <p className="text-red-500 text-sm mt-1">{errors.instructor.image.message}</p>}
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="instructor.bio">Bio</Label>
          <Controller
            name="instructor.bio"
            control={control}
            render={({ field }) => <WysiwygEditor content={field.value} onChange={field.onChange} />}
          />
          {errors.instructor?.bio && <p className="text-red-500 text-sm mt-1">{errors.instructor.bio.message}</p>}
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
  )
}
