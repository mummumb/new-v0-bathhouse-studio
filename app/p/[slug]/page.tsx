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
  const page = getStandalonePageBySlug(params.slug)

  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || `${page.title} - Bathhouse Studio`,
  }
}

export default function StandalonePage({ params }: PageProps) {
  const page = getStandalonePageBySlug(params.slug)

  if (!page || !page.published) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <article className="bg-white rounded-lg shadow-sm p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-black mb-4">{page.title}</h1>
              {page.author && (
                <p className="text-slate text-sm">
                  By {page.author} • Last updated {new Date(page.updatedAt).toLocaleDateString()}
                </p>
              )}
            </header>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
