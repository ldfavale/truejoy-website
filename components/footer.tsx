import Image from "next/image"
import { CloudBackground } from "./cloud-background"

export function Footer() {
  return (
    <footer className="relative bg-[#D6E8F0] overflow-hidden py-16">
      <CloudBackground />
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
        
        <p className="text-sm md:text-base tracking-[0.3em] text-[#8B8B8B] uppercase mt-8 mb-8">
          PROVERBIOS 17:22
        </p>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo-truejoy.png"
            alt="True Joy"
            width={120}
            height={120}
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
        </div>
        
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
