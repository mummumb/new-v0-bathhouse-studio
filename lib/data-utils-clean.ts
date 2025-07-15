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

// Page content functions
export async function getPageContent(): Promise<PageContent[]> {
  const pages = await prisma.pageContent.findMany()
  
  return pages.map(page => ({
    id: page.id,
    page: page.page,
    section: page.section,
    title: page.title || undefined,
    subtitle: page.subtitle || undefined,
    content: (() => {
      try {
        if (!page.content) return {};
        return JSON.parse(page.content);
      } catch {
        return {};
      }
    })(),
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
    content: (() => {
      try {
        return JSON.parse(page.content);
      } catch {
        return {};
      }
    })(),
    backgroundImage: page.backgroundImage || undefined,
    overlayOpacity: page.overlayOpacity || undefined
  }
}

// Rituals functions
export async function getRituals(): Promise<Ritual[]> {
  const rituals = await prisma.ritual.findMany()
  
  return rituals.map(ritual => ({
    ...ritual,
    benefits: (() => {
      try {
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        return JSON.parse(ritual.whatToExpect) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
        return [];
      }
    })(),
    contraindications: (() => {
      try {
        return JSON.parse(ritual.contraindications) as string[];
      } catch {
        return [];
      }
    })()
  }))
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const ritual = await prisma.ritual.findUnique({
    where: { slug }
  })
  
  if (!ritual) return null
  
  return {
    ...ritual,
    benefits: (() => {
      try {
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        return JSON.parse(ritual.whatToExpected) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
        return [];
      }
    })(),
    contraindications: (() => {
      try {
        return JSON.parse(ritual.contraindications) as string[];
      } catch {
        return [];
      }
    })()
  }
}

// Standalone pages functions
export async function getStandalonePages(): Promise<StandalonePage[]> {
  const pages = await prisma.standalonePage.findMany()
  
  return pages.map(page => ({
    ...page,
    hero: (() => {
      try {
        return page.hero ? JSON.parse(page.hero) : undefined;
      } catch {
        return undefined;
      }
    })(),
    sections: (() => {
      try {
        return page.sections ? JSON.parse(page.sections) : undefined;
      } catch {
        return undefined;
      }
    })()
  }))
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const page = await prisma.standalonePage.findUnique({
    where: { slug }
  })
  
  if (!page) return null
  
  return {
    ...page,
    hero: (() => {
      try {
        return page.hero ? JSON.parse(page.hero) : undefined;
      } catch {
        return undefined;
      }
    })(),
    sections: (() => {
      try {
        return page.sections ? JSON.parse(page.sections) : undefined;
      } catch {
        return undefined;
      }
    })()
  }
}

// Deprecated functions - use Prisma directly in API routes
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
