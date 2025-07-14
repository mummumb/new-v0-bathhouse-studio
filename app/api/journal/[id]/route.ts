import { NextResponse } from "next/server"
import { getJournalPosts, saveJournalPosts } from "@/lib/data-utils"
import type { JournalPost } from "@/lib/types"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const posts = await getJournalPosts()
  const post = posts.find((p) => p.id === Number.parseInt(params.id))
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedPost: JournalPost = await request.json()
  const posts = await getJournalPosts()
  const index = posts.findIndex((p) => p.id === Number.parseInt(params.id))
  if (index === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  posts[index] = updatedPost
  await saveJournalPosts(posts)
  return NextResponse.json(updatedPost)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const posts = await getJournalPosts()
  const filteredPosts = posts.filter((p) => p.id !== Number.parseInt(params.id))
  if (posts.length === filteredPosts.length) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  await saveJournalPosts(filteredPosts)
  return NextResponse.json({ message: "Post deleted" }, { status: 200 })
}
