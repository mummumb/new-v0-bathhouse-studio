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
    const body = await request.json()
    const pages = getStandalonePages()

    const newPage = {
      id: Date.now(),
      title: body.title,
      slug: body.slug,
      content: body.content,
      status: body.status || "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
    }

    pages.push(newPage)
    saveStandalonePages(pages)

    return NextResponse.json(newPage, { status: 201 })
  } catch (error) {
    console.error("Error creating standalone page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
