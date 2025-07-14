import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getPageContentById } from "@/lib/data-utils"

export default async function AboutSection() {
  const pageData = await getPageContentById("about-section")

  if (!pageData) {
    return null // Or a fallback component
  }
  const { content } = pageData

  return (
    <section id="about" className="bathhouse-section bg-bathhouse-cream">
      <div className="bathhouse-container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-heading mb-6 text-bathhouse-slate">{content.heading}</h2>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed bathhouse-text-balance">{content.subheading}</p>

              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>{content.paragraph1}</p>
                <p>{content.paragraph2}</p>
                <p>{content.paragraph3}</p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-bathhouse-teal hover:bg-bathhouse-teal/90 text-white px-8 py-3 group"
                  asChild
                >
                  <a href="#founder" className="flex items-center">
                    Meet Amanda
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-bathhouse-slate text-bathhouse-slate hover:bg-bathhouse-slate hover:text-white px-8 py-3 bg-transparent"
                  asChild
                >
                  <a href="#rituals">Explore Rituals</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-stone-100 shadow-2xl">
                <img
                  src="/images/founders-abstract.png"
                  alt="Abstract, artistic image representing the serene and natural textures of Bathhouse Studio, with soft, earthy tones and organic shapes."
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <p className="text-sm font-medium text-bathhouse-slate mb-1">Our Promise</p>
                <p className="text-xs text-gray-600">Sauna as it should be</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
