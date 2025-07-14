export interface JournalPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: number
  tags: string[]
  featured: boolean
  status: "draft" | "published"
  image?: string
  seoTitle?: string
  seoDescription?: string
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  shortDescription: string
  date: string
  time: string
  duration: string
  location: string
  price: number
  capacity: number
  instructor: string
  category: string
  level: string
  benefits: string[]
  requirements: string[]
  image: string
  status: "draft" | "published"
  featured: boolean
  bookingUrl?: string
  seoTitle?: string
  seoDescription?: string
}

export interface PageContent {
  id: string
  title: string
  content: string
}

export interface Ritual {
  id: number
  title: string
  slug: string
  description: string
  shortDescription: string
  duration: string
  benefits: string[]
  process: string[]
  instructor: {
    name: string
    bio: string
    image: string
  }
  schedule: {
    day: string
    time: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
  image: string
  icon: string
  status: "draft" | "published"
  featured: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface StandalonePage {
  id: number
  title: string
  slug: string
  content: string
  status: "draft" | "published"
  publishedAt: string
  seoTitle?: string
  seoDescription?: string
}
