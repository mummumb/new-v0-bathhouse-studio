import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar } from "lucide-react"
import { events } from "@/lib/events-data"

export function RitualEventsSection() {
  return (
    <section id="events" className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl bathhouse-heading mb-6">Ritual Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto bathhouse-subheading">
            Join us for transformative wellness experiences across Australia and internationally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.slug} className="relative group overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${event.overlayColor}`} />
              <div className="relative flex flex-col justify-end h-full p-8 text-white">
                <div className="flex items-center space-x-4 text-sm opacity-90 mb-3 font-medium">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-heading mb-3">{event.title}</h3>
                <p className="text-base opacity-90 mb-6 max-w-sm">{event.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-white text-black hover:bg-gray-200 transition-colors">
                    <Link href={`/events/${event.slug}`}>Enter the Ritual</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <a href="#contact">Join the Immersion</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
