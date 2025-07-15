import { prisma } from "./db"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "./types"

// Journal functions
/**
 * Retrieves all journal posts from the database, ordered by date in descending order.
 *
 * Each post is mapped to a normalized object, parsing the `categories` field from a JSON string to a string array,
 * and formatting the `date` as an ISO string. The author information is grouped under an `author` object.
 *
 * @returns {Promise<JournalPost[]>} A promise that resolves to an array of journal post objects.
 */
/**
 * Retrieves a list of journal posts from the database, ordered by date in descending order.
 *
 * Each journal post is mapped to a normalized object structure, including parsed categories,
 * author information, and formatted date strings.
 *
 * @returns {Promise<JournalPost[]>} A promise that resolves to an array of journal post objects.
 *
 * @example
 * const posts = await getJournalPosts();
 * console.log(posts[0].title); // Outputs the title of the most recent journal post
 */
export async function getJournalPosts(): Promise<JournalPost[]> {
  const posts = await prisma.journalPost.findMany({
    orderBy: { date: 'desc' }
  })
  
  return posts.map((post: { id: any; slug: any; title: any; excerpt: any; date: { toISOString: () => any }; readTime: any; categories: string; authorName: any; authorAvatar: any; image: any; imageAlt: any; content: any }) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date.toISOString(),
    readTime: post.readTime,
    categories: (() => {
      try {
        if (!post.categories) return [];
        return JSON.parse(post.categories) as string[];
      } catch {
        return [];
      }
    })(),
    author: {
      name: post.authorName,
      avatar: post.authorAvatar
    },
    image: post.image,
    imageAlt: post.imageAlt,
    content: post.content
  }))
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const post = await prisma.journalPost.findUnique({
    where: { slug }
  })
  
  if (!post) return null
  
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date.toISOString(),
    readTime: post.readTime,
    categories: (() => {
      try {
        if (!post.categories) return [];
        return JSON.parse(post.categories) as string[];
      } catch {
        return [];
      }
    })(),
    author: {
      name: post.authorName,
      avatar: post.authorAvatar
    },
    image: post.image,
    imageAlt: post.imageAlt,
    content: post.content
  }
}

export async function saveJournalPosts(posts: JournalPost[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveJournalPosts is deprecated. Use Prisma directly.')
}

// Events functions
export async function getEvents(): Promise<Event[]> {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' }
  })
  
  return events.map((event: { date: { toISOString: () => any } }) => ({
    ...event,
    date: event.date.toISOString()
  }))
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const event = await prisma.event.findUnique({
    where: { slug }
  })
  
  if (!event) return null
  
  return {
    ...event,
    date: event.date.toISOString()
  }
}

export async function saveEvents(events: Event[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveEvents is deprecated. Use Prisma directly.')
}

// Page content functions
export async function getPageContent(): Promise<PageContent[]> {
  const pages = await prisma.pageContent.findMany()
  
    content: (() => {
      try {
        return JSON.parse(pages.content);
      } catch {
        return {};
      }
    content: (() => {
      try {
        return JSON.parse(pages.content);
      } catch {
        return {};
      }
    })(),
    id: pages.id,
    page: page.page,
    section: page.section,
    title: page.title || undefined,
    content: (() => {
      try {
        if (!page.content) return {};
        return JSON.parse(page.content);
      } catch {
        return {};
      }
    content: (() => {
      try {
        if (!page.content) return {};
        return JSON.parse(page.content);
      } catch {
        return {};
      }
    })(),
    content: (() => {
      try {
        return JSON.parse(page.content);
      } catch {
        return {};
      }
    })(),
    backgroundImage: page.backgroundImage || undefined,
    overlayOpacity: page.overlayOpacity || undefined
  }))
}

export async function getPageContentById(id: string): Promise<PageContent | null> {
  return {
    id: page.id,
    page: page.page,
    section: page.section,
    title: page.title || undefined,
    subtitle: page.subtitle || undefined,
    content: (() => {
      try {
        return JSON.parse(page.content);
      } catch {
        return {};
      }
    })(),
    backgroundImage: page.backgroundImage || undefined,
    overlayOpacity: page.overlayOpacity || undefined
  }
}
    subtitle: page.subtitle || undefined,
    content: JSON.parse(page.content),
    backgroundImage: page.backgroundImage || undefined,
    overlayOpacity: page.overlayOpacity || undefined
  }
}

