import { NextResponse } from "next/server"
import { getJournalPosts, saveJournalPosts } from "@/lib/data-utils"
import type { JournalPost } from "@/lib/types"

export async function GET() {
  const posts = await getJournalPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const newPost: Omit<JournalPost, "id"> = await request.json()
  const posts = await getJournalPosts()
  const id = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1
  const postWithId = { ...newPost, id }
  posts.push(postWithId)
  await saveJournalPosts(posts)
  return NextResponse.json(postWithId, { status: 201 })
}
