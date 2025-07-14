import { type NextRequest, NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePages } from "@/lib/data-utils"
import type { StandalonePage } from "@/lib/types"

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
    const newPage: Omit<StandalonePage, "id" | "createdAt" | "updatedAt"> = await request.json()
    const pages = getStandalonePages()

    const page: StandalonePage = {
      ...newPage,
      id: Math.max(0, ...pages.map((p) => p.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    pages.push(page)
    saveStandalonePages(pages)

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error("Error creating standalone page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
