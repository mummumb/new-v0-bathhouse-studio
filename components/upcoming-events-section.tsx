import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"
import { events } from "@/lib/events-data"

export function UpcomingEventsSection() {
  // Sort events by date (earliest first)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateA.getTime() - dateB.getTime()
  })

  return (
    <section id="events" className="bathhouse-section bg-bathhouse-cream">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading mb-6 text-bathhouse-slate">Upcoming Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Amanda for these transformative wellness experiences. Limited spaces available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sortedEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
              {/* Category Badge */}
              <div className="flex justify-between items-start mb-6">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                    event.category === "Mindfulness"
                      ? "bg-bathhouse-sage/20 text-bathhouse-sage"
                      : "bg-bathhouse-rose/20 text-bathhouse-rose"
                  }`}
                >
                  {event.category}
                </span>
                <div className="text-right">
                  <div className="text-3xl font-heading text-bathhouse-slate">{event.dateNumber}</div>
                  <div className="text-sm text-gray-600">{event.dateMonth}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">{event.title}</h3>

              {/* Description - Format line breaks properly */}
              <div className="text-gray-700 leading-relaxed mb-6 text-sm">
                {event.fullDescription.split("\n").map((line, index) => (
                  <p key={index} className={index > 0 ? "mt-3" : ""}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Event Details */}
              <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{event.capacity}</span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-heading text-bathhouse-slate">{event.price}</span>
                  <span className="text-sm text-gray-600 ml-2">{event.pricePerPerson}</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    <Link href={`/events/${event.slug}`}>View Details</Link>
                  </Button>
                  <Button size="sm" className="bg-black hover:bg-gray-800 text-white border-0" asChild>
                    <a href="#contact">Register Now</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Can't find section */}
        <div className="text-center mt-16 pt-12 border-t border-bathhouse-sand">
          <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-6">
            Interested in a private session or have questions about our rituals? Get in touch with Amanda directly.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-bathhouse-slate text-bathhouse-slate hover:bg-bathhouse-slate hover:text-white bg-transparent"
            asChild
          >
            <a href="#contact">Contact Amanda</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
