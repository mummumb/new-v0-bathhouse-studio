import { Mail, Phone, MapPin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  return (
    <section id="contact" className="bathhouse-section" style={{ backgroundColor: "#F2EBDE" }}>
      <div className="bathhouse-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready to begin your wellness journey? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-600 mr-4" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:amanda@bathhousestudio.com"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    amanda@bathhousestudio.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-600 mr-4" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+61000000000" className="text-gray-600 hover:text-black transition-colors">
                    +61 000 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-600 mr-4" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">Melbourne, Australia</p>
                </div>
              </div>

              <div className="flex items-center">
                <Instagram className="h-5 w-5 text-gray-600 mr-4" />
                <div>
                  <p className="font-medium">Follow Us</p>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">
                    @bathhousestudio
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="Your first name" className="focus-visible:ring-bathhouse-teal" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Your last name" className="focus-visible:ring-bathhouse-teal" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="focus-visible:ring-bathhouse-teal"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your wellness goals..."
                  rows={4}
                  className="focus-visible:ring-bathhouse-teal"
                />
              </div>

              <Button type="submit" className="w-full bg-bathhouse-teal hover:bg-bathhouse-teal/90 text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
