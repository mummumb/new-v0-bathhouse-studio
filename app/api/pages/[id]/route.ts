import { NextResponse } from "next/server"
import { getPageContent, savePageContent } from "@/lib/data-utils"
import type { PageContent } from "@/lib/types"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const pages = await getPageContent()
  const page = pages.find((p) => p.id === params.id)
  if (!page) {
    return NextResponse.json({ error: "Page content not found" }, { status: 404 })
  }
  return NextResponse.json(page)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedPage: PageContent = await request.json()
  const pages = await getPageContent()
  const index = pages.findIndex((p) => p.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Page content not found" }, { status: 404 })
  }
  pages[index] = updatedPage
  await savePageContent(pages)
  return NextResponse.json(updatedPage)
}
