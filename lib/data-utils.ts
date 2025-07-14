import fs from "fs"
import path from "path"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

const dataDir = path.join(process.cwd(), "data")

// Journal functions
export function getJournalPosts(): JournalPost[] {
  try {
    const filePath = path.join(dataDir, "journal.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading journal posts:", error)
    return []
  }
}

export function saveJournalPosts(posts: JournalPost[]): void {
  const filePath = path.join(dataDir, "journal.json")
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
}

export function getJournalPostById(id: number): JournalPost | undefined {
  const posts = getJournalPosts()
  return posts.find((post) => post.id === id)
}

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  const posts = getJournalPosts()
  return posts.find((post) => post.slug === slug)
}

// Events functions
export function getEvents(): Event[] {
  try {
    const filePath = path.join(dataDir, "events.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading events:", error)
    return []
  }
}

export function saveEvents(events: Event[]): void {
  const filePath = path.join(dataDir, "events.json")
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2))
}

export function getEventById(id: number): Event | undefined {
  const events = getEvents()
  return events.find((event) => event.id === id)
}

export function getEventBySlug(slug: string): Event | undefined {
  const events = getEvents()
  return events.find((event) => event.slug === slug)
}

// Page content functions
export function getPageContent(): PageContent[] {
  try {
    const filePath = path.join(dataDir, "pages.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading page content:", error)
    return []
  }
}

export function savePageContent(pages: PageContent[]): void {
  const filePath = path.join(dataDir, "pages.json")
  fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
}

export function getPageContentById(id: string): PageContent | undefined {
  const pages = getPageContent()
  return pages.find((page) => page.id === id)
}

// Rituals functions
export function getRituals(): Ritual[] {
  try {
    const filePath = path.join(dataDir, "rituals.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading rituals:", error)
    return []
  }
}

export function saveRituals(rituals: Ritual[]): void {
  const filePath = path.join(dataDir, "rituals.json")
  fs.writeFileSync(filePath, JSON.stringify(rituals, null, 2))
}

export function getRitualById(id: number): Ritual | undefined {
  const rituals = getRituals()
  return rituals.find((ritual) => ritual.id === id)
}

export function getRitualBySlug(slug: string): Ritual | undefined {
  const rituals = getRituals()
  return rituals.find((ritual) => ritual.slug === slug)
}

// Standalone pages functions
export function getStandalonePages(): StandalonePage[] {
  try {
    const filePath = path.join(dataDir, "standalone-pages.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading standalone pages:", error)
    return []
  }
}

export function saveStandalonePages(pages: StandalonePage[]): void {
  const filePath = path.join(dataDir, "standalone-pages.json")
  fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
}

export function getStandalonePageById(id: number): StandalonePage | undefined {
  const pages = getStandalonePages()
  return pages.find((page) => page.id === id)
}

export function getStandalonePageBySlug(slug: string): StandalonePage | undefined {
  const pages = getStandalonePages()
  return pages.find((page) => page.slug === slug)
}
