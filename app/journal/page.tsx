"use client"

import { useState } from "react"
import { journalPosts, type Category } from "@/lib/journal-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import JournalCard from "@/components/journal-card"
import { cn } from "@/lib/utils"

const categories: Category[] = [
  "Sauna Culture",
  "Nervous System",
  "Women's Wellness",
  "Ritual Tools",
  "Breath & Body",
  "Founder's Journal",
  "Event Recaps",
  "Place-Based Practice",
]

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All")

  const filteredPosts =
    activeCategory === "All" ? journalPosts : journalPosts.filter((post) => post.categories.includes(activeCategory))

  return (
    <>
      <Navigation />
      <main className="bg-bathhouse-cream min-h-screen">
        <div className="bathhouse-container py-16 sm:py-20">
          {/* Header - Mobile-optimized */}
          <header className="text-center mb-12 sm:mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading mb-4 text-bathhouse-slate">Journal</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto bathhouse-text-balance">
              Reflections on ritual, wellness, and the art of creating meaningful experiences.
            </p>
          </header>

          {/* Category Filters - Mobile-optimized scrolling */}
          <div className="mb-8 sm:mb-12">
            <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 sm:gap-4 pb-2 sm:pb-0 px-4 sm:px-0">
              <button
                onClick={() => setActiveCategory("All")}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0",
                  activeCategory === "All"
                    ? "bg-bathhouse-slate text-white"
                    : "bg-white text-bathhouse-slate hover:bg-bathhouse-slate/10",
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0",
                    activeCategory === category
                      ? "bg-bathhouse-slate text-white"
                      : "bg-white text-bathhouse-slate hover:bg-bathhouse-slate/10",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid - Mobile-responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {filteredPosts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Empty State - Mobile-optimized */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 sm:py-16 text-gray-600 px-4">
              <h3 className="text-lg sm:text-xl font-medium mb-2">No posts found</h3>
              <p className="text-sm sm:text-base">There are no journal entries for this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
