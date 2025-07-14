import { notFound } from "next/navigation"
import { getRitualBySlug } from "@/lib/data-utils"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default async function RitualDetailPage({ params }: { params: { slug: string } }) {
  const ritual = await getRitualBySlug(params.slug)

  if (!ritual || !ritual.isPublished) {
    notFound()
  }

  // Google Form URLs for each ritual type
  const googleFormUrls = {
    "breathwork-ritual": "https://forms.gle/YourBreathworkFormID",
    "aufguss-ritual": "https://forms.gle/YourAufgussFormID",
    "sound-ritual": "https://forms.gle/YourSoundFormID",
  }

  const googleFormUrl = googleFormUrls[ritual.slug as keyof typeof googleFormUrls] || "https://forms.gle/DefaultFormID"

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-white">
          <img
            src={ritual.image || "/placeholder.svg"}
            alt={ritual.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative text-center z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-2">{ritual.title}</h1>
            <p className="text-xl sm:text-2xl font-light italic mb-6">{ritual.subtitle}</p>
            <div className="flex justify-center items-center space-x-6 text-lg font-medium">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{ritual.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{ritual.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="bg-bathhouse-cream">
          <div className="bathhouse-container grid lg:grid-cols-3 gap-12 lg:gap-16 py-16 sm:py-20">
            {/* Left Column: Details */}
            <div className="lg:col-span-2">
              <section id="details">
                <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">About this Ritual</h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: ritual.description }} />
                  <div className="italic text-gray-600" dangerouslySetInnerHTML={{ __html: ritual.fullDescription }} />
                </div>
              </section>

              {ritual.benefits && ritual.benefits.length > 0 && (
                <section id="benefits" className="mt-12">
                  <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {ritual.benefits.map((benefit, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {ritual.schedule && ritual.schedule.length > 0 && (
                <section id="schedule" className="mt-12">
                  <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">Session Flow</h2>
                  <div className="border-l-2 border-black pl-6 space-y-6">
                    {ritual.schedule.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-black border-4 border-bathhouse-cream" />
                        <p className="font-bold text-bathhouse-slate">{item.time}</p>
                        <p className="text-gray-600">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {ritual.faqs && ritual.faqs.length > 0 && (
                <section id="faq" className="mt-12">
                  <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {ritual.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
                        <AccordionTrigger className="text-left font-medium text-bathhouse-slate hover:text-black">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}
            </div>

            {/* Right Column: Instructor & Booking */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                {ritual.instructor && (
                  <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-gray-100">
                    <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Your Guide</h3>
                    <div className="flex items-center mb-4">
                      <img
                        src={ritual.instructor.image || "/placeholder.svg"}
                        alt={ritual.instructor.name}
                        width={64}
                        height={64}
                        className="rounded-full mr-4 object-cover"
                      />
                      <div>
                        <p className="font-bold text-bathhouse-slate">{ritual.instructor.name}</p>
                        <p className="text-sm text-gray-500">{ritual.instructor.title}</p>
                      </div>
                    </div>
                    <div
                      className="text-sm text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: ritual.instructor.bio }}
                    />
                  </div>
                )}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Join This Ritual</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Complete our booking form and Amanda will confirm your spot within 24 hours.
                  </p>
                  <Button size="lg" className="w-full bg-black hover:bg-gray-800 text-white border-0 mb-4" asChild>
                    <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                      Reserve Your Space
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-black text-black hover:bg-black hover:text-white bg-transparent"
                    asChild
                  >
                    <a href="mailto:amanda@bathhousestudio.com">Ask Amanda a Question</a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
