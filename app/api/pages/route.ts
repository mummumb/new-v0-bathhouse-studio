import { NextResponse } from "next/server"
import { getPageContent } from "@/lib/data-utils"

export const dynamic = 'force-dynamic'

export async function GET() {
  const pages = await getPageContent()
  return NextResponse.json(pages)
}
