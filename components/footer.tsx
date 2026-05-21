import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative bg-[#D6E8F0] overflow-hidden py-16">
      {/* White Cloud Decorations using actual cloud image */}
      <Image src="/images/cloud.png" alt="" width={140} height={70} className="absolute top-8 left-8 w-28 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={80} height={40} className="absolute top-4 left-28 w-16 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={160} height={80} className="absolute top-16 right-12 w-32 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute top-8 right-36 w-20 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute bottom-20 left-16 w-24 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute bottom-12 left-1/4 w-20 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={140} height={70} className="absolute bottom-16 right-1/4 w-28 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute bottom-8 right-12 w-24 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute top-1/2 left-8 w-20 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute top-1/2 right-8 w-24 h-auto opacity-90" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Quote */}
        <blockquote className="mb-4">
          <p className="text-3xl md:text-4xl lg:text-5xl text-[#8B8B8B] font-sans leading-tight">
            {'"El corazón alegre es'}
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl text-[#8B8B8B] font-sans leading-tight">
            {'una buena medicina..."'}
          </p>
        </blockquote>
        
        <p className="text-sm md:text-base tracking-[0.3em] text-[#8B8B8B] uppercase mt-8 mb-12">
          PROVERBIOS 17:22
        </p>

        {/* Bottom Text */}
        <p className="text-lg md:text-xl tracking-[0.2em] text-[#F5A623] font-bold uppercase">
          JUEGOS PARA TODOS
        </p>

        {/* Copyright */}
        <p className="text-xs text-[#AFAFAF] mt-12">
          &copy; {new Date().getFullYear()} True Joy. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
