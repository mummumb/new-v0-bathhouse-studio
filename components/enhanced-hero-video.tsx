"use client"

import { useState, useRef, useEffect, useCallback } from "react"
// import Image from "next/image"
import { ChevronDown, Play, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const VIDEO_SOURCE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video-KwV1ZpWXgu439152qhwevLRFsdnBvK.MP4"
const FALLBACK_IMAGE = "/images/amanda-aufguss-hero.jpeg"

export default function EnhancedHeroVideo() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setUseFallback(true)
      setIsLoading(false)
    }
  }, [])

  const handlePlayClick = useCallback(() => {
    const video = videoRef.current
    if (video && isLoaded) {
      video.play().catch(() => {
        setUseFallback(true)
      })
    }
  }, [isLoaded])

  useEffect(() => {
    const video = videoRef.current
    if (!video || useFallback) {
      setIsLoading(false)
      return
    }

    const onLoadStart = () => {
      setIsLoading(true)
    }

    const onCanPlay = () => {
      setIsLoaded(true)
      setIsLoading(false)

      // On mobile, try to autoplay immediately
      if (isMobile) {
        video.play().catch(() => {
          // If autoplay fails on mobile, show play button
          setShowPlayButton(true)
        })
      } else {
        // On desktop, show play button
        setShowPlayButton(true)
      }
    }

    const onPlay = () => {
      setIsPlaying(true)
      setShowPlayButton(false)
    }

    const onPause = () => {
      setIsPlaying(false)
      if (!isMobile) {
        setShowPlayButton(true)
      }
    }

    const onError = () => {
      console.warn("Hero video failed to load")
      setUseFallback(true)
      setIsLoading(false)
    }

    const onWaiting = () => {
      setIsLoading(true)
    }

    const onCanPlayThrough = () => {
      setIsLoading(false)
    }

    video.addEventListener("loadstart", onLoadStart)
    video.addEventListener("canplay", onCanPlay)
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("error", onError)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("canplaythrough", onCanPlayThrough)

    // Start loading immediately
    if (video.currentSrc !== VIDEO_SOURCE) {
      video.src = VIDEO_SOURCE
      video.load()
    }

    return () => {
      video.removeEventListener("loadstart", onLoadStart)
      video.removeEventListener("canplay", onCanPlay)
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("error", onError)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("canplaythrough", onCanPlayThrough)
    }
  }, [useFallback, isMobile])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fallback Image - Always rendered, visibility controlled by opacity */}
      <img
        src={FALLBACK_IMAGE || "/placeholder.svg"}
        alt="Amanda Berger, founder of Bathhouse Studio, performing a dynamic Aufguss towel ritual in a sunlit, coastal sauna."
        className="object-cover transition-opacity duration-500 absolute inset-0 w-full h-full"
        loading="eager"
      />

      {/* Video Element */}
      {!useFallback && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
          poster={FALLBACK_IMAGE}
          muted
          loop
          playsInline
          preload={isMobile ? "auto" : "metadata"}
          aria-label="Amanda Berger demonstrating the Aufguss ritual technique"
        />
      )}

      {/* Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-4 bathhouse-text-balance drop-shadow-lg">
          Bathhouse Rituals
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide max-w-3xl mx-auto bathhouse-text-balance drop-shadow">
          Inspired by timeless traditions through sauna, sound and breath for the way we live now.
        </p>
      </div>

      {/* Interactive Play Button - Only show on desktop or when autoplay fails */}
      {showPlayButton && !isPlaying && !useFallback && (
        <div className="absolute z-20 bottom-[20vh] left-1/2 -translate-x-1/2">
          <button
            onClick={handlePlayClick}
            className="flex flex-col items-center justify-center transition-all duration-300 group"
            aria-label="Play Aufguss ritual video"
          >
            <div className="bg-white hover:bg-gray-100 rounded-full p-6 group-hover:scale-110 transition-transform shadow-2xl mb-4">
              <Play className="h-12 w-12 text-black ml-1" fill="currentColor" />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-black font-medium">Watch the Ritual</span>
            </div>
          </button>
        </div>
      )}

      {/* Loading Indicator - Show while video is loading */}
      {isLoading && !useFallback && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 flex items-center">
            <Loader2 className="h-5 w-5 text-white animate-spin mr-3" />
            <span className="text-white text-sm">Loading ritual...</span>
          </div>
        </div>
      )}

      {/* Mobile Loading Hint - Only show on mobile while loading */}
      {isMobile && isLoading && !useFallback && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-white text-sm">Preparing your ritual experience...</span>
          </div>
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#aufguss"
          aria-label="Scroll down to learn about the Aufguss ritual"
          className="block hover:scale-110 transition-transform"
        >
          <ChevronDown className="h-8 w-8 text-white animate-bounce drop-shadow" />
        </a>
      </div>
    </section>
  )
}
