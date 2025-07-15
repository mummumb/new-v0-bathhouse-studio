import { NextResponse } from "next/server"
import { getRituals, saveRitual } from "@/lib/data-utils"
import type { Ritual } from "@/lib/types"

export async function GET() {
  try {
    const rituals = await getRituals()
    return NextResponse.json(rituals)
  } catch (error) {
    console.error("Error fetching rituals:", error)
    return NextResponse.json(
      { error: "Failed to fetch rituals" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const newRitual: Omit<Ritual, "id"> & { id?: string } = await request.json()

    // Generate ID if not provided
    const ritualId = newRitual.id || `ritual-${Date.now()}`

    // Add default values
    const ritualData = {
      ...newRitual,
      id: ritualId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: newRitual.published ?? false,
    }

    const savedRitual = await saveRitual(ritualData as Ritual)
    return NextResponse.json(savedRitual, { status: 201 })
  } catch (error) {
    console.error("Error creating ritual:", error)
    return NextResponse.json(
      { error: "Failed to create ritual" },
      { status: 500 }
    )
  }
}
