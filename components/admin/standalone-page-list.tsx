"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import type { StandalonePage } from "@/lib/types"

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
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No standalone pages found. Create your first page to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <Card key={page.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{page.title}</CardTitle>
                <CardDescription>
                  Slug: /{page.slug} • Published: {new Date(page.publishedAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(page)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(page.id)} disabled={isDeleting}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: page.content.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
