"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { getVideoConfig, hasLimitedBandwidth } from "@/lib/video-utils"

interface OptimizedVideoProps {
  basePath: string
  poster: string
  alt: string
  className?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedVideo({
  basePath,
  poster,
  alt,
  className = "",
  priority = false,
  onLoad,
  onError,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const config = getVideoConfig(basePath, poster)

    // Set video attributes based on device capabilities
    video.preload = config.preload
    video.muted = config.muted
    video.loop = config.loop

    const handleCanPlay = () => {
      setIsLoaded(true)
      onLoad?.()

      if (config.autoplay && !hasLimitedBandwidth()) {
        video.play().catch(() => {
          setShowPlayButton(true)
        })
      } else {
        setShowPlayButton(true)
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setShowPlayButton(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setHasError(true)
      setShowPlayButton(false)
      onError?.()
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
  }, [basePath, poster, onLoad, onError])

  const handlePlayClick = () => {
    if (videoRef.current && !hasError) {
      videoRef.current.play()
    }
  }

  // Show static image if there's an error or limited bandwidth
  if (hasError || (hasLimitedBandwidth() && !isPlaying)) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={poster || "/images/amanda-aufguss-hero.jpeg"}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          quality={90}
          sizes="100vw"
        />
        {!hasError && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
            aria-label="Play Aufguss ritual video"
          >
            <div className="bg-white/90 hover:bg-white rounded-full p-6 group-hover:scale-110 transition-transform shadow-lg">
              <Play className="h-12 w-12 text-bathhouse-slate ml-1" fill="currentColor" />
            </div>
            <div className="absolute bottom-4 bg-black/50 rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">Watch the Ritual</span>
            </div>
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Fallback Image - Amanda's authentic Aufguss photo */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded && isPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={poster || "/images/amanda-aufguss-hero.jpeg"}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Optimized Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded && isPlaying ? "opacity-100" : "opacity-0"
        }`}
        playsInline
        poster={poster}
      >
        <source src={`${basePath}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play Button */}
      {showPlayButton && !isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group z-10"
          aria-label="Play Aufguss ritual video"
        >
          <div className="bg-white/90 hover:bg-white rounded-full p-6 group-hover:scale-110 transition-transform shadow-lg">
            <Play className="h-12 w-12 text-bathhouse-slate ml-1" fill="currentColor" />
          </div>
          <div className="absolute bottom-4 bg-black/50 rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">Experience the Ritual</span>
          </div>
        </button>
      )}

      {/* Loading Indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/50 rounded-full px-3 py-1">
            <span className="text-white text-xs">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}
