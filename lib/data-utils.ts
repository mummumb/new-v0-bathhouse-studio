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
  try {
    const filePath = path.join(dataDir, "journal.json")
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error("Error saving journal posts:", error)
    throw error
  }
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
  try {
    const filePath = path.join(dataDir, "events.json")
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2))
  } catch (error) {
    console.error("Error saving events:", error)
    throw error
  }
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
  try {
    const filePath = path.join(dataDir, "pages.json")
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
  } catch (error) {
    console.error("Error saving page content:", error)
    throw error
  }
}

// Rituals functions
export function getRitualsData(): Ritual[] {
  try {
    const filePath = path.join(dataDir, "rituals.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading rituals:", error)
    return []
  }
}

export function saveRitualsData(rituals: Ritual[]): void {
  try {
    const filePath = path.join(dataDir, "rituals.json")
    fs.writeFileSync(filePath, JSON.stringify(rituals, null, 2))
  } catch (error) {
    console.error("Error saving rituals:", error)
    throw error
  }
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
  try {
    const filePath = path.join(dataDir, "standalone-pages.json")
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2))
  } catch (error) {
    console.error("Error saving standalone pages:", error)
    throw error
  }
}

export function getStandalonePageBySlug(slug: string): StandalonePage | null {
  const pages = getStandalonePages()
  return pages.find((page) => page.slug === slug) || null
}
