"use client"

import { useEffect, useRef } from "react"

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Check if music is enabled (via feature flag or user preference)
    if (process.env.NEXT_PUBLIC_ENABLE_MUSIC === 'false') {
      return;
    }

    // Lazy load audio after page load to not block rendering
    const loadAudio = () => {
      const audio = new Audio("/background_music/Kina Grannis ft. Imaginary Future - I Will Spend My Whole Life Loving You (lyrics).mp3")
      audio.loop = true
      audio.volume = 0.5
      audio.preload = 'none' // Don't preload to save bandwidth
      audioRef.current = audio

      const handleUserInteraction = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.log("Autoplay prevented:", error)
          })
          document.removeEventListener("click", handleUserInteraction)
          document.removeEventListener("touchstart", handleUserInteraction)
        }
      }

      document.addEventListener("click", handleUserInteraction)
      document.addEventListener("touchstart", handleUserInteraction)
    };

    // Delay audio loading until after initial render
    const timer = setTimeout(loadAudio, 1000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      document.removeEventListener("click", () => {})
      document.removeEventListener("touchstart", () => {})
    }
  }, [])

  return null
}

export default BackgroundMusic


