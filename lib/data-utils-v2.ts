import { prisma } from './db'
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from './types'

// Journal functions
export async function getJournalPosts(): Promise<JournalPost[]> {
  const posts = await prisma.journalPost.findMany({
    orderBy: { date: 'desc' }
  })
  
  return posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.authorName,
    publishedAt: post.date.toISOString(),
    image: post.image,
    tags: typeof post.categories === 'string' ? JSON.parse(post.categories) : post.categories || [],
    isPublished: true
  }))
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const post = await prisma.journalPost.findUnique({
    where: { slug }
  })
  
  if (!post) return null
  
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.authorName,
    publishedAt: post.date.toISOString(),
    image: post.image,
    tags: typeof post.categories === 'string' ? JSON.parse(post.categories) : post.categories || [],
    isPublished: true
  }
}

// Events functions  
export async function getEvents(): Promise<Event[]> {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { date: 'asc' }
  })
  
  return events.map(event => ({
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    date: event.date.toISOString(),
    time: event.time,
    location: event.location,
    price: event.price,
    capacity: event.capacity,
    image: event.image,
    isPublished: event.isPublished,
    category: event.category
  }))
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const event = await prisma.event.findUnique({
    where: { slug }
  })
  
  if (!event) return null
  
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    date: event.date.toISOString(),
    time: event.time,
    location: event.location,
    price: event.price,
    capacity: event.capacity,
    image: event.image,
    isPublished: event.isPublished,
    category: event.category
  }
}

// Page content functions
export async function getPageContent(): Promise<PageContent[]> {
  const pages = await prisma.pageContent.findMany()
  
  return pages.map(page => ({
    id: page.id,
    title: page.title || 'Untitled',
    content: page.content || '{}',
    section: page.section,
    lastUpdated: page.updatedAt.toISOString()
  }))
}

export async function getPageContentById(id: string): Promise<PageContent | null> {
  const page = await prisma.pageContent.findUnique({
    where: { id }
  })
  
  if (!page) return null
  
  return {
    id: page.id,
    title: page.title || 'Untitled',
    content: page.content || '{}',
    section: page.section,
    lastUpdated: page.updatedAt.toISOString()
  }
}

// Rituals functions - simplified to match types
export async function getRituals(): Promise<Ritual[]> {
  // For now, return empty array since Prisma schema doesn't match the complex Ritual type
  return []
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  // For now, return null since Prisma schema doesn't match the complex Ritual type
  return null
}

// Standalone pages functions
export async function getStandalonePages(): Promise<StandalonePage[]> {
  const pages = await prisma.standalonePage.findMany()
  
  return pages.map(page => ({
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: JSON.stringify({ hero: page.hero, sections: page.sections }),
    metaTitle: undefined,
    metaDescription: page.metaDescription || undefined,
    isPublished: true,
    createdAt: page.createdAt.toISOString(),
    updatedAt: page.updatedAt.toISOString()
  }))
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const page = await prisma.standalonePage.findUnique({
    where: { slug }
  })
  
  if (!page) return null
  
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: JSON.stringify({ hero: page.hero, sections: page.sections }),
    metaTitle: undefined,
    metaDescription: page.metaDescription || undefined,
    isPublished: true,
    createdAt: page.createdAt.toISOString(),
    updatedAt: page.updatedAt.toISOString()
  }
}

// Deprecated functions
export async function saveJournalPosts(posts: JournalPost[]): Promise<void> {
  throw new Error('saveJournalPosts is deprecated. Use Prisma directly.')
}

export async function saveEvents(events: Event[]): Promise<void> {
  throw new Error('saveEvents is deprecated. Use Prisma directly.')
}

export async function savePageContent(pages: PageContent[]): Promise<void> {
  throw new Error('savePageContent is deprecated. Use Prisma directly.')
}

export async function saveRituals(rituals: Ritual[]): Promise<void> {
  throw new Error('saveRituals is deprecated. Use Prisma directly.')
}

export async function saveStandalonePages(pages: StandalonePage[]): Promise<void> {
  throw new Error('saveStandalonePages is deprecated. Use Prisma directly.')
}
