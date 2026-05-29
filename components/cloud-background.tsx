"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

type CloudConfig = {
  top: string
  left: string
  size: number
  /** Parallax depth: higher = moves faster on scroll */
  speed: number
  opacity: number
  floatDuration: number
  floatDelay: number
}

/**
 * Organized staggered grid — 5 rows, alternating offsets for a natural but tidy rhythm.
 */
const CLOUDS: CloudConfig[] = [
  // Row 1
  { top: "2%", left: "3%", size: 85, speed: 0.25, opacity: 0.75, floatDuration: 7, floatDelay: 0 },
  { top: "5%", left: "20%", size: 110, speed: 0.45, opacity: 0.88, floatDuration: 6, floatDelay: 0.8 },
  { top: "3%", left: "42%", size: 130, speed: 0.6, opacity: 0.92, floatDuration: 8, floatDelay: 1.2 },
  { top: "6%", left: "65%", size: 105, speed: 0.4, opacity: 0.85, floatDuration: 5.5, floatDelay: 0.4 },
  { top: "4%", left: "86%", size: 80, speed: 0.3, opacity: 0.78, floatDuration: 6.5, floatDelay: 1.6 },

  // Row 2 — offset
  { top: "20%", left: "10%", size: 120, speed: 0.55, opacity: 0.9, floatDuration: 7.5, floatDelay: 0.3 },
  { top: "22%", left: "35%", size: 95, speed: 0.35, opacity: 0.82, floatDuration: 5, floatDelay: 1.1 },
  { top: "19%", left: "58%", size: 140, speed: 0.7, opacity: 0.95, floatDuration: 9, floatDelay: 0.6 },
  { top: "23%", left: "82%", size: 100, speed: 0.42, opacity: 0.86, floatDuration: 6, floatDelay: 1.9 },

  // Row 3
  { top: "38%", left: "2%", size: 115, speed: 0.5, opacity: 0.88, floatDuration: 6.8, floatDelay: 0.5 },
  { top: "40%", left: "24%", size: 90, speed: 0.28, opacity: 0.76, floatDuration: 7.2, floatDelay: 1.4 },
  { top: "37%", left: "46%", size: 150, speed: 0.75, opacity: 0.96, floatDuration: 8.5, floatDelay: 0.2 },
  { top: "41%", left: "68%", size: 105, speed: 0.48, opacity: 0.87, floatDuration: 5.8, floatDelay: 1.7 },
  { top: "39%", left: "88%", size: 75, speed: 0.32, opacity: 0.8, floatDuration: 6.2, floatDelay: 0.9 },

  // Row 4 — offset
  { top: "56%", left: "8%", size: 100, speed: 0.38, opacity: 0.84, floatDuration: 7, floatDelay: 1.3 },
  { top: "58%", left: "32%", size: 125, speed: 0.62, opacity: 0.91, floatDuration: 6.4, floatDelay: 0.7 },
  { top: "55%", left: "55%", size: 95, speed: 0.33, opacity: 0.79, floatDuration: 8.2, floatDelay: 1.5 },
  { top: "59%", left: "78%", size: 110, speed: 0.52, opacity: 0.89, floatDuration: 5.6, floatDelay: 0.1 },

  // Row 5
  { top: "74%", left: "5%", size: 130, speed: 0.58, opacity: 0.9, floatDuration: 7.8, floatDelay: 0.4 },
  { top: "76%", left: "22%", size: 85, speed: 0.27, opacity: 0.77, floatDuration: 6.6, floatDelay: 1.8 },
  { top: "73%", left: "44%", size: 115, speed: 0.46, opacity: 0.86, floatDuration: 5.4, floatDelay: 1 },
  { top: "77%", left: "66%", size: 140, speed: 0.68, opacity: 0.93, floatDuration: 8.8, floatDelay: 0.3 },
  { top: "75%", left: "87%", size: 90, speed: 0.36, opacity: 0.81, floatDuration: 6.9, floatDelay: 1.6 },

  // Row 6 — accent layer near bottom
  { top: "90%", left: "15%", size: 100, speed: 0.44, opacity: 0.83, floatDuration: 7.4, floatDelay: 0.8 },
  { top: "92%", left: "50%", size: 120, speed: 0.56, opacity: 0.88, floatDuration: 6.1, floatDelay: 1.2 },
  { top: "91%", left: "75%", size: 95, speed: 0.4, opacity: 0.85, floatDuration: 7.6, floatDelay: 0.5 },
]

function ParallaxCloud({
  cloud,
  scrollYProgress,
  reducedMotion,
}: {
  cloud: CloudConfig
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  reducedMotion: boolean
}) {
  const drift = cloud.speed * 120
  const sway = cloud.speed * 50

  const y = useTransform(scrollYProgress, [0, 1], [-drift, drift])
  const x = useTransform(scrollYProgress, [0, 1], [sway * 0.6, -sway * 0.6])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: cloud.top,
        left: cloud.left,
        y: reducedMotion ? 0 : y,
        x: reducedMotion ? 0 : x,
      }}
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -10, -4, -12, 0],
                x: [0, 6, -3, 4, 0],
                rotate: [0, 0.8, -0.5, 0.6, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: cloud.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: cloud.floatDelay,
              }
        }
      >
        <Image
          src="/images/cloud.png"
          alt=""
          width={cloud.size * 2}
          height={cloud.size}
          className="h-auto"
          style={{ width: cloud.size, opacity: cloud.opacity }}
        />
      </motion.div>
    </motion.div>
  )
}

/**
 * Animated cloud background with parallax scroll and gentle floating motion.
 * Parent element must have `position: relative` and `overflow: hidden`.
 */
export function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {CLOUDS.map((cloud, index) => (
        <ParallaxCloud
          key={index}
          cloud={cloud}
          scrollYProgress={scrollYProgress}
          reducedMotion={!!reducedMotion}
        />
      ))}
    </div>
  )
}
