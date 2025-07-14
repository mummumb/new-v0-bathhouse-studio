"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { StandalonePage } from "@/lib/types"

interface StandalonePageListProps {
  onEdit: (page: StandalonePage) => void
  onAdd: () => void
}

export default function StandalonePageList({ onEdit, onAdd }: StandalonePageListProps) {
  const [pages, setPages] = useState<StandalonePage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/standalone-pages")
      const data = await response.json()
      setPages(data)
    } catch (error) {
      console.error("Error fetching pages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this page?")) {
      try {
        await fetch(`/api/standalone-pages/${id}`, {
          method: "DELETE",
        })
        fetchPages()
      } catch (error) {
        console.error("Error deleting page:", error)
      }
    }
  }

  if (loading) {
    return <div>Loading pages...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Standalone Pages</h2>
        <Button onClick={onAdd}>Add New Page</Button>
      </div>

      <div className="space-y-2">
        {pages.map((page) => (
          <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{page.title}</h3>
                <Badge variant={page.published ? "default" : "secondary"}>
                  {page.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">/{page.slug}</p>
              <p className="text-xs text-gray-500">Updated: {new Date(page.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(page)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(page.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {pages.length === 0 && (
        <div className="text-center py-8 text-gray-500">No pages found. Create your first page to get started.</div>
      )}
    </div>
  )
}
