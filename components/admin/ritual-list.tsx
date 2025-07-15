"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ritualsApi } from "@/lib/api-client"
import type { Ritual } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Trash2, Plus } from "lucide-react"
import { useState } from "react"
import RitualForm from "./ritual-form"

export default function RitualList() {
  const [selectedRitual, setSelectedRitual] = useState<Ritual | undefined>()
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: rituals = [], isLoading } = useQuery({
    queryKey: ["rituals"],
    queryFn: ritualsApi.getAll,
  })

  const deleteMutation = useMutation({
    mutationFn: ritualsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rituals"] })
      toast({
        title: "Success!",
        description: "Ritual has been deleted.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleEdit = (ritual: Ritual) => {
    setSelectedRitual(ritual)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this ritual?")) {
      deleteMutation.mutate(id)
    }
  }

  const handleAdd = () => {
    setSelectedRitual(undefined)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedRitual(undefined)
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {selectedRitual ? "Edit Ritual" : "Add New Ritual"}
          </h2>
        </div>
        <RitualForm ritual={selectedRitual} onClose={handleCloseForm} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rituals</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Ritual
        </Button>
      </div>

      {isLoading ? (
        <div>Loading rituals...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rituals.map((ritual) => (
              <TableRow key={ritual.id}>
                <TableCell className="font-medium">{ritual.title}</TableCell>
                <TableCell>{ritual.slug}</TableCell>
                <TableCell>{ritual.instructor.name}</TableCell>
                <TableCell>
                  <Badge variant={ritual.published ? "default" : "secondary"}>
                    {ritual.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(ritual.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(ritual)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => handleDelete(ritual.id)} 
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {rituals.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No rituals found. Add your first ritual to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
