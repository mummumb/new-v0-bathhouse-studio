import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function EventsRetreatsSection() {
  return (
    <section id="events" className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading mb-6 text-bathhouse-slate">Events & Retreats</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 bathhouse-text-balance">
            Amanda leads seasonal gatherings, workshops, and intimate retreats, weaving ritual, nature, and breathwork
            into every experience. Upcoming events and retreats will be announced here first—sign up for early access.
          </p>

          {/* Email Signup */}
          <div className="bg-bathhouse-cream rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading mb-4 text-bathhouse-slate">Be First to Know</h3>
            <p className="text-gray-600 mb-6">
              Receive early access to upcoming rituals and retreats, plus Amanda's reflections on wellness and
              community.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 focus-visible:ring-bathhouse-teal"
                required
              />
              <Button type="submit" className="bg-black hover:bg-gray-800 text-white px-8 group border-0">
                Begin Your Ritual
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
