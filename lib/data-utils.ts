import fs from "fs"
import path from "path"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

const dataDir = path.join(process.cwd(), "data")

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Generic file operations
function readJsonFile<T>(filename: string, defaultValue: T[] = []): T[] {
  ensureDataDir()
  const filePath = path.join(dataDir, filename)
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2))
      return defaultValue
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return defaultValue
  }
}

function writeJsonFile<T>(filename: string, data: T[]): void {
  ensureDataDir()
  const filePath = path.join(dataDir, filename)
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    throw error
  }
}

// Journal functions
export async function getJournalPosts(): Promise<JournalPost[]> {
  return readJsonFile<JournalPost>("journal.json")
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const posts = await getJournalPosts()
  return posts.find((post) => post.slug === slug) || null
}

export async function getJournalPostById(id: number): Promise<JournalPost | null> {
  const posts = await getJournalPosts()
  return posts.find((post) => post.id === id) || null
}

export async function saveJournalPosts(posts: JournalPost[]): Promise<void> {
  writeJsonFile("journal.json", posts)
}

export async function saveJournalPost(post: JournalPost): Promise<JournalPost> {
  const posts = await getJournalPosts()
  const existingIndex = posts.findIndex(p => p.id === post.id)
  
  if (existingIndex >= 0) {
    posts[existingIndex] = post
  } else {
    // Generate new ID if not provided
    const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0
    post.id = post.id || maxId + 1
    posts.push(post)
  }
  
  await saveJournalPosts(posts)
  return post
}

export async function deleteJournalPost(id: number): Promise<boolean> {
  const posts = await getJournalPosts()
  const filteredPosts = posts.filter(post => post.id !== id)
  if (filteredPosts.length !== posts.length) {
    await saveJournalPosts(filteredPosts)
    return true
  }
  return false
}

// Events functions
export async function getEvents(): Promise<Event[]> {
  return readJsonFile<Event>("events.json")
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getEvents()
  return events.find((event) => event.slug === slug) || null
}

export async function getEventById(id: number): Promise<Event | null> {
  const events = await getEvents()
  return events.find((event) => event.id === id) || null
}

export async function saveEvents(events: Event[]): Promise<void> {
  writeJsonFile("events.json", events)
}

export async function saveEvent(event: Event): Promise<Event> {
  const events = await getEvents()
  const existingIndex = events.findIndex(e => e.id === event.id)
  
  if (existingIndex >= 0) {
    events[existingIndex] = event
  } else {
    const maxId = events.length > 0 ? Math.max(...events.map(e => e.id)) : 0
    event.id = event.id || maxId + 1
    events.push(event)
  }
  
  await saveEvents(events)
  return event
}

export async function deleteEvent(id: number): Promise<boolean> {
  const events = await getEvents()
  const filteredEvents = events.filter(event => event.id !== id)
  if (filteredEvents.length !== events.length) {
    await saveEvents(filteredEvents)
    return true
  }
  return false
}

// Page content functions
export async function getPageContent(): Promise<PageContent[]> {
  return readJsonFile<PageContent>("pages.json")
}

export async function getPageContentById(id: string): Promise<PageContent | null> {
  const pages = await getPageContent()
  return pages.find((page) => page.id === id) || null
}

export async function savePageContent(pages: PageContent[]): Promise<void> {
  writeJsonFile("pages.json", pages)
}

export async function savePage(page: PageContent): Promise<PageContent> {
  const pages = await getPageContent()
  const existingIndex = pages.findIndex(p => p.id === page.id)
  
  if (existingIndex >= 0) {
    pages[existingIndex] = page
  } else {
    pages.push(page)
  }
  
  await savePageContent(pages)
  return page
}

export async function deletePage(id: string): Promise<boolean> {
  const pages = await getPageContent()
  const filteredPages = pages.filter(page => page.id !== id)
  if (filteredPages.length !== pages.length) {
    await savePageContent(filteredPages)
    return true
  }
  return false
}

// Rituals functions
export async function getRituals(): Promise<Ritual[]> {
  return readJsonFile<Ritual>("rituals.json")
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const rituals = await getRituals()
  return rituals.find((ritual) => ritual.slug === slug) || null
}

export async function getRitualById(id: string): Promise<Ritual | null> {
  const rituals = await getRituals()
  return rituals.find((ritual) => ritual.id === id) || null
}

export async function saveRituals(rituals: Ritual[]): Promise<void> {
  writeJsonFile("rituals.json", rituals)
}

export async function saveRitual(ritual: Ritual): Promise<Ritual> {
  const rituals = await getRituals()
  const existingIndex = rituals.findIndex(r => r.id === ritual.id)
  
  if (existingIndex >= 0) {
    rituals[existingIndex] = ritual
  } else {
    rituals.push(ritual)
  }
  
  await saveRituals(rituals)
  return ritual
}

export async function deleteRitual(id: string): Promise<boolean> {
  const rituals = await getRituals()
  const filteredRituals = rituals.filter(ritual => ritual.id !== id)
  if (filteredRituals.length !== rituals.length) {
    await saveRituals(filteredRituals)
    return true
  }
  return false
}

// Standalone pages functions
export async function getStandalonePages(): Promise<StandalonePage[]> {
  return readJsonFile<StandalonePage>("standalone-pages.json")
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const pages = await getStandalonePages()
  return pages.find((page) => page.slug === slug) || null
}

export async function getStandalonePageById(id: string): Promise<StandalonePage | null> {
  const pages = await getStandalonePages()
  return pages.find((page) => page.id === id) || null
}

export async function saveStandalonePages(pages: StandalonePage[]): Promise<void> {
  writeJsonFile("standalone-pages.json", pages)
}

export async function saveStandalonePage(page: StandalonePage): Promise<StandalonePage> {
  const pages = await getStandalonePages()
  const existingIndex = pages.findIndex(p => p.id === page.id)
  
  if (existingIndex >= 0) {
    pages[existingIndex] = page
  } else {
    pages.push(page)
  }
  
  await saveStandalonePages(pages)
  return page
}

export async function deleteStandalonePage(id: string): Promise<boolean> {
  const pages = await getStandalonePages()
  const filteredPages = pages.filter(page => page.id !== id)
  if (filteredPages.length !== pages.length) {
    await saveStandalonePages(filteredPages)
    return true
  }
  return false
}
