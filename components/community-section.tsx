// import Image from "next/image"

export default function CommunitySection() {
  return (
    <section className="bathhouse-section" style={{ backgroundColor: "#F2EBDE" }}>
      <div className="bathhouse-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-heading mb-6 text-bathhouse-slate">At the Heart of Community</h2>
            <p className="text-xl text-gray-600 leading-relaxed bathhouse-text-balance">
              We create transformative experiences for people that foster connection.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
              <img
                src="/images/ritual-community.jpeg"
                alt="A diverse group of people relaxing and connecting in a serene, sunlit wellness lounge, fostering a sense of community."
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
