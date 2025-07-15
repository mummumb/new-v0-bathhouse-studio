import type { MetadataRoute } from "next"
import { journalPosts } from "@/lib/journal-data"
import { events } from "@/lib/events-data"
import { getStandalonePages } from "@/lib/data-utils"

export default async function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bathhousestudio.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]

  // Journal posts
  const journalPages = journalPosts.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Ritual pages
  const ritualPages = events.map((ritual) => ({
    url: `${baseUrl}/rituals/${ritual.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Standalone pages
  const standalonePages = await getStandalonePages()
  const publishedStandalonePages = standalonePages
    .filter(page => page.isPublished)
    .map((page) => ({
      url: `${baseUrl}/p/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))

  return [...staticPages, ...journalPages, ...ritualPages, ...publishedStandalonePages]
}
