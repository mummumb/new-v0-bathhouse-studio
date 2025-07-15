import { Navigation } from "@/components/navigation"
import EnhancedHeroVideo from "@/components/enhanced-hero-video"
import AufgussRitualSection from "@/components/aufguss-ritual-section"
import CommunitySection from "@/components/community-section"
import PreparationSection from "@/components/preparation-section"
import BathhouseRitualsSection from "@/components/bathhouse-rituals-section"
import AboutSection from "@/components/about-section"
import UpcomingEventsSection from "@/components/upcoming-events-section"
import ServicesSection from "@/components/services-section"
import ValuesSection from "@/components/values-section"
import CommunityTestimonialsSection from "@/components/community-testimonials-section"
import ContactCollaborateSection from "@/components/contact-collaborate-section"
import JournalSection from "@/components/journal-section"
import AufgussVideoSection from "@/components/aufguss-video-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <EnhancedHeroVideo />
      <AufgussRitualSection />
      <AufgussVideoSection />
      <AboutSection />
      <CommunitySection />
      <PreparationSection />
      <BathhouseRitualsSection />
      <UpcomingEventsSection />
      <ServicesSection />
      <ValuesSection />
      <CommunityTestimonialsSection />
      <ContactCollaborateSection />
      <JournalSection />
      <Footer />
    </main>
  )
}
