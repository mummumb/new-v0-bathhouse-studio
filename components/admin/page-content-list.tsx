"use client"

import type { PageContent } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit } from "lucide-react"

interface PageContentListProps {
  pages: PageContent[]
  onEdit: (page: PageContent) => void
}

export default function PageContentList({ pages, onEdit }: PageContentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Page Section</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((page) => (
          <TableRow key={page.id}>
            <TableCell className="font-medium">{page.title}</TableCell>
            <TableCell>
              <Button variant="outline" size="icon" onClick={() => onEdit(page)}>
                <Edit className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
