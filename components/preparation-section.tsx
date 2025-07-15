import {
  ShowerHeadIcon as Shower,
  Shirt,
  Footprints,
  Droplets,
  Smartphone,
  DoorOpen,
  Snowflake,
  Zap,
} from "lucide-react"

const preparationSteps = [
  {
    icon: Shower,
    title: "Shower before entering",
    description: "Cleanse your body to prepare for the ritual",
  },
  {
    icon: Shirt,
    title: "Use a towel",
    description: "Always sit on a clean towel in the sauna",
  },
  {
    icon: Footprints,
    title: "Bare feet",
    description: "Remove shoes and socks for the authentic experience",
  },
  {
    icon: Droplets,
    title: "Hydrate Before & After",
    description: "Drink plenty of water to support your body",
  },
  {
    icon: Smartphone,
    title: "Leave electronics outside",
    description: "Embrace the digital detox and be present",
  },
  {
    icon: DoorOpen,
    title: "Close the door gently",
    description: "Maintain the sacred space for everyone",
  },
  {
    icon: Snowflake,
    title: "Cool down after",
    description: "Allow your body to gradually return to normal temperature",
  },
  {
    icon: Zap,
    title: "Don't apply oils or lotions",
    description: "Keep your skin natural for the best experience",
  },
]

export function PreparationSection() {
  return (
    <section className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading mb-6 text-bathhouse-slate">
            How to Prepare For an Aufguss Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aufguss Etiquette - A gentle guide to help you feel comfortable and prepared for your ritual.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {preparationSteps.map((step, index) => (
            <div key={index} className="bg-bathhouse-cream rounded-lg p-6 text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                <step.icon className="h-6 w-6 text-bathhouse-slate" />
              </div>
              <h3 className="font-medium mb-2 text-bathhouse-slate">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
