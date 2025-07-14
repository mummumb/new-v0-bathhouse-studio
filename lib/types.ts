export interface JournalPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    image: string
  }
  publishedAt: string
  readTime: number
  tags: string[]
  status: "published" | "draft"
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  image: string
  date: string
  time: string
  duration: string
  location: string
  price: number
  capacity: number
  instructor: {
    name: string
    bio: string
    image: string
  }
  category: string
  status: "published" | "draft"
  bookingUrl?: string
  createdAt: string
  updatedAt: string
}

export interface PageContent {
  id: string
  section: string
  title: string
  content: string
  image?: string
  metadata?: Record<string, any>
  status: "published" | "draft"
  createdAt: string
  updatedAt: string
}

export interface Ritual {
  id: string
  title: string
  slug: string
  shortDescription: string
  longDescription: string
  image: string
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
  status: "published" | "draft"
  createdAt?: string
  updatedAt?: string
}

export interface StandalonePage {
  id: string
  title: string
  slug: string
  content: string
  metaDescription?: string
  image?: string
  status: "published" | "draft"
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  image: string
  icon: string
  benefits: string[]
  duration?: string
  price?: number
  bookingRequired: boolean
  status: "published" | "draft"
}
