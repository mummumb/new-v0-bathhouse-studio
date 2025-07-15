import { NextResponse } from "next/server"
import { getStandalonePageById, saveStandalonePage, deleteStandalonePage } from "@/lib/data-utils"
import type { StandalonePage } from "@/lib/types"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const page = await getStandalonePageById(params.id)
    if (!page) {
      return NextResponse.json(
        { error: "Standalone page not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error fetching standalone page:", error)
    return NextResponse.json(
      { error: "Failed to fetch standalone page" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates: Partial<StandalonePage> = await request.json()
    
    // Get existing page
    const existingPage = await getStandalonePageById(params.id)
    if (!existingPage) {
      return NextResponse.json(
        { error: "Standalone page not found" },
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

    const savedPage = await saveStandalonePage(updatedPage)
    return NextResponse.json(savedPage)
  } catch (error) {
    console.error("Error updating standalone page:", error)
    return NextResponse.json(
      { error: "Failed to update standalone page" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteStandalonePage(params.id)
    if (!success) {
      return NextResponse.json(
        { error: "Standalone page not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting standalone page:", error)
    return NextResponse.json(
      { error: "Failed to delete standalone page" },
      { status: 500 }
    )
  }
}
