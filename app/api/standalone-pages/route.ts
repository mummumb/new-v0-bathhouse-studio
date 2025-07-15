import { NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePage } from "@/lib/data-utils"
import type { StandalonePage } from "@/lib/types"

export async function GET() {
  try {
    const pages = await getStandalonePages()
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching standalone pages:", error)
    return NextResponse.json(
      { error: "Failed to fetch standalone pages" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const newPage: Omit<StandalonePage, "id"> & { id?: string } = await request.json()

    // Generate ID if not provided
    const pageId = newPage.id || Date.now()

    // Add default values
    const pageData = {
      ...newPage,
      id: pageId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: newPage.isPublished ?? false,
    }

    const savedPage = await saveStandalonePage(pageData as StandalonePage)
    return NextResponse.json(savedPage, { status: 201 })
  } catch (error) {
    console.error("Error creating standalone page:", error)
    return NextResponse.json(
      { error: "Failed to create standalone page" },
      { status: 500 }
    )
  }
}
