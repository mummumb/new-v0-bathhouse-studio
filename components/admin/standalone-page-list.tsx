"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { StandalonePage } from "@/lib/types"

interface StandalonePageListProps {
  pages: StandalonePage[]
  onEdit: (page: StandalonePage) => void
  onDelete: (id: number) => void
  isDeleting: boolean
}

export default function StandalonePageList({ pages, onEdit, onDelete, isDeleting }: StandalonePageListProps) {
  if (!pages || pages.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h3 className="text-lg font-medium text-gray-600">No pages created yet.</h3>
        <p className="text-sm text-gray-500">Click "New Page" to get started.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-white">
      <ul className="divide-y divide-gray-200">
        {pages.map((page) => (
          <li key={page.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
            <div>
              <span className="font-medium text-gray-800">{page.title}</span>
              <Badge variant={page.isPublished ? "default" : "secondary"} className="ml-2">
                {page.isPublished ? "published" : "draft"}
              </Badge>
              <p className="text-sm text-gray-500">/{page.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit(page)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(page.id)} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
