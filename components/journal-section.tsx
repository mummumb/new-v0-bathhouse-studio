// import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import { journalPosts } from "@/lib/journal-data"

export default function JournalSection() {
  // Get the first 3 posts for the home page
  const featuredPosts = journalPosts.slice(0, 3)

  return (
    <section id="journal" className="bathhouse-section" style={{ backgroundColor: "#F2EBDE" }}>
      <div className="bathhouse-container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading mb-4 sm:mb-6 text-bathhouse-slate">Journal</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Reflections on ritual, wellness, and the art of creating meaningful experiences.
          </p>
        </div>

        {/* Mobile-responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 px-4 sm:px-0">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.imageAlt || post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span>{post.date}</span>
                  <span className="mx-1 sm:mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading mb-2 sm:mb-3 text-bathhouse-slate">
                  <Link href={`/journal/${post.slug}`} className="hover:text-bathhouse-teal transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/journal/${post.slug}`}
                  className="inline-flex items-center text-sm sm:text-base text-bathhouse-teal hover:text-bathhouse-teal/80 font-medium group"
                >
                  Read More
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center px-4 sm:px-0">
          <Button
            size="lg"
            variant="outline"
            className="border-bathhouse-slate text-bathhouse-slate hover:bg-bathhouse-slate hover:text-white bg-transparent w-full sm:w-auto"
            asChild
          >
            <Link href="/journal">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
