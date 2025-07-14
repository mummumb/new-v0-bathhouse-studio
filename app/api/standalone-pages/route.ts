import { type NextRequest, NextResponse } from "next/server"
import { getStandalonePages, saveStandalonePage } from "@/lib/data-utils"

export async function GET() {
  try {
    const pages = await getStandalonePages()
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching standalone pages:", error)
    return NextResponse.json({ error: "Failed to fetch standalone pages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const savedPage = await saveStandalonePage(data)
    return NextResponse.json(savedPage)
  } catch (error) {
    console.error("Error creating standalone page:", error)
    return NextResponse.json({ error: "Failed to create standalone page" }, { status: 500 })
  }
}
