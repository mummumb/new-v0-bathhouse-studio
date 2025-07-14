"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import type { StandalonePage } from "@/lib/types"
import Link from "next/link"

interface StandalonePageListProps {
  pages: StandalonePage[]
  onEdit: (page: StandalonePage) => void
  onDelete: (id: number) => void
  isDeleting: boolean
}

export default function StandalonePageList({ pages, onEdit, onDelete, isDeleting }: StandalonePageListProps) {
  if (pages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 mb-4">No standalone pages found.</p>
          <p className="text-sm text-gray-400">Create your first standalone page to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {pages.map((page) => (
        <Card key={page.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg">{page.title}</CardTitle>
                <CardDescription className="mt-1">Slug: /{page.slug}</CardDescription>
                {page.metaDescription && <CardDescription className="mt-2">{page.metaDescription}</CardDescription>}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/p/${page.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(page)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(Number.parseInt(page.id))}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              <p>Created: {new Date(page.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(page.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
