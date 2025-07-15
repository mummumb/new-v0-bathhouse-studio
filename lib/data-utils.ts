import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from './types'

// Fallback data imports for when database is not available
let journalData: any[] = []
let eventsData: any[] = []
let pageContentData: any[] = []
let ritualsData: any[] = []
let standalonePagesData: any[] = []

// Try to import JSON data as fallback
try {
  journalData = require('../data/journal.json')
  eventsData = require('../data/events.json') 
  pageContentData = require('../data/pages.json')
  ritualsData = require('../data/rituals.json')
  standalonePagesData = require('../data/standalone-pages.json')
} catch (error) {
  console.warn('JSON fallback data not available:', error)
}

// Journal functions - using fallback data for build
export async function getJournalPosts(): Promise<JournalPost[]> {
  return journalData.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    publishedAt: post.publishedAt,
    image: post.image,
    tags: post.tags || [],
    isPublished: post.isPublished !== false
  }))
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const post = journalData.find(p => p.slug === slug)
  return post ? {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    publishedAt: post.publishedAt,
    image: post.image,
    tags: post.tags || [],
    isPublished: post.isPublished !== false
  } : null
}

// Events functions using fallback data
export async function getEvents(): Promise<Event[]> {
  return eventsData.map(event => ({
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    price: event.price,
    capacity: event.capacity,
    image: event.image,
    isPublished: event.isPublished !== false,
    category: event.category
  }))
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const event = eventsData.find(e => e.slug === slug)
  return event ? {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    price: event.price,
    capacity: event.capacity,
    image: event.image,
    isPublished: event.isPublished !== false,
    category: event.category
  } : null
}

// Page content functions using fallback data
export async function getPageContent(): Promise<PageContent[]> {
  return pageContentData.map(page => ({
    id: page.id,
    title: page.title,
    content: page.content,
    section: page.section,
    lastUpdated: page.lastUpdated
  }))
}

export async function getPageContentById(id: string): Promise<PageContent | null> {
  const page = pageContentData.find(p => p.id === id)
  return page ? {
    id: page.id,
    title: page.title,
    content: page.content,
    section: page.section,
    lastUpdated: page.lastUpdated
  } : null
}

// Rituals functions using fallback data
export async function getRituals(): Promise<Ritual[]> {
  return ritualsData.map(ritual => ({
    id: ritual.id,
    title: ritual.title,
    slug: ritual.slug,
    subtitle: ritual.subtitle,
    number: ritual.number,
    description: ritual.description,
    fullDescription: ritual.fullDescription,
    image: ritual.image,
    imageAlt: ritual.imageAlt,
    date: ritual.date,
    location: ritual.location,
    icon: ritual.icon,
    isPublished: ritual.isPublished !== false,
    benefits: ritual.benefits || [],
    duration: ritual.duration,
    instructor: ritual.instructor || { name: '', bio: '', image: '' },
    schedule: ritual.schedule || [],
    faq: ritual.faq || []
  }))
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const ritual = ritualsData.find(r => r.slug === slug)
  return ritual ? {
    id: ritual.id,
    title: ritual.title,
    slug: ritual.slug,
    subtitle: ritual.subtitle,
    number: ritual.number,
    description: ritual.description,
    fullDescription: ritual.fullDescription,
    image: ritual.image,
    imageAlt: ritual.imageAlt,
    date: ritual.date,
    location: ritual.location,
    icon: ritual.icon,
    isPublished: ritual.isPublished !== false,
    benefits: ritual.benefits || [],
    duration: ritual.duration,
    instructor: ritual.instructor || { name: '', bio: '', image: '' },
    schedule: ritual.schedule || [],
    faq: ritual.faq || []
  } : null
}

// Standalone pages functions using fallback data
export async function getStandalonePages(): Promise<StandalonePage[]> {
  return standalonePagesData.map(page => ({
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: page.content,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    isPublished: page.isPublished !== false,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt
  }))
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const page = standalonePagesData.find(p => p.slug === slug)
  return page ? {
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: page.content,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    isPublished: page.isPublished !== false,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt
  } : null
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
