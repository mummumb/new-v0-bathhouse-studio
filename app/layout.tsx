import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter_Tight, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  preload: true,
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  `http://localhost:${process.env.PORT || 3000}`

export const metadata: Metadata = {
  title: {
    default: "Bathhouse Studio | Stress-Resilience Rituals by Amanda Berger",
    template: "%s | Bathhouse Studio",
  },
  description:
    "Contemporary approaches to ancient sauna and breathwork traditions. Join Amanda Berger for transformative Aufguss rituals, cold plunge sessions, and breathwork experiences in Melbourne, Australia.",
  keywords: [
    "sauna",
    "aufguss",
    "breathwork",
    "cold plunge",
    "wellness",
    "stress resilience",
    "Amanda Berger",
    "Melbourne",
    "Australia",
    "ritual",
    "recovery",
    "nervous system",
  ],
  authors: [{ name: "Amanda Berger", url: siteUrl }],
  creator: "Amanda Berger",
  publisher: "Bathhouse Studio",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    title: "Bathhouse Studio | Stress-Resilience Rituals by Amanda Berger",
    description:
      "Contemporary approaches to ancient sauna and breathwork traditions. Transformative wellness experiences in Melbourne, Australia.",
    siteName: "Bathhouse Studio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bathhouse Studio - Amanda Berger performing Aufguss ritual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bathhouse Studio | Stress-Resilience Rituals",
    description: "Contemporary approaches to ancient sauna and breathwork traditions by Amanda Berger.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EBDE" },
    { media: "(prefers-color-scheme: dark)", color: "#5A6870" },
  ],
}

// Generate structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bathhouse Studio",
  url: siteUrl,
  logo: `${siteUrl}/images/bathhouse-logo-black.png`,
  description: "Contemporary approaches to ancient sauna and breathwork traditions",
  founder: {
    "@type": "Person",
    name: "Amanda Berger",
    jobTitle: "Founder & Aufguss Master",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61-000-000-000",
    contactType: "customer service",
    email: "amanda@bathhousestudio.com",
  },
  sameAs: ["https://instagram.com/bathhousestudio"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${interTight.variable} ${inter.variable} font-sans antialiased bg-white text-black`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
