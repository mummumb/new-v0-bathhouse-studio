/**
 * Advanced video performance utilities
 */

export interface ConnectionInfo {
  effectiveType: string
  downlink: number
  saveData: boolean
}

export interface DeviceCapabilities {
  supportsWebM: boolean
  supportsHEVC: boolean
  isMobile: boolean
  hasLimitedBandwidth: boolean
  prefersReducedMotion: boolean
}

/**
 * Get network connection information
 */
export function getConnectionInfo(): ConnectionInfo {
  if (typeof navigator === "undefined") {
    return { effectiveType: "4g", downlink: 10, saveData: false }
  }

  const connection =
    (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

  return {
    effectiveType: connection?.effectiveType || "4g",
    downlink: connection?.downlink || 10,
    saveData: connection?.saveData || false,
  }
}

/**
 * Detect device capabilities
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      supportsWebM: false,
      supportsHEVC: false,
      isMobile: false,
      hasLimitedBandwidth: false,
      prefersReducedMotion: false,
    }
  }

  const video = document.createElement("video")
  const connection = getConnectionInfo()

  return {
    supportsWebM: video.canPlayType('video/webm; codecs="vp9"') !== "",
    supportsHEVC: video.canPlayType('video/mp4; codecs="hvc1"') !== "",
    isMobile:
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    hasLimitedBandwidth:
      connection.saveData || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g",
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  }
}

/**
 * Calculate optimal video preload strategy
 */
export function getPreloadStrategy(capabilities: DeviceCapabilities, isVisible: boolean, hasInteracted: boolean) {
  // On mobile, always preload auto for hero videos
  if (capabilities.isMobile && isVisible) {
    return "auto"
  }

  // Don't preload on very slow connections
  if (capabilities.hasLimitedBandwidth) {
    return "none"
  }

  // Preload metadata when element is visible
  if (isVisible) {
    return "metadata"
  }

  // Preload full video after user interaction on good connections
  if (hasInteracted && !capabilities.isMobile) {
    return "auto"
  }

  return "none"
}

/**
 * Performance monitoring
 */
export class VideoPerformanceMonitor {
  private startTime = 0
  private metrics: Record<string, number> = {}

  startLoading() {
    this.startTime = performance.now()
  }

  recordMetric(name: string, value?: number) {
    this.metrics[name] = value ?? performance.now() - this.startTime
  }

  getMetrics() {
    return { ...this.metrics }
  }

  logPerformance() {
    console.log("Video Performance Metrics:", this.metrics)
  }
}
