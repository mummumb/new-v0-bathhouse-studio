import { NextResponse } from "next/server"
import { getEvents, saveEvents } from "@/lib/data-utils"
import type { Event } from "@/lib/types"

export async function GET() {
  const events = await getEvents()
  return NextResponse.json(events)
}

export async function POST(request: Request) {
  const newEvent: Omit<Event, "id"> = await request.json()
  const events = await getEvents()
  const id = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1
  const eventWithId = { ...newEvent, id }
  events.push(eventWithId)
  await saveEvents(events)
  return NextResponse.json(eventWithId, { status: 201 })
}
