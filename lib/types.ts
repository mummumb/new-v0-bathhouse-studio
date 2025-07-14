export interface JournalPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  published: boolean
  tags: string[]
  seoTitle?: string
  seoDescription?: string
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
  category: string
  image: string
  published: boolean
  bookingUrl?: string
  requirements?: string[]
  benefits?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface PageContent {
  id: string
  title: string
  content: string
  lastUpdated: string
}

export interface Ritual {
  id: number
  title: string
  slug: string
  description: string
  longDescription: string
  duration: string
  temperature?: string
  benefits: string[]
  preparation: string[]
  instructor: {
    name: string
    bio: string
    image: string
  }
  schedule: {
    day: string
    time: string
  }[]
  image: string
  published: boolean
  category: string
  price?: number
  capacity?: number
  requirements?: string[]
  faqs: {
    question: string
    answer: string
  }[]
  seoTitle?: string
  seoDescription?: string
}

export interface StandalonePage {
  id: number
  title: string
  slug: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
  seoTitle?: string
  seoDescription?: string
  author?: string
}
