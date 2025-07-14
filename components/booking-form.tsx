"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Calendar, MapPin, User } from "lucide-react"

// Google Form URLs for each event type
const GOOGLE_FORM_URLS = {
  "aufguss-a-sauna-ritual": "https://forms.gle/YourAufgussFormID",
  "cold-water-immersion": "https://forms.gle/YourColdPlungeFormID",
  "breathwork-and-stillness": "https://forms.gle/YourBreathworkFormID",
  "community-hot-plunge": "https://forms.gle/YourHotPlungeFormID",
  // Add more as needed
}

interface BookingFormProps {
  eventSlug: string
  eventTitle: string
  eventDate: string
  eventLocation: string
}

export default function BookingForm({ eventSlug, eventTitle, eventDate, eventLocation }: BookingFormProps) {
  const googleFormUrl =
    GOOGLE_FORM_URLS[eventSlug as keyof typeof GOOGLE_FORM_URLS] || "https://forms.gle/DefaultFormID"

  const handleBookingClick = () => {
    // Open Google Form in new tab
    window.open(googleFormUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-heading text-bathhouse-slate">Book Your Ritual</CardTitle>
        <CardDescription>Reserve your spot for this transformative experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Summary */}
        <div className="bg-bathhouse-cream rounded-lg p-6 space-y-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-bathhouse-slate mr-3" />
            <div>
              <p className="font-medium text-bathhouse-slate">Event</p>
              <p className="text-gray-700">{eventTitle}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-bathhouse-slate mr-3" />
            <div>
              <p className="font-medium text-bathhouse-slate">Date</p>
              <p className="text-gray-700">{eventDate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-bathhouse-slate mr-3" />
            <div>
              <p className="font-medium text-bathhouse-slate">Location</p>
              <p className="text-gray-700">{eventLocation}</p>
            </div>
          </div>
          <div className="flex items-center">
            <User className="h-5 w-5 text-bathhouse-slate mr-3" />
            <div>
              <p className="font-medium text-bathhouse-slate">Guide</p>
              <p className="text-gray-700">Amanda Berger</p>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-bathhouse-slate">What to Expect</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-bathhouse-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Personal guidance from Amanda throughout the experience
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-bathhouse-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
              All necessary equipment and refreshments provided
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-bathhouse-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Small group setting for personalized attention
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-bathhouse-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Welcome to all experience levels
            </li>
          </ul>
        </div>

        {/* Booking Button */}
        <div className="space-y-4">
          <Button
            onClick={handleBookingClick}
            size="lg"
            className="w-full bg-black hover:bg-gray-800 text-white border-0 group"
          >
            Complete Booking Form
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-gray-500 text-center">
            You'll be redirected to a secure form to complete your booking. Amanda will confirm your spot within 24
            hours.
          </p>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 text-center">
            Questions about this ritual?{" "}
            <a href="mailto:amanda@bathhousestudio.com" className="text-bathhouse-teal hover:underline">
              Email Amanda directly
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
