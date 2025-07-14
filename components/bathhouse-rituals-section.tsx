import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRituals } from "@/lib/data-utils"

export default async function BathhouseRitualsSection() {
  const rituals = await getRituals()
  const publishedRituals = rituals.filter((ritual) => ritual.isPublished)

  return (
    <section id="rituals" className="bathhouse-section" style={{ backgroundColor: "#F2EBDE" }}>
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-bathhouse-slate mb-6">Bathhouse Rituals</h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Three foundational practices designed to restore, reset, and reconnect you to what matters most.
          </p>
        </div>

        <div className="space-y-12">
          {publishedRituals.map((ritual, index) => (
            <div
              key={ritual.slug}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image Column */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={ritual.image || "/placeholder.svg"}
                    alt={ritual.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>

              {/* Content Column */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="space-y-4">
                  {/* Ritual Number and Title */}
                  <div className="flex items-center space-x-4">
                    <span className="text-6xl font-heading text-bathhouse-teal/30">{ritual.number}</span>
                    <div>
                      <h3 className="text-3xl font-heading text-bathhouse-slate flex items-center">
                        {ritual.icon && <span className="mr-2">{ritual.icon}</span>}
                        Bathhouse Ritual {ritual.number} — {ritual.title}
                      </h3>
                      <p className="text-xl text-bathhouse-slate font-light italic mt-1">{ritual.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: ritual.description }} />
                    <div
                      className="text-gray-600 italic"
                      dangerouslySetInnerHTML={{ __html: ritual.fullDescription }}
                    />
                  </div>

                  {/* Date and Location */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600 py-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{ritual.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{ritual.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild className="bg-bathhouse-slate hover:bg-bathhouse-slate/90 text-white border-0">
                      <Link href={`/rituals/${ritual.slug}`}>Experience This Ritual</Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-bathhouse-slate text-bathhouse-slate hover:bg-bathhouse-slate hover:text-white bg-transparent"
                    >
                      <a href="#contact">Register Interest</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 pt-12 border-t border-bathhouse-sand">
          <p className="text-lg text-gray-700 mb-6">Ready to begin your ritual practice?</p>
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3" asChild>
            <a href="#contact">Join the Journey</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
