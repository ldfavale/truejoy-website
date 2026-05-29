"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal } from "./scroll-reveal"

export function GozateSection() {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale: reducedMotion ? 1 : imageScale }}
      >
        <Image
          src="/images/gozate.png"
          alt="Familia jugando juegos de mesa"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: reducedMotion ? 0 : textY }}
      >
        <div className="text-center">
          <ScrollReveal variant="fadeDown" duration={0.9}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-tt-milks text-white drop-shadow-lg leading-none">
              Gózate en la
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="bounce" delay={0.2} duration={0.9}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-tt-milks text-white drop-shadow-lg leading-none mt-2">
              Palabra de Dios
            </h2>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  )
}
