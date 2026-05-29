import Image from "next/image"
import { SectionTitle } from "./section-title"
import { Card } from "./card"

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-12 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Orange Header with Title */}
        <SectionTitle className="mb-8">
          Sobre nosotros
        </SectionTitle>

        {/* Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Text Content - Takes 2 columns */}
          <Card className="md:col-span-2">
            <p className="font-sans text-base md:text-lg leading-relaxed">
              Somos una familia apasionada por compartir la Palabra de Dios a través del
              juego. Creemos que los momentos más significativos nacen cuando nos sentamos
              juntos a la mesa, riendo, aprendiendo y creciendo en fe. Cada uno de nuestros 
              juegos está diseñado con amor para llevar alegría verdadera a tu hogar.
            </p>
          </Card>

          {/* Photo */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-full">
            <Image
              src="/images/about-photo.jpg"
              alt="Familia"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
