import { NextResponse } from "next/server"
import { getPageContent, savePage } from "@/lib/data-utils"
import type { PageContent } from "@/lib/types"

export async function GET() {
  try {
    const pages = await getPageContent()
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const newPage: PageContent = await request.json()

    // Add default values
    const pageData = {
      ...newPage,
      updatedAt: new Date().toISOString(),
    }

    const savedPage = await savePage(pageData)
    return NextResponse.json(savedPage, { status: 201 })
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    )
  }
}
