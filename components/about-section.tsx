import Image from "next/image"

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-12 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Orange Header with Title */}
        <div className="bg-[#F5A623] rounded-3xl p-8 md:p-12 flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-sans tracking-[0.3em] flex-1 text-center">
            S O B R E  N O S O T R O S
          </h2>
          <Image
            src="/images/logo-truejoy.png"
            alt="True Joy"
            width={120}
            height={120}
            className="w-20 h-20 md:w-28 md:h-28 object-contain flex-shrink-0"
          />
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

          {/* Photo Placeholder */}
          <div className="bg-[#E8DCC8] rounded-3xl p-8 flex items-center justify-center min-h-[200px]">
            <span className="text-[#D4C8B4] font-sans text-2xl">FOTO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
