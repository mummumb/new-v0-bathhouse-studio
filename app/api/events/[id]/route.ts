import { NextResponse } from "next/server"
import { getEvents, saveEvents } from "@/lib/data-utils"
import type { Event } from "@/lib/types"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const events = await getEvents()
  const event = events.find((e) => e.id === Number.parseInt(params.id))
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }
  return NextResponse.json(event)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedEvent: Event = await request.json()
  const events = await getEvents()
  const index = events.findIndex((e) => e.id === Number.parseInt(params.id))
  if (index === -1) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }
  events[index] = updatedEvent
  await saveEvents(events)
  return NextResponse.json(updatedEvent)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const events = await getEvents()
  const filteredEvents = events.filter((e) => e.id !== Number.parseInt(params.id))
  if (events.length === filteredEvents.length) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }
  await saveEvents(filteredEvents)
  return NextResponse.json({ message: "Event deleted" }, { status: 200 })
}
