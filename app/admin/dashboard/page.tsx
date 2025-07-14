"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Home } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { JournalPost, Event, PageContent, Ritual, StandalonePage } from "@/lib/types"
import JournalPostForm from "@/components/admin/journal-post-form"
import JournalPostList from "@/components/admin/journal-post-list"
import EventForm from "@/components/admin/event-form"
import EventList from "@/components/admin/event-list"
import AnalyticsTab from "@/components/admin/analytics-tab"
import PageContentList from "@/components/admin/page-content-list"
import PageContentForm from "@/components/admin/page-content-form"
import RitualList from "@/components/admin/ritual-list"
import RitualForm from "@/components/admin/ritual-form"
import StandalonePageList from "@/components/admin/standalone-page-list"
import StandalonePageForm from "@/components/admin/standalone-page-form"

async function fetcher(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Network response was not ok")
  return res.json()
}

async function deleter(url: string) {
  const res = await fetch(url, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete")
  return res.json()
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("standalone-pages")
  const [editingPost, setEditingPost] = useState<JournalPost | null>(null)
  const [showPostForm, setShowPostForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingPage, setEditingPage] = useState<PageContent | null>(null)
  const [editingRitual, setEditingRitual] = useState<Ritual | null>(null)
  const [showRitualForm, setShowRitualForm] = useState(false)
  const [editingStandalonePage, setEditingStandalonePage] = useState<StandalonePage | null>(null)
  const [showStandalonePageForm, setShowStandalonePageForm] = useState(false)

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: posts = [], isLoading: postsLoading } = useQuery<JournalPost[]>({
    queryKey: ["journalPosts"],
    queryFn: () => fetcher("/api/journal"),
  })

  const { data: events = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: () => fetcher("/api/events"),
  })

  const { data: pages = [], isLoading: pagesLoading } = useQuery<PageContent[]>({
    queryKey: ["pageContent"],
    queryFn: () => fetcher("/api/pages"),
  })

  const { data: rituals = [], isLoading: ritualsLoading } = useQuery<Ritual[]>({
    queryKey: ["rituals"],
    queryFn: () => fetcher("/api/rituals"),
  })

  const { data: standalonePages = [], isLoading: standalonePagesLoading } = useQuery<StandalonePage[]>({
    queryKey: ["standalonePages"],
    queryFn: () => fetcher("/api/standalone-pages"),
  })

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => deleter(`/api/journal/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journalPosts"] })
      toast({ title: "Success", description: "Blog post deleted successfully" })
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" })
    },
  })

  const deleteEventMutation = useMutation({
    mutationFn: (id: number) => deleter(`/api/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
      toast({ title: "Success", description: "Event deleted successfully" })
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete event", variant: "destructive" })
    },
  })

  const deleteRitualMutation = useMutation({
    mutationFn: (id: number) => deleter(`/api/rituals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rituals"] })
      toast({ title: "Success", description: "Ritual deleted successfully" })
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete ritual", variant: "destructive" })
    },
  })

  const deleteStandalonePageMutation = useMutation({
    mutationFn: (id: number) => deleter(`/api/standalone-pages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["standalonePages"] })
      toast({ title: "Success", description: "Page deleted successfully" })
    },
    onError: (error) => {
      toast({ title: "Error", description: "Failed to delete page", variant: "destructive" })
    },
  })

  const handleEditPost = (post: JournalPost) => {
    setEditingPost(post)
    setShowPostForm(true)
  }
  const handleDeletePost = (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(id)
    }
  }
  const handlePostFormClose = () => {
    setShowPostForm(false)
    setEditingPost(null)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setShowEventForm(true)
  }
  const handleDeleteEvent = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventMutation.mutate(id)
    }
  }
  const handleEventFormClose = () => {
    setShowEventForm(false)
    setEditingEvent(null)
  }

  const handleEditPage = (page: PageContent) => {
    setEditingPage(page)
  }
  const handlePageFormClose = () => {
    setEditingPage(null)
  }

  const handleEditRitual = (ritual: Ritual) => {
    setEditingRitual(ritual)
    setShowRitualForm(true)
  }
  const handleDeleteRitual = (id: number) => {
    if (window.confirm("Are you sure you want to delete this ritual?")) {
      deleteRitualMutation.mutate(id)
    }
  }
  const handleRitualFormClose = () => {
    setShowRitualForm(false)
    setEditingRitual(null)
  }

  const handleEditStandalonePage = (page: StandalonePage) => {
    setEditingStandalonePage(page)
    setShowStandalonePageForm(true)
  }
  const handleDeleteStandalonePage = (id: number) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      deleteStandalonePageMutation.mutate(id)
    }
  }
  const handleStandalonePageFormClose = () => {
    setShowStandalonePageForm(false)
    setEditingStandalonePage(null)
  }

  if (postsLoading || eventsLoading || pagesLoading || ritualsLoading || standalonePagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Bathhouse Studio CMS</h1>
          <p className="text-gray-600">Manage your website's content.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="rituals">Rituals</TabsTrigger>
          <TabsTrigger value="pages">Page Sections</TabsTrigger>
          <TabsTrigger value="standalone-pages">Standalone Pages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Blog Posts</h2>
            <Button onClick={() => setShowPostForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
          {showPostForm && (
            <JournalPostForm post={editingPost} onClose={handlePostFormClose} onSuccess={handlePostFormClose} />
          )}
          <JournalPostList
            posts={posts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            isDeleting={deletePostMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Events</h2>
            <Button onClick={() => setShowEventForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
          {showEventForm && (
            <EventForm event={editingEvent} onClose={handleEventFormClose} onSuccess={handleEventFormClose} />
          )}
          <EventList
            events={events}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            isDeleting={deleteEventMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="rituals" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Rituals</h2>
            <Button onClick={() => setShowRitualForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Ritual
            </Button>
          </div>
          {showRitualForm && (
            <RitualForm ritual={editingRitual} onClose={handleRitualFormClose} onSuccess={handleRitualFormClose} />
          )}
          <RitualList
            rituals={rituals}
            onEdit={handleEditRitual}
            onDelete={handleDeleteRitual}
            isDeleting={deleteRitualMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="pages" className="space-y-6 mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Page Section Content</h2>
          {editingPage && (
            <PageContentForm page={editingPage} onClose={handlePageFormClose} onSuccess={handlePageFormClose} />
          )}
          <PageContentList pages={pages} onEdit={handleEditPage} />
        </TabsContent>

        <TabsContent value="standalone-pages" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Standalone Pages</h2>
            <Button onClick={() => setShowStandalonePageForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </div>
          {showStandalonePageForm && (
            <StandalonePageForm
              page={editingStandalonePage}
              onClose={handleStandalonePageFormClose}
              onSuccess={handleStandalonePageFormClose}
            />
          )}
          <StandalonePageList
            pages={standalonePages}
            onEdit={handleEditStandalonePage}
            onDelete={handleDeleteStandalonePage}
            isDeleting={deleteStandalonePageMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <AnalyticsTab posts={posts} events={events} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your CMS settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Settings and configurations will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
