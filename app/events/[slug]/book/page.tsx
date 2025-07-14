import { notFound } from "next/navigation"
import { events } from "@/lib/events-data"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BookingForm from "@/components/booking-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BookingPage({ params }: { params: { slug: string } }) {
  const event = events.find((e) => e.slug === params.slug)

  if (!event) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main className="bg-bathhouse-cream min-h-screen">
        <div className="bathhouse-container py-16 sm:py-20">
          <div className="mb-8">
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center text-bathhouse-slate hover:text-black transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {event.title}
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-heading mb-4 text-bathhouse-slate">Book Your Experience</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You're just one step away from joining Amanda for this transformative ritual experience.
            </p>
          </div>

          <BookingForm
            eventSlug={event.slug}
            eventTitle={event.title}
            eventDate={event.date}
            eventLocation={event.location}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
