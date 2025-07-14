import fs from "fs"
import path from "path"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

const dataDir = path.join(process.cwd(), "data")

// Journal functions
export async function getJournalPosts(): Promise<JournalPost[]> {
  const filePath = path.join(dataDir, "journal.json")
  if (!fs.existsSync(filePath)) {
    return []
  }
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const posts = await getJournalPosts()
  return posts.find((post) => post.slug === slug) || null
}

export async function saveJournalPosts(posts: JournalPost[]): Promise<void> {
  const filePath = path.join(dataDir, "journal.json")
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
}

// Events functions
export async function getEvents(): Promise<Event[]> {
  const filePath = path.join(dataDir, "events.json")
  if (!fs.existsSync(filePath)) {
    return []
  }
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getEvents()
  return events.find((event) => event.slug === slug) || null
}

export async function saveEvents(events: Event[]): Promise<void> {
  const filePath = path.join(dataDir, "events.json")
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2))
}

// Page content functions
export async function getPageContent(): Promise<PageContent[]> {
  const filePath = path.join(dataDir, "pages.json")
  if (!fs.existsSync(filePath)) {
    return []
  }
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getPageContentById(id: string): Promise<PageContent | null> {
  const pages = await getPageContent()
  return pages.find((page) => page.id === id) || null
}

export async function savePageContent(pages: PageContent[]): Promise<void> {
  const filePath = path.join(dataDir, "pages.json")
  fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
}

// Rituals functions
export async function getRituals(): Promise<Ritual[]> {
  const filePath = path.join(dataDir, "rituals.json")
  if (!fs.existsSync(filePath)) {
    return []
  }
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const rituals = await getRituals()
  return rituals.find((ritual) => ritual.slug === slug) || null
}

export async function saveRituals(rituals: Ritual[]): Promise<void> {
  const filePath = path.join(dataDir, "rituals.json")
  fs.writeFileSync(filePath, JSON.stringify(rituals, null, 2))
}

// Standalone pages functions
export async function getStandalonePages(): Promise<StandalonePage[]> {
  const filePath = path.join(dataDir, "standalone-pages.json")
  if (!fs.existsSync(filePath)) {
    return []
  }
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const pages = await getStandalonePages()
  return pages.find((page) => page.slug === slug) || null
}

export async function saveStandalonePages(pages: StandalonePage[]): Promise<void> {
  const filePath = path.join(dataDir, "standalone-pages.json")
  fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
}
