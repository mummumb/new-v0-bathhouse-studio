import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Mandy A",
    text: "Words can't express how much I appreciate Amanda changing my life and bringing me into her wellness world. Tribe is her field of excellence.",
  },
  {
    name: "James R",
    text: "Amanda introduced me to Aufguss and it literally took my breath away. Highly recommend her bathhouse rituals",
  },
  {
    name: "Lisa M",
    text: "As someone who has always been intimidated to do sauna group sessions, Amanda has made me feel at home and motivated to continue the rituals regularly.",
  },
]

export function CommunityTestimonialsSection() {
  return (
    <section className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading mb-6 text-bathhouse-slate">What Our Community Says</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-bathhouse-cream rounded-2xl p-8 relative">
              <Quote className="h-8 w-8 text-bathhouse-teal/30 mb-4" />
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">"{testimonial.text}"</blockquote>
              <cite className="font-medium text-bathhouse-slate not-italic">{testimonial.name}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
