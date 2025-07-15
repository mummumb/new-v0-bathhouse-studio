// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Globe, Leaf, Dumbbell, ArrowRight } from "lucide-react"

const credentials = [
  { icon: Award, text: "17 Years of Industry Experience" },
  { icon: Globe, text: "Certified Aufguss Sauna Master" },
  { icon: Leaf, text: "Breathwork Facilitator" },
  { icon: Dumbbell, text: "Movement Teacher (Pilates & PT)" },
]

const achievements = [
  { number: "42", label: "Bathhouses Studied Globally" },
  { number: "17+", label: "Years of Experience" },
  { number: "1000+", label: "Rituals Facilitated" },
]

export function FounderCredibilitySection() {
  return (
    <section id="founder" className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        {/* Stats section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-heading mb-10">The Journey to Mastery</h2>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl sm:text-7xl font-heading text-bathhouse-teal mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-heading mb-6 text-bathhouse-slate">
              Crafted from Global Expertise
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed bathhouse-text-balance">
              The Bathhouse Studio experience is the culmination of a global pilgrimage and 17 years of deep expertise.
              Amanda's key disciplines—Aufguss, breathwork, and movement—are woven into every ritual, creating a
              practice that is both authentic and transformative.
            </p>

            <Button
              size="lg"
              className="bg-bathhouse-teal hover:bg-bathhouse-teal/90 text-white px-8 py-3 group"
              asChild
            >
              <a href="#rituals" className="flex items-center">
                Experience Amanda's Vision
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          <div className="bg-bathhouse-cream p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row text-center sm:text-left items-center mb-8">
              <img
                src="/images/amanda-berger-headshot.jpeg"
                alt="Headshot of Amanda Berger, a woman with blonde hair, smiling warmly."
                width={120}
                height={120}
                className="rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 shadow-lg"
                loading="lazy"
              />
              <div>
                <h4 className="text-2xl font-heading mb-2">Amanda Berger</h4>
                <p className="text-bathhouse-slate font-medium mb-2">Founder & Wellness Architect</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-bathhouse-slate mb-4">Expertise</h5>
              <ul className="space-y-3">
                {credentials.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <item.icon className="h-5 w-5 text-bathhouse-teal mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 pt-4">
                <a href="/journal" className="text-bathhouse-teal hover:underline">
                  Read more about Amanda's journey in her journal.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
