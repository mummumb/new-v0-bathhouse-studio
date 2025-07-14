import { type NextRequest, NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePages } from "@/lib/data-utils"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedData = await request.json()
    const pages = getStandalonePages()

    const pageIndex = pages.findIndex((page) => page.id === id)
    if (pageIndex === -1) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    pages[pageIndex] = {
      ...pages[pageIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
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
    const id = Number.parseInt(params.id)
    const pages = getStandalonePages()

    const filteredPages = pages.filter((page) => page.id !== id)
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
