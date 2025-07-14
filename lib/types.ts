export interface JournalPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  imageUrl: string
  tags: string[]
  status: "draft" | "published"
  metaTitle?: string
  metaDescription?: string
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  date: string
  time: string
  duration: string
  location: string
  price: number
  capacity: number
  instructor: string
  imageUrl: string
  category: string
  status: "draft" | "published"
  metaTitle?: string
  metaDescription?: string
}

export interface PageContent {
  id: string
  title: string
  content: string
  section: string
  updatedAt: string
}

export interface Ritual {
  id: number
  title: string
  slug: string
  description: string
  benefits: string[]
  duration: string
  instructor: string
  instructorBio: string
  schedule: {
    day: string
    time: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
  imageUrl: string
  status: "draft" | "published"
  metaTitle?: string
  metaDescription?: string
}

export interface StandalonePage {
  id: number
  title: string
  slug: string
  content: string
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
  metaTitle?: string
  metaDescription?: string
}
