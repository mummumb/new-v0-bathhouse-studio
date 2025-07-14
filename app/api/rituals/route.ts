import { NextResponse } from "next/server"
import { getRituals, saveRituals } from "@/lib/data-utils"
import type { Ritual } from "@/lib/types"

export async function GET() {
  const rituals = await getRituals()
  return NextResponse.json(rituals)
}

export async function POST(request: Request) {
  const newRitual: Omit<Ritual, "id"> = await request.json()
  const rituals = await getRituals()
  const id = rituals.length > 0 ? Math.max(...rituals.map((r) => r.id)) + 1 : 1
  const ritualWithId = { ...newRitual, id }
  rituals.push(ritualWithId)
  await saveRituals(rituals)
  return NextResponse.json(ritualWithId, { status: 201 })
}
