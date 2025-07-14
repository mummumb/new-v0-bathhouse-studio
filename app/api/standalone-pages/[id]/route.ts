import { type NextRequest, NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePage, deleteStandalonePage } from "@/lib/data-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pages = await getStandalonePages()
    const page = pages.find((p) => p.id === params.id)

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error fetching standalone page:", error)
    return NextResponse.json({ error: "Failed to fetch standalone page" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const updatedPage = await saveStandalonePage({ ...data, id: params.id })
    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error("Error updating standalone page:", error)
    return NextResponse.json({ error: "Failed to update standalone page" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteStandalonePage(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting standalone page:", error)
    return NextResponse.json({ error: "Failed to delete standalone page" }, { status: 500 })
  }
}
