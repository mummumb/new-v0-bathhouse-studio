import { Droplets, Wind, Music, Hand, Heart, Flame, HeartPulse, BrainCircuit, Sparkles } from "lucide-react"
import { getPageContentById } from "@/lib/data-utils"

const ritualSteps = [
  {
    icon: Droplets,
    title: "Steam",
    description: "How to control the volume and placement of water on the stones",
  },
  {
    icon: Wind,
    title: "Aromatherapy",
    description:
      "Essential oils chosen to calm, uplift, ground or energise your mood. We blend aromas with intention, not overpowering, but unfolding gently in the heat.",
  },
  {
    icon: Music,
    title: "Music",
    description:
      "It's the heartbeat of the ritual. We match the rhythm of breath and movement through ambient tones and soulful instrumentals.",
  },
  {
    icon: Hand,
    title: "Towel Waving",
    description: "Choreographed movements that distribute heat. It's not performance — it's presence in motion.",
  },
  {
    icon: Heart,
    title: "The Master",
    description:
      "Creating an experience based on knowledge, creativity & professionalism to take you on an authentic wellbeing journey.",
  },
]

const benefits = [
  { icon: Flame, text: "Deep Detoxification" },
  { icon: HeartPulse, text: "Improved Circulation" },
  { icon: BrainCircuit, text: "Calm & Clarity" },
  { icon: Sparkles, text: "Mindful Presence" },
]

export default async function AufgussRitualSection() {
  const pageData = await getPageContentById("aufguss-ritual-section")

  if (!pageData) {
    return null // Or a fallback component
  }
  const { content } = pageData

  return (
    <section id="aufguss" className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading mb-6 text-bathhouse-slate">{content.heading}</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed bathhouse-text-balance">
            {content.subheading}
          </p>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-heading text-bathhouse-slate mb-8">{content.master_knows_heading}</h3>
        </div>

        <div className="grid md:grid-cols-5 gap-8 mb-16">
          {ritualSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-bathhouse-cream p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <step.icon className="h-10 w-10 text-bathhouse-slate" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-bathhouse-slate">{step.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-bathhouse-cream rounded-2xl p-8 md:p-12 mb-16">
          <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">{content.benefits_subheading}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center bg-white rounded-lg p-4 shadow-sm">
                <benefit.icon className="h-6 w-6 text-bathhouse-teal mr-3" />
                <span className="font-medium text-bathhouse-slate">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="text-center">
          <p className="text-2xl md:text-3xl font-heading text-bathhouse-slate italic mb-4 bathhouse-text-balance">
            {content.quote}
          </p>
          <cite className="text-gray-700 font-medium">{content.quote_cite}</cite>
        </blockquote>
      </div>
    </section>
  )
}
