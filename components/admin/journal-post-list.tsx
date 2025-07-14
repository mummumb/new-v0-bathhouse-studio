"use client"

import type { JournalPost } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

interface JournalPostListProps {
  posts: JournalPost[]
  onEdit: (post: JournalPost) => void
  onDelete: (id: number) => void
  isDeleting: boolean
}

export default function JournalPostList({ posts, onEdit, onDelete, isDeleting }: JournalPostListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>{post.categories.join(", ")}</TableCell>
            <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant={post.isPublished ? "default" : "secondary"}>
                {post.isPublished ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="icon" onClick={() => onEdit(post)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => onDelete(post.id)} disabled={isDeleting}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
