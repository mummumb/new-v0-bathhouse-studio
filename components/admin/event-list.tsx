"use client"

import type { Event } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

interface EventListProps {
  events: Event[]
  onEdit: (event: Event) => void
  onDelete: (id: number) => void
  isDeleting: boolean
}

export default function EventList({ events, onEdit, onDelete, isDeleting }: EventListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
            <TableCell>${event.price}</TableCell>
            <TableCell>
              <Badge variant={event.isPublished ? "default" : "secondary"}>
                {event.isPublished ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="icon" onClick={() => onEdit(event)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => onDelete(event.id)} disabled={isDeleting}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
