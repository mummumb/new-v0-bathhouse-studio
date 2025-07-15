import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { events, services } from "@/lib/events-data"

export function ContactCollaborateSection() {
  return (
    <section id="contact" className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading mb-6 text-bathhouse-slate">Contact Us</h2>
            <p className="text-xl text-gray-600 bathhouse-text-balance">
              To book your next Bathhouse Ritual OR to collaborate with us, please fill in the form below.
            </p>
          </div>

          <div className="bg-bathhouse-cream rounded-2xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="focus-visible:ring-bathhouse-teal"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="focus-visible:ring-bathhouse-teal"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  I'm interested in *
                </label>
                <Select>
                  <SelectTrigger className="focus:ring-bathhouse-teal">
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Upcoming Events</SelectLabel>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.slug}>
                          {event.title} - {event.date}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Individual Services</SelectLabel>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.slug}>
                          {service.name} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Other Options</SelectLabel>
                      <SelectItem value="breathwork">Bathhouse Ritual 01 — Breathwork</SelectItem>
                      <SelectItem value="aufguss">Bathhouse Ritual 02 — Aufguss</SelectItem>
                      <SelectItem value="sound">Bathhouse Ritual 03 — Sound</SelectItem>
                      <SelectItem value="collaboration">Collaboration opportunity</SelectItem>
                      <SelectItem value="retreat">Private retreat</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your interest, preferred dates, or collaboration idea..."
                  rows={5}
                  className="focus-visible:ring-bathhouse-teal"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-black hover:bg-gray-800 text-white border-0">
                Send Message
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-bathhouse-sand text-center">
              <p className="text-sm text-gray-600">
                For immediate questions, email Amanda directly at{" "}
                <a href="mailto:amanda@bathhousestudio.com" className="text-bathhouse-teal hover:underline">
                  amanda@bathhousestudio.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
