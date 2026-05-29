import Image from "next/image"

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-12 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Orange Header with Title */}
        <div className="bg-[#F5A623] rounded-3xl p-8 md:p-12 text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-tt-milks">
            Sobre nosotros
          </h2>
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Text Content - Takes 2 columns */}
          <div className="md:col-span-2 bg-[#E5E5E5] rounded-3xl p-8 md:p-12 flex items-center">
            <p className="text-[#8B8B8B] font-sans text-base md:text-lg leading-relaxed">
              Somos una familia apasionada por compartir la Palabra de Dios a través del
              juego. Creemos que los momentos más significativos nacen cuando nos sentamos
              juntos a la mesa, riendo, aprendiendo y creciendo en fe. Cada uno de nuestros 
              juegos está diseñado con amor para llevar alegría verdadera a tu hogar.
            </p>
          </div>

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
