import { NextResponse } from "next/server"
import { getPageContent } from "@/lib/data-utils"

export async function GET() {
  const pages = await getPageContent()
  return NextResponse.json(pages)
}
