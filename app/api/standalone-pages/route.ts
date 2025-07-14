import { NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePages } from "@/lib/data-utils"
import type { StandalonePage } from "@/lib/types"

export async function GET() {
  try {
    const pages = await getStandalonePages()
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching standalone pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newPage: Omit<StandalonePage, "id" | "createdAt" | "updatedAt"> = await request.json()
    const pages = await getStandalonePages()
    const id = pages.length > 0 ? Math.max(...pages.map((p) => p.id)) + 1 : 1
    const now = new Date().toISOString()

    const pageWithId: StandalonePage = {
      ...newPage,
      id,
      createdAt: now,
      updatedAt: now,
    }

    pages.push(pageWithId)
    await saveStandalonePages(pages)
    return NextResponse.json(pageWithId, { status: 201 })
  } catch (error) {
    console.error("Error creating standalone page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
