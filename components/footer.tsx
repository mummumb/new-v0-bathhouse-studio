import Link from "next/link"
import { BathhouseLogoWhite } from "./logo"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="bathhouse-container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <BathhouseLogoWhite className="h-10 w-auto mb-4" />
            <p className="text-gray-400 mb-4 max-w-md">
              Inspired by timeless traditions through sauna, sound and breath for the way we live now.
            </p>
            <p className="text-sm text-gray-500">Founder & Aufguss Master</p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#rituals" className="hover:text-white transition-colors bathhouse-link">
                  Bathhouse Rituals
                </Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-white transition-colors bathhouse-link">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#journal" className="hover:text-white transition-colors bathhouse-link">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors bathhouse-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:amanda@bathhousestudio.com"
                  className="hover:text-white transition-colors bathhouse-link"
                >
                  Email Amanda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors bathhouse-link">
                  Instagram
                </a>
              </li>
              <li>
                <Link href="#events" className="hover:text-white transition-colors bathhouse-link">
                  Join the List
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <Link href="/p/privacy-policy" className="hover:text-white transition-colors bathhouse-link">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/p/terms-of-service" className="hover:text-white transition-colors bathhouse-link">
              Terms of Service
            </Link>
          </div>
          <p>&copy; 2024 Bathhouse Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
