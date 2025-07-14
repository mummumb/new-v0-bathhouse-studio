import fs from "fs"
import path from "path"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

const dataDir = path.join(process.cwd(), "data")

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Journal functions
export function getJournalPosts(): JournalPost[] {
  try {
    const filePath = path.join(dataDir, "journal.json")
    if (!fs.existsSync(filePath)) {
      return []
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading journal posts:", error)
    return []
  }
}

export function saveJournalPosts(posts: JournalPost[]): void {
  try {
    const filePath = path.join(dataDir, "journal.json")
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error("Error saving journal posts:", error)
    throw error
  }
}

export function getJournalPostById(id: number): JournalPost | null {
  const posts = getJournalPosts()
  return posts.find((post) => post.id === id) || null
}

export function getJournalPostBySlug(slug: string): JournalPost | null {
  const posts = getJournalPosts()
  return posts.find((post) => post.slug === slug) || null
}

// Events functions
export function getEvents(): Event[] {
  try {
    const filePath = path.join(dataDir, "events.json")
    if (!fs.existsSync(filePath)) {
      return []
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading events:", error)
    return []
  }
}

export function saveEvents(events: Event[]): void {
  try {
    const filePath = path.join(dataDir, "events.json")
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2))
  } catch (error) {
    console.error("Error saving events:", error)
    throw error
  }
}

export function getEventById(id: number): Event | null {
  const events = getEvents()
  return events.find((event) => event.id === id) || null
}

export function getEventBySlug(slug: string): Event | null {
  const events = getEvents()
  return events.find((event) => event.slug === slug) || null
}

// Page content functions
export function getPageContent(): PageContent[] {
  try {
    const filePath = path.join(dataDir, "pages.json")
    if (!fs.existsSync(filePath)) {
      return []
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading page content:", error)
    return []
  }
}

export function savePageContent(pages: PageContent[]): void {
  try {
    const filePath = path.join(dataDir, "pages.json")
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
  } catch (error) {
    console.error("Error saving page content:", error)
    throw error
  }
}

export function getPageContentById(id: string): PageContent | null {
  const pages = getPageContent()
  return pages.find((page) => page.id === id) || null
}

// Rituals functions
export function getRituals(): Ritual[] {
  try {
    const filePath = path.join(dataDir, "rituals.json")
    if (!fs.existsSync(filePath)) {
      return []
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading rituals:", error)
    return []
  }
}

export function saveRituals(rituals: Ritual[]): void {
  try {
    const filePath = path.join(dataDir, "rituals.json")
    fs.writeFileSync(filePath, JSON.stringify(rituals, null, 2))
  } catch (error) {
    console.error("Error saving rituals:", error)
    throw error
  }
}

export function getRitualById(id: number): Ritual | null {
  const rituals = getRituals()
  return rituals.find((ritual) => ritual.id === id) || null
}

export function getRitualBySlug(slug: string): Ritual | null {
  const rituals = getRituals()
  return rituals.find((ritual) => ritual.slug === slug) || null
}

// Standalone pages functions
export function getStandalonePages(): StandalonePage[] {
  try {
    const filePath = path.join(dataDir, "standalone-pages.json")
    if (!fs.existsSync(filePath)) {
      return []
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading standalone pages:", error)
    return []
  }
}

export function saveStandalonePages(pages: StandalonePage[]): void {
  try {
    const filePath = path.join(dataDir, "standalone-pages.json")
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
  } catch (error) {
    console.error("Error saving standalone pages:", error)
    throw error
  }
}

export function getStandalonePageById(id: number): StandalonePage | null {
  const pages = getStandalonePages()
  return pages.find((page) => page.id === id) || null
}

export function getStandalonePageBySlug(slug: string): StandalonePage | null {
  const pages = getStandalonePages()
  return pages.find((page) => page.slug === slug) || null
}
