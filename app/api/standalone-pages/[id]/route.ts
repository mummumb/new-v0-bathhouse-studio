import { NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePages } from "@/lib/data-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const pages = await getStandalonePages()
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedPage = await request.json()
    const pages = await getStandalonePages()
    const index = pages.findIndex((p) => p.id === Number.parseInt(params.id))

    if (index === -1) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    pages[index] = {
      ...pages[index],
      ...updatedPage,
      id: Number.parseInt(params.id),
      updatedAt: new Date().toISOString(),
    }

    await saveStandalonePages(pages)
    return NextResponse.json(pages[index])
  } catch (error) {
    console.error("Error updating standalone page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const pages = await getStandalonePages()
    const filteredPages = pages.filter((p) => p.id !== Number.parseInt(params.id))

    if (filteredPages.length === pages.length) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    await saveStandalonePages(filteredPages)
    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting standalone page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