export async function savePageContent(pages: PageContent[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('savePageContent is deprecated. Use Prisma directly.')
}

// Rituals functions
export async function getRituals(): Promise<Ritual[]> {
    benefits: (() => {
      try {
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        return JSON.parse(ritual.whatToExpect) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
        return [];
      }
    })(),
    contraindications: (() => {
      try {
        return JSON.parse(ritual.contraindications) as string[];
    benefits: (() => {
      try {
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        return JSON.parse(ritual.whatToExpect) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
        return [];
      }
    })(),
    contraindications: (() => {
      try {
        return JSON.parse(ritual.contraindications) as string[];
      } catch {
        return [];
      }
    })(),
    benefits: (() => {
      try {
        if (!ritual.benefits) return [];
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        if (!ritual.whatToExpect) return [];
        return JSON.parse(ritual.whatToExpect) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        if (!ritual.whoIsItFor) return [];
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
        return [];
      }
    })(),
    contraindications: (() => {
      try {
        if (!ritual.contraindications) return [];
        return JSON.parse(ritual.contraindications) as string[];
    benefits: (() => {
      try {
        if (!ritual.benefits) return [];
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        if (!ritual.whatToExpect) return [];
        return JSON.parse(ritual.whatToExpect) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        if (!ritual.whoIsItFor) return [];
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
        return [];
      }
    })(),
    benefits: (() => {
      try {
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        return JSON.parse(ritual.whatToExpect) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
        return [];
      }
    })(),
    contraindications: (() => {
      try {
        return JSON.parse(ritual.contraindications) as string[];
      } catch {
        return [];
      }
    })(),
    image: ritual.image,
    imageAlt: ritual.imageAlt
  }))
}
    fullDescription: ritual.fullDescription,
    duration: ritual.duration,
    price: ritual.price,
    capacity: ritual.capacity,
    benefits: JSON.parse(ritual.benefits) as string[],
    whatToExpect: JSON.parse(ritual.whatToExpect) as string[],
    whoIsItFor: JSON.parse(ritual.whoIsItFor) as string[],
    contraindications: JSON.parse(ritual.contraindications) as string[],
    image: ritual.image,
    imageAlt: ritual.imageAlt
  }))
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const ritual = await prisma.ritual.findUnique({
    where: { slug }
  })
    hero: (() => {
      if (!page.hero) return undefined;
      try {
        return JSON.parse(page.hero);
      } catch {
        return undefined;
      }
    })(),
    sections: (() => {
      if (!page.sections) return [];
      try {
        return JSON.parse(page.sections);
      } catch {
        return [];
    hero: (() => {
      if (!page.hero) return undefined;
      try {
        return JSON.parse(page.hero);
      } catch {
        return undefined;
      }
    })(),
    sections: (() => {
  return {
    id: ritual.id,
    slug: ritual.slug,
    title: ritual.title,
    category: ritual.category,
    shortDescription: ritual.shortDescription,
    fullDescription: ritual.fullDescription,
    duration: ritual.duration,
    price: ritual.price,
    capacity: ritual.capacity,
    benefits: (() => {
      try {
        return JSON.parse(ritual.benefits) as string[];
      } catch {
        return [];
      }
    })(),
    whatToExpect: (() => {
      try {
        return JSON.parse(ritual.whatToExpect) as string[];
      } catch {
        return [];
      }
    })(),
    whoIsItFor: (() => {
      try {
        return JSON.parse(ritual.whoIsItFor) as string[];
      } catch {
  return pages.map((page: { id: any; slug: any; title: any; metaDescription: any; hero: string; sections: string }) => ({
    id: page.id,
    slug: page.slug,
    title: page.title,
    metaDescription: page.metaDescription || undefined,
    hero: (() => {
      if (!page.hero) return undefined;
      try {
        return JSON.parse(page.hero);
      } catch {
        return undefined;
      }
    })(),
    sections: (() => {
      if (!page.sections) return [];
      try {
        return JSON.parse(page.sections);
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    metaDescription: page.metaDescription || undefined,
    hero: (() => {
      if (!page.hero) return undefined;
      try {
        return JSON.parse(page.hero);
      } catch {
        return undefined;
      }
    })(),
    sections: (() => {
      if (!page.sections) return [];
      try {
        return JSON.parse(page.sections);
      } catch {
        return [];
      }
    })()
  }
}
  }
}
        return [];
    hero: (() => {
      try {
        if (!page.hero) return undefined;
        return JSON.parse(page.hero);
      } catch {
        return undefined;
      }
    })(),
    sections: (() => {
      try {
        if (!page.sections) return [];
        return JSON.parse(page.sections);
      } catch {
        return [];
      }
    })()
  
  return {
    id: ritual.id,
    slug: ritual.slug,
    title: ritual.title,
    category: ritual.category,
    shortDescription: ritual.shortDescription,
    fullDescription: ritual.fullDescription,
    duration: ritual.duration,
    price: ritual.price,
    capacity: ritual.capacity,
    benefits: JSON.parse(ritual.benefits) as string[],
    whatToExpect: JSON.parse(ritual.whatToExpect) as string[],
    whoIsItFor: JSON.parse(ritual.whoIsItFor) as string[],
    contraindications: JSON.parse(ritual.contraindications) as string[],
    image: ritual.image,
    imageAlt: ritual.imageAlt
  }
}

export async function saveRituals(rituals: Ritual[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveRituals is deprecated. Use Prisma directly.')
}

// Standalone pages functions
export async function getStandalonePages(): Promise<StandalonePage[]> {
  const pages = await prisma.standalonePage.findMany()
  
  return pages.map((page: { id: any; slug: any; title: any; metaDescription: any; hero: string; sections: string }) => ({
    id: page.id,
    slug: page.slug,
    title: page.title,
    metaDescription: page.metaDescription || undefined,
    hero: page.hero ? JSON.parse(page.hero) : undefined,
    sections: page.sections ? JSON.parse(page.sections) : []
  }))
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const page = await prisma.standalonePage.findUnique({
    where: { slug }
  })
  
  if (!page) return null
  
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    metaDescription: page.metaDescription || undefined,
    hero: page.hero ? JSON.parse(page.hero) : undefined,
    sections: page.sections ? JSON.parse(page.sections) : []
  }
}

export async function saveStandalonePages(pages: StandalonePage[]): Promise<void> {
  // This function is deprecated - use Prisma directly in API routes
  throw new Error('saveStandalonePages is deprecated. Use Prisma directly.')
}
