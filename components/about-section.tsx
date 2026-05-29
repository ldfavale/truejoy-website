"use client"

import Image from "next/image"
import { SectionTitle } from "./section-title"
import { Card } from "./card"
import { ScrollReveal } from "./scroll-reveal"

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-12 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle className="mb-8" animation="rotateIn">
          Sobre nosotros
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal variant="slideRight" delay={0.1} className="md:col-span-2">
            <Card className="h-full">
              <p className="font-sans text-base md:text-lg leading-relaxed">
                Somos una familia apasionada por compartir la Palabra de Dios a través del
                juego. Creemos que los momentos más significativos nacen cuando nos sentamos
                juntos a la mesa, riendo, aprendiendo y creciendo en fe. Cada uno de nuestros
                juegos está diseñado con amor para llevar alegría verdadera a tu hogar.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.25} className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-full">
            <Image
              src="/images/about-photo.jpg"
              alt="Familia"
              fill
              className="object-cover"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
