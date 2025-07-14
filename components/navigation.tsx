"use client"

import Link from "next/link"
import { Search, User, Menu, X } from "lucide-react"
import { BathhouseLogoBlack } from "./logo"
import { useState } from "react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "#rituals", label: "Bathhouse Rituals" },
    { href: "#events", label: "Events" },
    { href: "#journal", label: "Journal" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="bg-white/90 backdrop-blur-md">
        <div className="bathhouse-container flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <BathhouseLogoBlack className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Utility Icons & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-black hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-black hidden sm:block">
              <User className="h-5 w-5" />
            </button>
            <button className="md:hidden text-gray-600 hover:text-black" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 border-t border-gray-100">
            <div className="py-4 px-4 sm:px-6 lg:px-8 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-base font-medium text-gray-700 hover:text-black transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 flex space-x-4">
                <button className="text-gray-600 hover:text-black">
                  <Search className="h-6 w-6" />
                </button>
                <button className="text-gray-600 hover:text-black">
                  <User className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
