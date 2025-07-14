"use client"

import { useEffect, useState } from "react"

export function useUserInteraction() {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [interactionType, setInteractionType] = useState<string | null>(null)

  useEffect(() => {
    const handleInteraction = (event: Event) => {
      if (!hasInteracted) {
        setHasInteracted(true)
        setInteractionType(event.type)
      }
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [hasInteracted])

  return { hasInteracted, interactionType }
}
