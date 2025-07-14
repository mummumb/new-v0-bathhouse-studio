"use client"

import { useEffect, useState, useCallback } from "react"

interface VideoPreloaderState {
  isLoaded: boolean
  isLoading: boolean
  error: string | null
  progress: number
}

interface UseVideoPreloaderProps {
  src: string
  preloadTrigger?: boolean
  priority?: boolean
}

export function useVideoPreloader({ src, preloadTrigger = false, priority = false }: UseVideoPreloaderProps) {
  const [state, setState] = useState<VideoPreloaderState>({
    isLoaded: false,
    isLoading: false,
    error: null,
    progress: 0,
  })

  const preloadVideo = useCallback(() => {
    if (state.isLoaded || state.isLoading) return

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    const video = document.createElement("video")
    video.preload = "metadata"
    video.muted = true

    const handleLoadedData = () => {
      setState((prev) => ({ ...prev, isLoaded: true, isLoading: false, progress: 100 }))
    }

    const handleError = () => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to load video",
        progress: 0,
      }))
    }

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const progress = (video.buffered.end(0) / video.duration) * 100
        setState((prev) => ({ ...prev, progress }))
      }
    }

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)
    video.addEventListener("progress", handleProgress)

    video.src = src

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("error", handleError)
      video.removeEventListener("progress", handleProgress)
    }
  }, [src, state.isLoaded, state.isLoading])

  useEffect(() => {
    if (priority) {
      // Preload immediately for high priority videos
      preloadVideo()
    } else if (preloadTrigger) {
      // Preload when trigger condition is met
      const timer = setTimeout(preloadVideo, 100)
      return () => clearTimeout(timer)
    }
  }, [preloadTrigger, priority, preloadVideo])

  return { ...state, preloadVideo }
}
