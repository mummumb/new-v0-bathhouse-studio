import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { journalPosts } from "@/lib/journal-data"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowLeft, Calendar, User } from "lucide-react"

type Props = {
  params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = journalPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Bathhouse Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

// Generate static pages for better performance
export async function generateStaticParams() {
  return journalPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function JournalPostPage({ params }: Props) {
  const post = journalPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main>
        <article>
          {/* Header with hero image */}
          <header className="relative h-[60vh] md:h-[70vh] flex items-end justify-center text-white">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
              <div className="mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium mr-2 px-3 py-1.5 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-heading mb-4 bathhouse-text-balance">{post.title}</h1>
              <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div className="bg-bathhouse-cream">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div
                className="prose prose-lg lg:prose-xl max-w-none prose-headings:font-heading prose-headings:text-bathhouse-slate prose-headings:font-light prose-p:text-gray-700 prose-a:text-bathhouse-teal prose-strong:text-bathhouse-slate prose-blockquote:border-l-bathhouse-teal prose-blockquote:text-bathhouse-slate prose-blockquote:font-heading prose-blockquote:font-light"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-16 pt-8 border-t border-bathhouse-sand">
                <Link
                  href="/journal"
                  className="inline-flex items-center text-bathhouse-teal hover:text-bathhouse-slate font-medium group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Journal
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
