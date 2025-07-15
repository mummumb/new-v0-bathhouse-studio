import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newEvent = await prisma.event.create({
      data: {
        slug: data.slug,
        title: data.title,
        category: data.category,
        description: data.description,
        image: data.image,
        date: new Date(data.date),
        time: data.time,
        location: data.location,
        capacity: data.capacity,
        price: data.price,
        isPublished: data.isPublished ?? true,
      }
    })
    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error('Failed to create event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
