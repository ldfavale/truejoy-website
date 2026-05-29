import Image from "next/image"

export function GozateSection() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px]">
      <Image
        src="/images/gozate.png"
        alt="Familia jugando juegos de mesa"
        fill
        className="object-cover"
      />
      {/* Overlay text is already in the image, but we can add fallback text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-tt-milks text-white drop-shadow-lg leading-none">
            Gózate en la
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-tt-milks text-white drop-shadow-lg leading-none mt-2">
            Palabra de Dios
          </h2>
        </div>
      </div>
    </section>
  )
}
