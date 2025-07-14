"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, Play } from "lucide-react"

export default function HeroVideoSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
      // Auto-play only if user hasn't interacted and prefers reduced motion is not set
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (!prefersReducedMotion) {
        video.play().catch(() => {
          // If autoplay fails, show play button
          setShowPlayButton(true)
        })
      } else {
        setShowPlayButton(true)
      }
    }

    const handlePlay = () => setIsVideoPlaying(true)
    const handlePause = () => setIsVideoPlaying(false)
    const handleError = () => {
      setShowPlayButton(true)
      setIsVideoLoaded(false)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
    }
  }, [])

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setShowPlayButton(false)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fallback Image - Amanda performing Aufguss */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVideoLoaded && isVideoPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/images/amanda-aufguss-hero.jpeg"
          alt="Amanda Berger performing an authentic Aufguss ritual in a traditional sauna with ocean view"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </div>

      {/* Optimized Video */}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && isVideoPlaying ? "opacity-100" : "opacity-0"
        }`}
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/amanda-aufguss-hero.jpeg"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-18%20at%2020.06.04-1Y7scDu8jQxWrBHdc1GR7hTCF3RNEV.mp4" type="video/mp4" />
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aufguss-Nq8DVGOrnLT7KLtYs4Gr7XtIeLV7Rr.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play Button Overlay */}
      {showPlayButton && !isVideoPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 z-15 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
          aria-label="Play Aufguss ritual video"
        >
          <div className="bg-white/90 hover:bg-white rounded-full p-6 group-hover:scale-110 transition-transform shadow-lg">
            <Play className="h-12 w-12 text-bathhouse-slate ml-1" fill="currentColor" />
          </div>
          <div className="absolute bottom-4 bg-black/50 rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">Watch Amanda's Aufguss Ritual</span>
          </div>
        </button>
      )}

      {/* Brand Color Overlay */}
      <div className="absolute inset-0 bg-bathhouse-slate/20 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-4 bathhouse-text-balance">
          Bathhouse Rituals by Amanda Berger
        </h1>
        <p className="text-lg md:text-xl font-light mb-2 tracking-wide">Founder & Aufguss Master</p>
        <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto bathhouse-text-balance">
          A contemporary approach to ancient sauna and breathwork traditions.
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a href="#aufguss" aria-label="Scroll down to learn about the Aufguss ritual">
          <ChevronDown className="h-8 w-8 text-white animate-bounce" />
        </a>
      </div>

      {/* Loading Indicator */}
      {!isVideoLoaded && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-black/50 rounded-full px-3 py-1">
            <span className="text-white text-xs">Loading ritual video...</span>
          </div>
        </div>
      )}
    </section>
  )
}
