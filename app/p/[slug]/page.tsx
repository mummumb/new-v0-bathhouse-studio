import { notFound } from "next/navigation"
import { getStandalonePageBySlug } from "@/lib/data-utils"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import type { Metadata } from "next"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getStandalonePageBySlug(params.slug)

  if (!page || !page.isPublished) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || `${page.content.replace(/<[^>]*>/g, "").substring(0, 160)}...`,
  }
}

export default async function StandalonePage({ params }: PageProps) {
  const page = await getStandalonePageBySlug(params.slug)

  if (!page || !page.isPublished) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <article className="bathhouse-section bg-white">
        <div className="bathhouse-container max-w-4xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-heading text-bathhouse-slate mb-6">{page.title}</h1>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
            style={{
              color: "#5A6870",
              lineHeight: "1.7",
            }}
          />
        </div>
      </article>

      <Footer />
    </main>
  )
}
