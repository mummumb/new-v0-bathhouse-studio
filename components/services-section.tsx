import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"
import { services } from "@/lib/events-data"

export default function ServicesSection() {
  return (
    <section id="services" className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading mb-6 text-bathhouse-slate">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Individual wellness experiences designed to restore, rejuvenate, and reconnect you with your inner vitality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] mb-6">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.overlayColor} opacity-80`} />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-heading mb-2">{service.name}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{service.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bathhouse-cream rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-heading text-bathhouse-slate">{service.price}</span>
                    <span className="text-sm text-gray-600 ml-2">per session</span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      <Link href={`/services/${service.slug}`}>Learn More</Link>
                    </Button>
                    <Button size="sm" className="bg-black hover:bg-gray-800 text-white border-0" asChild>
                      <a href="#contact">Book Now</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Ready to Begin Your Wellness Journey?</h3>
          <p className="text-gray-600 mb-6">
            Each service can be booked individually or combined for a comprehensive wellness experience.
          </p>
          <Button size="lg" className="bg-bathhouse-teal hover:bg-bathhouse-teal/90 text-white px-8 py-3" asChild>
            <a href="#contact">Schedule Your Session</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
