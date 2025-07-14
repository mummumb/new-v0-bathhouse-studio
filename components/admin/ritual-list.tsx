"use client"

import type { Ritual } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

interface RitualListProps {
  rituals: Ritual[]
  onEdit: (ritual: Ritual) => void
  onDelete: (id: number) => void
  isDeleting: boolean
}

export default function RitualList({ rituals, onEdit, onDelete, isDeleting }: RitualListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rituals.map((ritual) => (
          <TableRow key={ritual.id}>
            <TableCell className="font-medium">#{ritual.number}</TableCell>
            <TableCell>{ritual.title}</TableCell>
            <TableCell>{ritual.date}</TableCell>
            <TableCell>
              <Badge variant={ritual.isPublished ? "default" : "secondary"}>
                {ritual.isPublished ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="icon" onClick={() => onEdit(ritual)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => onDelete(ritual.id)} disabled={isDeleting}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
