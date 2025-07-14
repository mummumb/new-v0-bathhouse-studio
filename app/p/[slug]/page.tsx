import { notFound } from "next/navigation"
import { getStandalonePage } from "@/lib/data-utils"
import type { Metadata } from "next"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getStandalonePage(params.slug)

  if (!page || page.status !== "published") {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: `${page.title} | Bathhouse Studio`,
    description: page.metaDescription || `${page.title} - Bathhouse Studio`,
    openGraph: {
      title: page.title,
      description: page.metaDescription || `${page.title} - Bathhouse Studio`,
      images: page.image ? [{ url: page.image }] : [],
    },
  }
}

function renderContent(content: string) {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800">$1</a>')
    .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-6 text-gray-900">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-semibold mb-4 text-gray-800 mt-8">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-medium mb-3 text-gray-700 mt-6">$1</h3>')
    .replace(/^- (.+)$/gm, '<li class="mb-2">$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4 space-y-1">$1</ul>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[h|u|l])/gm, '<p class="mb-4">')
    .replace(/<p class="mb-4">(<[h|u])/g, "$1")
}

export default async function StandalonePage({ params }: PageProps) {
  const page = await getStandalonePage(params.slug)

  if (!page || page.status !== "published") {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {page.image && (
        <div className="relative h-64 md:h-80 bg-gray-900">
          <img
            src={page.image || "/placeholder.svg"}
            alt={page.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">{page.title}</h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {!page.image && <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">{page.title}</h1>}

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: renderContent(page.content) }} />
      </div>
    </div>
  )
}
