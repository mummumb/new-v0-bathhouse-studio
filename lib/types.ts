export interface JournalPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  image: string
  tags: string[]
  isPublished: boolean
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  date: string
  time: string
  location: string
  price: number
  capacity: number
  image: string
  isPublished: boolean
  category: string
}

export interface PageContent {
  id: string
  title: string
  content: string
  section: string
  lastUpdated: string
}

export interface Ritual {
  id: number
  title: string
  slug: string
  subtitle: string
  number: string
  description: string
  fullDescription: string
  image: string
  imageAlt: string
  date: string
  location: string
  icon?: string
  isPublished: boolean
  benefits: string[]
  duration: string
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
}

export interface StandalonePage {
  id: number
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
