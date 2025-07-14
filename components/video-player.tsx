"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster: string
  alt: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
}

export default function VideoPlayer({
  src,
  poster,
  alt,
  className = "",
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Detect mobile device
    setIsMobile(window.innerWidth <= 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      setIsBuffering(false)
      if (autoPlay && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.play().catch(() => {
          // Autoplay was prevented
        })
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setIsBuffering(false)
    }

    const handlePause = () => setIsPlaying(false)

    const handleWaiting = () => setIsBuffering(true)

    const handleCanPlayThrough = () => setIsBuffering(false)

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("canplaythrough", handleCanPlayThrough)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("canplaythrough", handleCanPlayThrough)
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (videoRef.current && isLoaded) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className={`relative group bg-black overflow-hidden ${className}`}
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={alt}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Indicator */}
      {(isBuffering || !isLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-3 flex items-center">
            <Loader2 className="h-6 w-6 text-white animate-spin mr-3" />
            <span className="text-white text-sm">Loading...</span>
          </div>
        </div>
      )}

      {/* Play Button Overlay */}
      {isLoaded && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 z-10">
          <button
            className="bg-white/90 hover:bg-white rounded-full p-5 transition-transform hover:scale-110 shadow-lg"
            aria-label="Play video"
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
          >
            <Play className="h-10 w-10 text-black ml-1" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Custom Controls - Always visible on mobile */}
      {controls && isLoaded && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 z-10 ${
            showControls || isMobile ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between max-w-xs mx-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
              className="bg-white/90 hover:bg-white rounded-full p-3 transition-colors shadow-lg"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-black" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 text-black ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="bg-white/90 hover:bg-white rounded-full p-3 transition-colors shadow-lg"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-black" /> : <Volume2 className="h-5 w-5 text-black" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
