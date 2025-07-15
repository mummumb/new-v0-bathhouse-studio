import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(params.id) }
    })
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    console.error('Failed to fetch event:', error)
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(params.id) },
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
        isPublished: data.isPublished,
      }
    })
    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Failed to update event:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.event.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: "Event deleted" }, { status: 200 })
  } catch (error) {
    console.error('Failed to delete event:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
