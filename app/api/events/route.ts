import { NextResponse } from "next/server"
import { getEvents, saveEvent } from "@/lib/data-utils"
import type { Event } from "@/lib/types"

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const newEvent: Omit<Event, "id"> = await request.json()

    // Add default values
    const eventData = {
      ...newEvent,
      id: 0, // Will be auto-generated in saveEvent
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: newEvent.published ?? false,
    }

    const savedEvent = await saveEvent(eventData as Event)
    return NextResponse.json(savedEvent, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}
