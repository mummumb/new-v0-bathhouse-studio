import Link from "next/link"
// import Image from "next/image"
import type { Post } from "@/lib/journal-data"

export default function JournalCard({ post }: { post: Post }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image Container - Optimized for mobile */}
        <div className="aspect-[4/3] sm:aspect-[4/3] relative overflow-hidden">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.imageAlt || post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Content Container - Mobile-optimized padding and spacing */}
        <div className="p-4 sm:p-6 flex-grow flex flex-col">
          {/* Category Tags - Better mobile wrapping */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="inline-block bg-bathhouse-teal/10 text-bathhouse-teal text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Title - Mobile-responsive sizing */}
          <h3 className="text-lg sm:text-xl font-heading mb-2 sm:mb-3 text-bathhouse-slate group-hover:text-bathhouse-teal transition-colors leading-tight">
            {post.title}
          </h3>

          {/* Excerpt - Mobile-optimized line height and spacing */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed flex-grow line-clamp-3">
            {post.excerpt}
          </p>

          {/* Author Footer - Mobile-optimized layout */}
          <footer className="flex items-center text-xs sm:text-sm text-gray-500 mt-auto">
            <img
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={28}
              height={28}
              className="rounded-full mr-2 sm:mr-3 flex-shrink-0 object-cover"
              loading="lazy"
            />
            <div className="flex flex-col sm:flex-row sm:items-center min-w-0">
              <span className="font-medium text-gray-800 truncate">{post.author.name}</span>
              <span className="hidden sm:inline mx-1.5">•</span>
              <span className="text-gray-500 truncate">{post.date}</span>
            </div>
          </footer>
        </div>
      </article>
    </Link>
  )
}
