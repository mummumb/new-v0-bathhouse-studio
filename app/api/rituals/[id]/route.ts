import { NextResponse } from "next/server"
import { getRitualById, saveRitual, deleteRitual } from "@/lib/data-utils"
import type { Ritual } from "@/lib/types"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ritual = await getRitualById(params.id)
    if (!ritual) {
      return NextResponse.json(
        { error: "Ritual not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(ritual)
  } catch (error) {
    console.error("Error fetching ritual:", error)
    return NextResponse.json(
      { error: "Failed to fetch ritual" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates: Partial<Ritual> = await request.json()

    // Get existing ritual
    const existingRitual = await getRitualById(params.id)
    if (!existingRitual) {
      return NextResponse.json(
        { error: "Ritual not found" },
        { status: 404 }
      )
    }

    // Merge updates with existing ritual
    const updatedRitual = {
      ...existingRitual,
      ...updates,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    const savedRitual = await saveRitual(updatedRitual)
    return NextResponse.json(savedRitual)
  } catch (error) {
    console.error("Error updating ritual:", error)
    return NextResponse.json(
      { error: "Failed to update ritual" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteRitual(params.id)
    if (!success) {
      return NextResponse.json(
        { error: "Ritual not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting ritual:", error)
    return NextResponse.json(
      { error: "Failed to delete ritual" },
      { status: 500 }
    )
  }
}
