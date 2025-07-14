import { NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePages } from "@/lib/data-utils"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedPage = await request.json()
    const pages = getStandalonePages()

    const index = pages.findIndex((page) => page.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    pages[index] = { ...pages[index], ...updatedPage }
    saveStandalonePages(pages)

    return NextResponse.json(pages[index])
  } catch (error) {
    console.error("Error updating standalone page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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
