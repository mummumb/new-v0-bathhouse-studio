import { type NextRequest, NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePages } from "@/lib/data-utils"

export async function GET() {
  try {
    const pages = getStandalonePages()
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching standalone pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newPage = await request.json()
    const pages = getStandalonePages()

    // Generate new ID
    const maxId = pages.length > 0 ? Math.max(...pages.map((p) => p.id)) : 0
    newPage.id = maxId + 1
    newPage.createdAt = new Date().toISOString()
    newPage.updatedAt = new Date().toISOString()

    pages.push(newPage)
    saveStandalonePages(pages)

    return NextResponse.json(newPage, { status: 201 })
  } catch (error) {
    console.error("Error creating standalone page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
