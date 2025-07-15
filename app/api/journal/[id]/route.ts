import { NextResponse } from "next/server"
import { getJournalPostById, saveJournalPost, deleteJournalPost } from "@/lib/data-utils"
import type { JournalPost } from "@/lib/types"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid journal post ID" },
        { status: 400 }
      )
    }

    const post = await getJournalPostById(id)
    if (!post) {
      return NextResponse.json(
        { error: "Journal post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching journal post:", error)
    return NextResponse.json(
      { error: "Failed to fetch journal post" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid journal post ID" },
        { status: 400 }
      )
    }

    const updates: Partial<JournalPost> = await request.json()
    
    // Get existing post
    const existingPost = await getJournalPostById(id)
    if (!existingPost) {
      return NextResponse.json(
        { error: "Journal post not found" },
        { status: 404 }
      )
    }

    // Merge updates with existing post
    const updatedPost = {
      ...existingPost,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    const savedPost = await saveJournalPost(updatedPost)
    return NextResponse.json(savedPost)
  } catch (error) {
    console.error("Error updating journal post:", error)
    return NextResponse.json(
      { error: "Failed to update journal post" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid journal post ID" },
        { status: 400 }
      )
    }

    const success = await deleteJournalPost(id)
    if (!success) {
      return NextResponse.json(
        { error: "Journal post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting journal post:", error)
    return NextResponse.json(
      { error: "Failed to delete journal post" },
      { status: 500 }
    )
  }
}
