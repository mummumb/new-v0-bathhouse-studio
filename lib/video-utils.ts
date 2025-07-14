/**
 * Utility functions for video optimization and performance
 */

export interface VideoSource {
  src: string
  type: string
  quality?: "low" | "medium" | "high"
}

export interface VideoConfig {
  sources: VideoSource[]
  poster: string
  preload: "none" | "metadata" | "auto"
  autoplay: boolean
  muted: boolean
  loop: boolean
}

/**
 * Get optimized video sources based on device capabilities
 */
export function getOptimizedVideoSources(basePath: string): VideoSource[] {
  const sources: VideoSource[] = []

  // Check if device supports WebM (better compression)
  if (typeof window !== "undefined") {
    const video = document.createElement("video")

    if (video.canPlayType('video/webm; codecs="vp9"')) {
      sources.push({
        src: `${basePath}.webm`,
        type: 'video/webm; codecs="vp9"',
        quality: "high",
      })
    }

    if (video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      sources.push({
        src: `${basePath}.mp4`,
        type: 'video/mp4; codecs="avc1.42E01E"',
        quality: "high",
      })
    }
  }

  // Fallback MP4
  sources.push({
    src: `${basePath}.mp4`,
    type: "video/mp4",
    quality: "medium",
  })

  return sources
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Check if device has limited bandwidth
 */
export function hasLimitedBandwidth(): boolean {
  if (typeof navigator === "undefined") return false

  // Check for save-data header
  if ("connection" in navigator) {
    const connection = (navigator as any).connection
    return connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g"
  }

  return false
}

/**
 * Get video configuration based on device capabilities
 */
export function getVideoConfig(basePath: string, poster: string): VideoConfig {
  const shouldAutoplay = !prefersReducedMotion() && !hasLimitedBandwidth()

  return {
    sources: getOptimizedVideoSources(basePath),
    poster,
    preload: hasLimitedBandwidth() ? "none" : "metadata",
    autoplay: shouldAutoplay,
    muted: true,
    loop: true,
  }
}
