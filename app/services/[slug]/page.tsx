import { notFound } from "next/navigation"
import { services } from "@/lib/events-data"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"

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
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
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
                  {service.category === "sauna" && (
                    <>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Deep Detoxification</h3>
                        <p className="text-sm text-gray-600">
                          Purify your body through the healing power of heat and steam.
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Stress Relief</h3>
                        <p className="text-sm text-gray-600">
                          Release tension and find deep relaxation in our authentic sauna.
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Improved Circulation</h3>
                        <p className="text-sm text-gray-600">Enhance blood flow and support cardiovascular health.</p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Mental Clarity</h3>
                        <p className="text-sm text-gray-600">
                          Clear your mind and find inner peace through heat therapy.
                        </p>
                      </div>
                    </>
                  )}
                  {service.category === "breathwork" && (
                    <>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Stress Reduction</h3>
                        <p className="text-sm text-gray-600">Learn techniques to calm your nervous system naturally.</p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Increased Energy</h3>
                        <p className="text-sm text-gray-600">Boost vitality through conscious breathing practices.</p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Mental Clarity</h3>
                        <p className="text-sm text-gray-600">Enhance focus and cognitive function through breath.</p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Emotional Balance</h3>
                        <p className="text-sm text-gray-600">Find emotional stability and inner peace.</p>
                      </div>
                    </>
                  )}
                  {service.category === "cold-therapy" && (
                    <>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Enhanced Recovery</h3>
                        <p className="text-sm text-gray-600">Accelerate muscle recovery and reduce inflammation.</p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Improved Circulation</h3>
                        <p className="text-sm text-gray-600">Boost blood flow and cardiovascular health.</p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Mental Resilience</h3>
                        <p className="text-sm text-gray-600">Build mental toughness and stress tolerance.</p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="font-medium mb-2 text-bathhouse-slate">Energy Boost</h3>
                        <p className="text-sm text-gray-600">Invigorate your system and increase alertness.</p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column: Instructor & Booking */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-gray-100">
                  <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Your Guide</h3>
                  <div className="flex items-center mb-4">
                    <img
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
                  <Button size="lg" className="w-full bg-black hover:bg-gray-800 text-white border-0 mb-4" asChild>
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
