import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { services } from "@/lib/events-data"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: service.name,
    description: service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Bathhouse Studio`,
      description: service.description,
      url: `/services/${service.slug}`,
      images: [service.image || "/images/og-image.png"],
    },
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-white">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${service.overlayColor} opacity-80`} />
          <div className="relative text-center z-10 p-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-4">{service.name}</h1>
            <div className="flex justify-center items-center space-x-6 text-lg font-medium">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{service.availability}</span>
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
                <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">About This Service</h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>{service.description}</p>
                </div>
              </section>

              {/* Benefits Section */}
              <section id="benefits" className="mt-12">
                <h2 className="text-3xl font-heading mb-6 text-bathhouse-slate">What to Expect</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {service.benefits && service.benefits.map((benefit: { title: string; description: string }) => (
                    <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="font-medium mb-2 text-bathhouse-slate">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Instructor & Booking */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-gray-100">
                  <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Your Guide</h3>
                  <div className="flex items-center mb-4">
                    <Image
                      src={service.instructor.image || "/placeholder.svg"}
                      alt={service.instructor.name}
                      width={64}
                      height={64}
                      className="rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-bold text-bathhouse-slate">{service.instructor.name}</p>
                      <p className="text-sm text-gray-500">{service.instructor.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.instructor.bio}</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Book This Service</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{service.duration}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Availability:</span>
                      <span className="font-medium">{service.availability}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-2xl font-heading text-bathhouse-slate">{service.price}</span>
                    </div>
                  </div>
                  <Button size="lg" className="w-full bg-bathhouse-teal hover:bg-bathhouse-teal/90 text-white border-0 mb-4" asChild>
                    <a href="#contact">Book Your Session</a>
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
