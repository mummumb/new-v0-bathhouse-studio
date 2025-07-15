"use client"

import { useState, useRef, useEffect } from "react"
// import Image from "next/image"
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function AufgussVideoSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.3 })

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => {
      setIsBuffering(true)
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
      setIsBuffering(false)
      setLoadError(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setIsBuffering(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handleCanPlayThrough = () => {
      setIsBuffering(false)
    }

    const handleError = (e: Event) => {
      console.warn("Aufguss video failed to load:", e)
      setLoadError(true)
      setIsBuffering(false)
      setIsLoaded(false)
    }

    const handleLoadedData = () => {
      setIsLoaded(true)
      setIsBuffering(false)
    }

    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("canplaythrough", handleCanPlayThrough)
    video.addEventListener("error", handleError)

    // Start loading when in view
    if (isIntersecting) {
      // Set preload based on device
      video.preload = isMobile ? "auto" : "metadata"

      // Ensure video source is set
      if (!video.src) {
        video.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-18%20at%2020.06.04-1Y7scDu8jQxWrBHdc1GR7hTCF3RNEV.mp4"
      }

      // Load the video
      video.load()
    }

    return () => {
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("canplaythrough", handleCanPlayThrough)
      video.removeEventListener("error", handleError)
    }
  }, [isIntersecting, isMobile])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (loadError) {
      // Try to reload the video
      setLoadError(false)
      setIsBuffering(true)
      video.load()
      return
    }

    if (!isLoaded) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((error) => {
        console.warn("Video play failed:", error)
        // Don't set error state for play failures, just log
      })
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section ref={elementRef} className="bathhouse-section bg-bathhouse-cream">
      <div className="bathhouse-container text-center">
        <h2 className="text-3xl sm:text-4xl font-heading mb-6">Experience the Aufguss Ritual</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10 bathhouse-subheading">
          Watch Amanda guide participants through the choreographed movements, aromatherapy, and towel work that define
          the authentic Aufguss experience—a multi-sensory journey of heat, scent, and mindful presence.
        </p>

        <div
          className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl relative bg-black group"
          onMouseEnter={() => !isMobile && setShowControls(true)}
          onMouseLeave={() => !isMobile && setShowControls(false)}
          onTouchStart={() => setShowControls(true)}
        >
          {/* Poster Image - Always visible until video plays */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isPlaying && !loadError ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src="/images/amanda-aufguss-hero.jpeg"
              alt="Amanda Berger demonstrating the traditional Aufguss towel technique in an authentic sauna setting"
              className="object-cover absolute inset-0 w-full h-full"
              loading={isIntersecting ? "eager" : "lazy"}
            />
          </div>

          {/* Video Element */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isPlaying && !loadError ? "opacity-100" : "opacity-0"
            }`}
            loop
            muted={isMuted}
            playsInline
            poster="/images/amanda-aufguss-hero.jpeg"
            aria-label="Amanda Berger demonstrating the Aufguss ritual technique"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-18%20at%2020.06.04-1Y7scDu8jQxWrBHdc1GR7hTCF3RNEV.mp4" type="video/mp4" />
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aufguss-Nq8DVGOrnLT7KLtYs4Gr7XtIeLV7Rr.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading Indicator */}
          {isBuffering && !loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-3 flex items-center">
                <Loader2 className="h-5 w-5 text-white animate-spin mr-3" />
                <span className="text-white text-sm">Loading video...</span>
              </div>
            </div>
          )}

          {/* Error State with Retry */}
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-15">
              <button
                onClick={togglePlay}
                className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 hover:bg-white transition-colors"
              >
                <span className="text-black font-medium">Tap to load video</span>
              </button>
            </div>
          )}

          {/* Play Button Overlay - Show when loaded and not playing */}
          {isLoaded && !isPlaying && !loadError && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={togglePlay}
                className="bg-white/90 hover:bg-white rounded-full p-6 transition-all duration-300 hover:scale-110 shadow-2xl"
                aria-label="Play Aufguss ritual video"
              >
                <Play className="h-12 w-12 text-black ml-1" fill="currentColor" />
              </button>
            </div>
          )}

          {/* Video Controls - Show when loaded and not in error state */}
          {isLoaded && !loadError && (
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 z-10 ${
                showControls || isMobile ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center justify-between max-w-xs mx-auto">
                <button
                  onClick={togglePlay}
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

        <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
          The Aufguss ritual combines precise towel movements with essential oils and curated music to create a
          transformative sauna experience that honors German tradition while welcoming all levels of experience.
        </p>
      </div>
    </section>
  )
}
