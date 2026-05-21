import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#F5A623] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Quote - Left Side */}
          <div className="flex-1 text-center md:text-left">
            <blockquote className="mb-4">
              <p className="text-3xl md:text-4xl lg:text-5xl text-white font-sans leading-tight">
                {'"El corazón alegre es'}
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl text-white font-sans leading-tight">
                {'una buena medicina..."'}
              </p>
            </blockquote>
            <p className="text-sm md:text-base tracking-[0.3em] text-white uppercase mt-6">
              PROVERBIOS 17:22
            </p>
          </div>

          {/* Logo - Right Side */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logo-truejoy.png"
              alt="True Joy - a la mesa con Jesús"
              width={300}
              height={300}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
              priority
            />
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-lg md:text-xl tracking-[0.3em] text-[#F5A623] font-bold uppercase bg-white/0">
            <span className="text-white font-sans tracking-[0.2em]">JUEGOS PARA TODOS</span>
          </p>
        </div>
      </div>
    </section>
  )
}
