import { prisma } from "./db"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

// Journal functions
export async function getJournalPosts(): Promise<JournalPost[]> {
  const posts = await prisma.journalPost.findMany({
    orderBy: { date: 'desc' }
  })
  
  return posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date.toISOString(),
    readTime: post.readTime,
    categories: JSON.parse(post.categories) as string[],
    author: {
      name: post.authorName,
      avatar: post.authorAvatar
    },
    image: post.image,
    imageAlt: post.imageAlt,
    content: post.content
  }))
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const post = await prisma.journalPost.findUnique({
    where: { slug }
  })
  
  if (!post) return null
  
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date.toISOString(),
    readTime: post.readTime,
    categories: JSON.parse(post.categories) as string[],
    author: {
      name: post.authorName,
      avatar: post.authorAvatar
    },
    image: post.image,
    imageAlt: post.imageAlt,
    content: post.content
  }
}

export async function saveJournalPosts(posts: JournalPost[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveJournalPosts is deprecated. Use Prisma directly.')
}

// Events functions
export async function getEvents(): Promise<Event[]> {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' }
  })
  
  return events.map(event => ({
    ...event,
    date: event.date.toISOString()
  }))
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const event = await prisma.event.findUnique({
    where: { slug }
  })
  
  if (!event) return null
  
  return {
    ...event,
    date: event.date.toISOString()
  }
}

export async function saveEvents(events: Event[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveEvents is deprecated. Use Prisma directly.')
}

// Page content functions
export async function getPageContent(): Promise<PageContent[]> {
  const pages = await prisma.pageContent.findMany()
  
  return pages.map(page => ({
    id: page.id,
    page: page.page,
    section: page.section,
    title: page.title || undefined,
    subtitle: page.subtitle || undefined,
    content: JSON.parse(page.content),
    backgroundImage: page.backgroundImage || undefined,
    overlayOpacity: page.overlayOpacity || undefined
  }))
}

export async function getPageContentById(id: string): Promise<PageContent | null> {
  const page = await prisma.pageContent.findUnique({
    where: { id }
  })
  
  if (!page) return null
  
  return {
    id: page.id,
    page: page.page,
    section: page.section,
    title: page.title || undefined,
    subtitle: page.subtitle || undefined,
    content: JSON.parse(page.content),
    backgroundImage: page.backgroundImage || undefined,
    overlayOpacity: page.overlayOpacity || undefined
  }
}

export async function savePageContent(pages: PageContent[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('savePageContent is deprecated. Use Prisma directly.')
}

// Rituals functions
export async function getRituals(): Promise<Ritual[]> {
  const rituals = await prisma.ritual.findMany()
  
  return rituals.map(ritual => ({
    id: ritual.id,
    slug: ritual.slug,
    title: ritual.title,
    category: ritual.category,
    shortDescription: ritual.shortDescription,
    fullDescription: ritual.fullDescription,
    duration: ritual.duration,
    price: ritual.price,
    capacity: ritual.capacity,
    benefits: JSON.parse(ritual.benefits) as string[],
    whatToExpect: JSON.parse(ritual.whatToExpect) as string[],
    whoIsItFor: JSON.parse(ritual.whoIsItFor) as string[],
    contraindications: JSON.parse(ritual.contraindications) as string[],
    image: ritual.image,
    imageAlt: ritual.imageAlt
  }))
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const ritual = await prisma.ritual.findUnique({
    where: { slug }
  })
  
  if (!ritual) return null
  
  return {
    id: ritual.id,
    slug: ritual.slug,
    title: ritual.title,
    category: ritual.category,
    shortDescription: ritual.shortDescription,
    fullDescription: ritual.fullDescription,
    duration: ritual.duration,
    price: ritual.price,
    capacity: ritual.capacity,
    benefits: JSON.parse(ritual.benefits) as string[],
    whatToExpect: JSON.parse(ritual.whatToExpect) as string[],
    whoIsItFor: JSON.parse(ritual.whoIsItFor) as string[],
    contraindications: JSON.parse(ritual.contraindications) as string[],
    image: ritual.image,
    imageAlt: ritual.imageAlt
  }
}

export async function saveRituals(rituals: Ritual[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveRituals is deprecated. Use Prisma directly.')
}

// Standalone pages functions
export async function getStandalonePages(): Promise<StandalonePage[]> {
  const pages = await prisma.standalonePage.findMany()
  
  return pages.map(page => ({
    id: page.id,
    slug: page.slug,
    title: page.title,
    metaDescription: page.metaDescription || undefined,
    hero: page.hero ? JSON.parse(page.hero) : undefined,
    sections: page.sections ? JSON.parse(page.sections) : []
  }))
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const page = await prisma.standalonePage.findUnique({
    where: { slug }
  })
  
  if (!page) return null
  
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    metaDescription: page.metaDescription || undefined,
    hero: page.hero ? JSON.parse(page.hero) : undefined,
    sections: page.sections ? JSON.parse(page.sections) : []
  }
}

export async function saveStandalonePages(pages: StandalonePage[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveStandalonePages is deprecated. Use Prisma directly.')
}
