import { type NextRequest, NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePages } from "@/lib/data-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pages = getStandalonePages()
    const page = pages.find((p) => p.id === Number.parseInt(params.id))

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error fetching standalone page:", error)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const pages = getStandalonePages()
    const pageIndex = pages.findIndex((p) => p.id === Number.parseInt(params.id))

    if (pageIndex === -1) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    pages[pageIndex] = {
      ...pages[pageIndex],
      title: body.title,
      slug: body.slug,
      content: body.content,
      status: body.status,
      updatedAt: new Date().toISOString(),
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
    }

    saveStandalonePages(pages)

    return NextResponse.json(pages[pageIndex])
  } catch (error) {
    console.error("Error updating standalone page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pages = getStandalonePages()
    const filteredPages = pages.filter((p) => p.id !== Number.parseInt(params.id))

    if (filteredPages.length === pages.length) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    saveStandalonePages(filteredPages)

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting standalone page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
