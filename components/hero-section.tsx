"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-tr from-true-orange-light via-true-orange to-true-orange-dark py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 overflow-visible">
            <ScrollReveal
              variant="slideRight"
              mode="mount"
              delay={0.15}
              className="flex items-center justify-center text-center"
            >
              <div className="relative inline-block">
                <blockquote className="m-0">
                  <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-tt-milks leading-tight">
                    {'"El corazón alegre es'}
                  </p>
                  <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-tt-milks leading-tight">
                    {'una buena medicina..."'}
                  </p>
                </blockquote>
                <ScrollReveal
                  variant="fadeUp"
                  mode="mount"
                  delay={0.45}
                  className="pointer-events-none absolute left-1/2 top-full mt-2 w-max -translate-x-1/2"
                >
                  <p className="text-sm md:text-base tracking-[0.3em] text-white uppercase whitespace-nowrap">
                    PROVERBIOS 17:22
                  </p>
                </ScrollReveal>
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant="pop"
              mode="mount"
              delay={0.35}
              className="flex shrink-0 items-center justify-center"
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
        </div>
      </div>

      <ScrollReveal
        variant="blur"
        mode="mount"
        delay={0.55}
        className="pointer-events-none absolute bottom-6 left-1/2 w-max -translate-x-1/2 md:bottom-8"
      >
        <p className="text-base font-bold uppercase tracking-[0.2em] text-white font-sans whitespace-nowrap md:text-xl">
          Juegos para todos
        </p>
      </ScrollReveal>
    </section>
  )
}
