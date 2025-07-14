import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { JournalPost, Event } from "@/lib/types"

interface AnalyticsTabProps {
  posts: JournalPost[]
  events: Event[]
}

export default function AnalyticsTab({ posts, events }: AnalyticsTabProps) {
  const totalPosts = posts.length
  const publishedPosts = posts.filter((p) => p.isPublished).length
  const totalEvents = events.length
  const publishedEvents = events.filter((e) => e.isPublished).length
  const postCategories = new Set(posts.flatMap((p) => p.categories))
  const eventCategories = new Set(events.map((e) => e.category))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Analytics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Posts</h3>
          <p className="text-2xl font-bold text-bathhouse-slate">{totalPosts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Published Posts</h3>
          <p className="text-2xl font-bold text-bathhouse-slate">{publishedPosts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Post Categories</h3>
          <p className="text-2xl font-bold text-bathhouse-slate">{postCategories.size}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Events</h3>
          <p className="text-2xl font-bold text-bathhouse-slate">{totalEvents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Published Events</h3>
          <p className="text-2xl font-bold text-bathhouse-slate">{publishedEvents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Event Categories</h3>
          <p className="text-2xl font-bold text-bathhouse-slate">{eventCategories.size}</p>
        </div>
      </CardContent>
    </Card>
  )
}
