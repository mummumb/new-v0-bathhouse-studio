import { notFound } from "next/navigation"
import { getStandalonePageBySlug } from "@/lib/data-utils"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface PageProps {
  params: {
    slug: string
  }
}

export default function StandalonePage({ params }: PageProps) {
  const page = getStandalonePageBySlug(params.slug)

  if (!page || page.status !== "published") {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bathhouse-cream">
      <Navigation />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <article className="max-w-4xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-light text-bathhouse-slate mb-4">{page.title}</h1>
            </header>

            <div
              className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-bathhouse-slate prose-p:text-bathhouse-slate prose-li:text-bathhouse-slate prose-blockquote:border-l-bathhouse-teal prose-blockquote:text-bathhouse-slate prose-strong:text-bathhouse-slate prose-em:text-bathhouse-slate"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
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
