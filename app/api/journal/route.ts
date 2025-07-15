import { NextResponse } from "next/server"
import { getJournalPosts, saveJournalPost } from "@/lib/data-utils"
import type { JournalPost } from "@/lib/types"

export async function GET() {
  try {
    const posts = await getJournalPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching journal posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch journal posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const newPost: Omit<JournalPost, "id"> = await request.json()

    // Add default values
    const postData = {
      ...newPost,
      id: 0, // Will be auto-generated in saveJournalPost
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: newPost.published ?? false,
    }

    const savedPost = await saveJournalPost(postData as JournalPost)
    return NextResponse.json(savedPost, { status: 201 })
  } catch (error) {
    console.error("Error creating journal post:", error)
    return NextResponse.json(
      { error: "Failed to create journal post" },
      { status: 500 }
    )
  }
}
