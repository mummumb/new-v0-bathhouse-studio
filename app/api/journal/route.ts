import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

// Helper to format a journal post from DB to API response
function formatJournalPost(post: any) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date instanceof Date ? post.date.toISOString() : post.date,
    readTime: post.readTime,
    categories: typeof post.categories === 'string' ? JSON.parse(post.categories) : post.categories,
    author: {
      name: post.authorName,
      avatar: post.authorAvatar
    },
    image: post.image,
    imageAlt: post.imageAlt,
    content: post.content
  }
}

export async function GET() {
  try {
    const posts = await prisma.journalPost.findMany({
      orderBy: { date: 'desc' }
    })
    // Parse categories back to array and format response
    const formattedPosts = posts.map(formatJournalPost)
    return NextResponse.json(formattedPosts)
  } catch (error) {
    console.error('Failed to fetch journal posts:', error)
    return NextResponse.json({ error: 'Failed to fetch journal posts' }, { status: 500 })
  }
}
    const posts = await prisma.journalPost.findMany({
      orderBy: { date: 'desc' }
    })
    // Parse categories back to array and format response
    const formattedPosts = posts.map(formatJournalPost)
    return NextResponse.json(formattedPosts)
  } catch (error) {
    console.error('Failed to fetch journal posts:', error)
    return NextResponse.json({ error: 'Failed to fetch journal posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newPost = await prisma.journalPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        date: new Date(data.date),
        readTime: data.readTime,
        categories: JSON.stringify(data.categories),
        authorName: data.author.name,
        authorAvatar: data.author.avatar,
        image: data.image,
        imageAlt: data.imageAlt,
        content: data.content,
      }
    })
    
    // Format response
    const formattedPost = {
      id: newPost.id,
      slug: newPost.slug,
      title: newPost.title,
      excerpt: newPost.excerpt,
      date: newPost.date.toISOString(),
      readTime: newPost.readTime,
      categories: JSON.parse(newPost.categories),
      author: {
        name: newPost.authorName,
        avatar: newPost.authorAvatar
      },
      image: newPost.image,
      imageAlt: newPost.imageAlt,
      content: newPost.content
    }
    
    return NextResponse.json(formattedPost, { status: 201 })
  } catch (error) {
    console.error('Failed to create journal post:', error)
    return NextResponse.json({ error: 'Failed to create journal post' }, { status: 500 })
  }
}
