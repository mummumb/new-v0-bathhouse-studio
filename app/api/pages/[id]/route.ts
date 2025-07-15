import { NextResponse } from "next/server"
import { getPageContentById, savePage, deletePage } from "@/lib/data-utils"
import type { PageContent } from "@/lib/types"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const page = await getPageContentById(params.id)
    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates: Partial<PageContent> = await request.json()
    
    // Get existing page
    const existingPage = await getPageContentById(params.id)
    if (!existingPage) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      )
    }

    // Merge updates with existing page
    const updatedPage = {
      ...existingPage,
      ...updates,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    const savedPage = await savePage(updatedPage)
    return NextResponse.json(savedPage)
  } catch (error) {
    console.error("Error updating page:", error)
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deletePage(params.id)
    if (!success) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    )
  }
}
