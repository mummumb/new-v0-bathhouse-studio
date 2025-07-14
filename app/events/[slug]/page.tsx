import { notFound } from "next/navigation"
// import Image from "next/image"
import { events } from "@/lib/events-data"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = events.find((e) => e.slug === params.slug)

  if (!event) {
    notFound()
  }

  // Google Form URLs for each event type
  const googleFormUrls = {
    "aufguss-a-sauna-ritual": "https://forms.gle/YourAufgussFormID",
    "cold-water-immersion": "https://forms.gle/YourColdPlungeFormID",
    "breathwork-and-stillness": "https://forms.gle/YourBreathworkFormID",
    "community-hot-plunge": "https://forms.gle/YourHotPlungeFormID",
  }

  const googleFormUrl = googleFormUrls[event.slug as keyof typeof googleFormUrls] || "https://forms.gle/DefaultFormID"

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-white">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${event.overlayColor} opacity-80`} />
          <div className="relative text-center z-10 p-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-4">{event.title}</h1>
            <div className="flex justify-center items-center space-x-6 text-lg font-medium">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{event.location}</span>
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
                <h2 className="text-3xl font-heading mb-4 text-bathhouse-slate">About this Ritual</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{event.description}</p>
              </section>

              {event.schedule && (
                <section id="schedule" className="mt-12">
                  <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">Event Schedule</h2>
                  <div className="border-l-2 border-black pl-6 space-y-6">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-black border-4 border-bathhouse-cream" />
                        <p className="font-bold text-bathhouse-slate">{item.time}</p>
                        <p className="text-gray-600">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {event.faqs && (
                <section id="faq" className="mt-12">
                  <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {event.faqs.map((faq, index) => (
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
                {event.instructor && (
                  <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-gray-100">
                    <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Your Guide</h3>
                    <div className="flex items-center mb-4">
                      <img
                        src={event.instructor.image || "/placeholder.svg"}
                        alt={event.instructor.name}
                        width={64}
                        height={64}
                        className="rounded-full mr-4 object-cover"
                      />
                      <div>
                        <p className="font-bold text-bathhouse-slate">{event.instructor.name}</p>
                        <p className="text-sm text-gray-500">{event.instructor.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{event.instructor.bio}</p>
                  </div>
                )}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Reserve Your Spot</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Complete our booking form and Amanda will confirm your spot within 24 hours.
                  </p>
                  <Button size="lg" className="w-full bg-black hover:bg-gray-800 text-white border-0 mb-4" asChild>
                    <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                      Book Your Spot
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
