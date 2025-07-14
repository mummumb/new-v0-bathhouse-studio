import { promises as fs } from "fs"
import path from "path"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

const DATA_DIR = path.join(process.cwd(), "data")

// Generic file operations
async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return []
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    throw error
  }
}

// Journal Posts
export async function getJournalPosts(): Promise<JournalPost[]> {
  return readJsonFile<JournalPost>("journal.json")
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  const posts = await getJournalPosts()
  return posts.find((post) => post.slug === slug) || null
}

export async function saveJournalPost(post: JournalPost): Promise<JournalPost> {
  const posts = await getJournalPosts()
  const existingIndex = posts.findIndex((p) => p.id === post.id)

  if (existingIndex >= 0) {
    posts[existingIndex] = { ...post, updatedAt: new Date().toISOString() }
  } else {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    posts.push(newPost)
  }

  await writeJsonFile("journal.json", posts)
  return posts.find((p) => p.id === post.id)!
}

export async function deleteJournalPost(id: string): Promise<void> {
  const posts = await getJournalPosts()
  const filteredPosts = posts.filter((post) => post.id !== id)
  await writeJsonFile("journal.json", filteredPosts)
}

// Events
export async function getEvents(): Promise<Event[]> {
  return readJsonFile<Event>("events.json")
}

export async function getEvent(slug: string): Promise<Event | null> {
  const events = await getEvents()
  return events.find((event) => event.slug === slug) || null
}

export async function saveEvent(event: Event): Promise<Event> {
  const events = await getEvents()
  const existingIndex = events.findIndex((e) => e.id === event.id)

  if (existingIndex >= 0) {
    events[existingIndex] = { ...event, updatedAt: new Date().toISOString() }
  } else {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    events.push(newEvent)
  }

  await writeJsonFile("events.json", events)
  return events.find((e) => e.id === event.id)!
}

export async function deleteEvent(id: string): Promise<void> {
  const events = await getEvents()
  const filteredEvents = events.filter((event) => event.id !== id)
  await writeJsonFile("events.json", filteredEvents)
}

// Page Content
export async function getPageContent(): Promise<PageContent[]> {
  return readJsonFile<PageContent>("pages.json")
}

export async function getPageContentBySection(section: string): Promise<PageContent | null> {
  const pages = await getPageContent()
  return pages.find((page) => page.section === section) || null
}

export async function savePageContent(page: PageContent): Promise<PageContent> {
  const pages = await getPageContent()
  const existingIndex = pages.findIndex((p) => p.id === page.id)

  if (existingIndex >= 0) {
    pages[existingIndex] = { ...page, updatedAt: new Date().toISOString() }
  } else {
    const newPage = {
      ...page,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    pages.push(newPage)
  }

  await writeJsonFile("pages.json", pages)
  return pages.find((p) => p.id === page.id)!
}

// Rituals
export async function getRituals(): Promise<Ritual[]> {
  return readJsonFile<Ritual>("rituals.json")
}

export async function getRitual(slug: string): Promise<Ritual | null> {
  const rituals = await getRituals()
  return rituals.find((ritual) => ritual.slug === slug) || null
}

export async function saveRitual(ritual: Ritual): Promise<Ritual> {
  const rituals = await getRituals()
  const existingIndex = rituals.findIndex((r) => r.id === ritual.id)

  if (existingIndex >= 0) {
    rituals[existingIndex] = { ...ritual, updatedAt: new Date().toISOString() }
  } else {
    const newRitual = {
      ...ritual,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    rituals.push(newRitual)
  }

  await writeJsonFile("rituals.json", rituals)
  return rituals.find((r) => r.id === ritual.id)!
}

export async function deleteRitual(id: string): Promise<void> {
  const rituals = await getRituals()
  const filteredRituals = rituals.filter((ritual) => ritual.id !== id)
  await writeJsonFile("rituals.json", filteredRituals)
}

// Standalone Pages
export async function getStandalonePages(): Promise<StandalonePage[]> {
  return readJsonFile<StandalonePage>("standalone-pages.json")
}

export async function getStandalonePage(slug: string): Promise<StandalonePage | null> {
  const pages = await getStandalonePages()
  return pages.find((page) => page.slug === slug) || null
}

export async function saveStandalonePage(page: StandalonePage): Promise<StandalonePage> {
  const pages = await getStandalonePages()
  const existingIndex = pages.findIndex((p) => p.id === page.id)

  if (existingIndex >= 0) {
    pages[existingIndex] = { ...page, updatedAt: new Date().toISOString() }
  } else {
    const newPage = {
      ...page,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    pages.push(newPage)
  }

  await writeJsonFile("standalone-pages.json", pages)
  return pages.find((p) => p.id === page.id)!
}

export async function deleteStandalonePage(id: string): Promise<void> {
  const pages = await getStandalonePages()
  const filteredPages = pages.filter((page) => page.id !== id)
  await writeJsonFile("standalone-pages.json", filteredPages)
}
