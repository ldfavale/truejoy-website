"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#F5A623] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <ScrollReveal
            variant="slideRight"
            mode="mount"
            delay={0.15}
            className="flex-1 text-center md:text-left"
          >
            <blockquote className="mb-4">
              <p className="text-3xl md:text-4xl lg:text-5xl text-white font-tt-milks leading-tight">
                {'"El corazón alegre es'}
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl text-white font-tt-milks leading-tight">
                {'una buena medicina..."'}
              </p>
            </blockquote>
            <p className="text-sm md:text-base tracking-[0.3em] text-white uppercase mt-6">
              PROVERBIOS 17:22
            </p>
          </ScrollReveal>

          <ScrollReveal
            variant="pop"
            mode="mount"
            delay={0.35}
            className="flex-shrink-0"
          >
            <Image
              src="/images/logo-truejoy.png"
              alt="True Joy - a la mesa con Jesús"
              width={300}
              height={300}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
              priority
            />
          </ScrollReveal>
        </div>

        <ScrollReveal variant="blur" mode="mount" delay={0.55} className="text-center mt-12">
          <p className="text-lg md:text-xl tracking-[0.3em] text-[#F5A623] font-bold uppercase bg-white/0">
            <span className="text-white font-sans tracking-[0.2em]">JUEGOS PARA TODOS</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
