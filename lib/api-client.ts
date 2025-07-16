import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

// Base API configuration
const API_BASE = "/api"

// Generic API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Journal API functions
export const journalApi = {
  getAll: (): Promise<JournalPost[]> => apiRequest("/journal"),
  
  getById: (id: number): Promise<JournalPost> => 
    apiRequest(`/journal/${id}`),
  
  create: (post: Omit<JournalPost, "id">): Promise<JournalPost> =>
    apiRequest("/journal", {
      method: "POST",
      body: JSON.stringify(post),
    }),
  
  update: (id: number, post: Partial<JournalPost>): Promise<JournalPost> =>
    apiRequest(`/journal/${id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    }),
  
  delete: (id: number): Promise<{ success: boolean }> =>
    apiRequest(`/journal/${id}`, {
      method: "DELETE",
    }),
}

// Events API functions
export const eventsApi = {
  getAll: (): Promise<Event[]> => apiRequest("/events"),
  
  getById: (id: number): Promise<Event> => 
    apiRequest(`/events/${id}`),
  
  create: (event: Omit<Event, "id">): Promise<Event> =>
    apiRequest("/events", {
      method: "POST",
      body: JSON.stringify(event),
    }),
  
  update: (id: number, event: Partial<Event>): Promise<Event> =>
    apiRequest(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(event),
    }),
  
  delete: (id: number): Promise<{ success: boolean }> =>
    apiRequest(`/events/${id}`, {
      method: "DELETE",
    }),
}

// Page content API functions
export const pagesApi = {
  getAll: (): Promise<PageContent[]> => apiRequest("/pages"),
  
  getById: (id: string): Promise<PageContent> => 
    apiRequest(`/pages/${id}`),
  
  create: (page: PageContent): Promise<PageContent> =>
    apiRequest("/pages", {
      method: "POST",
      body: JSON.stringify(page),
    }),
  
  update: (id: string, page: Partial<PageContent>): Promise<PageContent> =>
    apiRequest(`/pages/${id}`, {
      method: "PUT",
      body: JSON.stringify(page),
    }),
  
  delete: (id: string): Promise<{ success: boolean }> =>
    apiRequest(`/pages/${id}`, {
      method: "DELETE",
    }),
}

// Rituals API functions
export const ritualsApi = {
  getAll: (): Promise<Ritual[]> => apiRequest("/rituals"),
  
  getById: (id: string): Promise<Ritual> => 
    apiRequest(`/rituals/${id}`),
  
  create: (ritual: Omit<Ritual, "id"> & { id?: string }): Promise<Ritual> =>
    apiRequest("/rituals", {
      method: "POST",
      body: JSON.stringify(ritual),
    }),
  
  update: (id: string, ritual: Partial<Ritual>): Promise<Ritual> =>
    apiRequest(`/rituals/${id}`, {
      method: "PUT",
      body: JSON.stringify(ritual),
    }),
  
  delete: (id: string): Promise<{ success: boolean }> =>
    apiRequest(`/rituals/${id}`, {
      method: "DELETE",
    }),
}

// Standalone pages API functions
export const standalonePagesApi = {
  getAll: (): Promise<StandalonePage[]> => apiRequest("/standalone-pages"),
  
  getById: (id: string): Promise<StandalonePage> => 
    apiRequest(`/standalone-pages/${id}`),
  
  create: (page: Omit<StandalonePage, "id"> & { id?: string }): Promise<StandalonePage> =>
    apiRequest("/standalone-pages", {
      method: "POST",
      body: JSON.stringify(page),
    }),
  
  update: (id: string, page: Partial<StandalonePage>): Promise<StandalonePage> =>
    apiRequest(`/standalone-pages/${id}`, {
      method: "PUT",
      body: JSON.stringify(page),
    }),
  
  delete: (id: string): Promise<{ success: boolean }> =>
    apiRequest(`/standalone-pages/${id}`, {
      method: "DELETE",
    }),
}

// Utility functions for frontend data fetching
export const publicApi = {
  // Get published journal posts for frontend
  getPublishedJournalPosts: async (): Promise<JournalPost[]> => {
    const posts = await journalApi.getAll()
    return posts.filter(post => post.published)
  },
  
  // Get upcoming events for frontend
  getUpcomingEvents: async (): Promise<Event[]> => {
    const events = await eventsApi.getAll()
    const now = new Date()
    return events
      .filter(event => event.published && new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  },
  
  // Get published rituals for frontend
  getPublishedRituals: async (): Promise<Ritual[]> => {
    const rituals = await ritualsApi.getAll()
    return rituals.filter(ritual => ritual.published)
  },
  
  // Get published standalone pages for frontend
  getPublishedStandalonePages: async (): Promise<StandalonePage[]> => {
    const pages = await standalonePagesApi.getAll()
    return pages.filter(page => page.published)
  },
}
