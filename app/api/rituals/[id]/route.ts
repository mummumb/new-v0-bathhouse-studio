import { NextResponse } from "next/server"
import { getRituals, saveRituals } from "@/lib/data-utils"
import type { Ritual } from "@/lib/types"

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const rituals = await getRituals()
  const ritual = rituals.find((r) => r.id === Number.parseInt(params.id))
  if (!ritual) {
    return NextResponse.json({ error: "Ritual not found" }, { status: 404 })
  }
  return NextResponse.json(ritual)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedRitual: Ritual = await request.json()
  const rituals = await getRituals()
  const index = rituals.findIndex((r) => r.id === Number.parseInt(params.id))
  if (index === -1) {
    return NextResponse.json({ error: "Ritual not found" }, { status: 404 })
  }
  rituals[index] = updatedRitual
  await saveRituals(rituals)
  return NextResponse.json(updatedRitual)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const rituals = await getRituals()
  const filteredRituals = rituals.filter((r) => r.id !== Number.parseInt(params.id))
  if (rituals.length === filteredRituals.length) {
    return NextResponse.json({ error: "Ritual not found" }, { status: 404 })
  }
  await saveRituals(filteredRituals)
  return NextResponse.json({ message: "Ritual deleted" }, { status: 200 })
}
