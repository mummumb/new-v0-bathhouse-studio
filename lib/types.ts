export interface JournalPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  publishedAt: string
  status: "published" | "draft"
  author: {
    name: string
    image: string
  }
  tags: string[]
  readTime: number
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  image: string
  date: string
  time: string
  location: string
  price: number
  capacity: number
  status: "published" | "draft"
  category: string
  instructor: {
    name: string
    bio: string
    image: string
  }
}

export interface PageContent {
  id: string
  section: string
  title: string
  content: string
  lastUpdated: string
}

export interface Ritual {
  id: string
  title: string
  slug: string
  shortDescription: string
  longDescription: string
  image: string
  status: "published" | "draft"
  instructor: {
    name: string
    bio: string
    image: string
  }
  schedule: Array<{
    day: string
    time: string
  }>
  benefits: string[]
  faq: Array<{
    question: string
    answer: string
  }>
}

export interface StandalonePage {
  id: number
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  status: "published" | "draft"
  createdAt: string
  updatedAt: string
}
