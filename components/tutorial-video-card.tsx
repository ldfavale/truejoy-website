"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"

type TutorialVideoCardProps = {
  poster: string
  video: string
  alt: string
}

export function TutorialVideoCard({ poster, video, alt }: TutorialVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isHoveringRef = useRef(false)
  const isLoadedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const tryPlay = useCallback(() => {
    const el = videoRef.current
    if (!el || !isHoveringRef.current) return

    const startPlayback = () => {
      el.play()
        .then(() => {
          if (isHoveringRef.current) setIsPlaying(true)
        })
        .catch(() => setIsPlaying(false))
    }

    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startPlayback()
    } else {
      el.addEventListener("canplay", startPlayback, { once: true })
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true
    const el = videoRef.current
    if (!el) return

    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      el.src = video
      el.load()
    }

    tryPlay()
  }, [video, tryPlay])

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false
    const el = videoRef.current
    if (!el) return

    el.pause()
    el.currentTime = 0
    setIsPlaying(false)
  }, [])

  return (
    <div
      className="relative w-full aspect-square bg-true-beige rounded-xl overflow-hidden border-2 border-true-beige-border cursor-pointer transition-transform duration-300 ease-out hover:scale-110 hover:z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        className={`object-cover transition-opacity duration-300 z-10 ${isPlaying ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={!isPlaying}
        className={`absolute inset-0 z-20 size-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  )
}
