"use client"

import { Mail, MapPin, Instagram } from "lucide-react"

export function ContactSection() {
  return (
    <footer id="contacto" className="py-16 bg-[#4A7DE8] text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans tracking-[0.2em]">
            CONTACTO
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <p className="text-lg leading-relaxed text-white/90 mb-8">
              Nos encantaría saber de ti. Si tienes preguntas sobre nuestros juegos o quieres colaborar con nosotros, no dudes en escribirnos.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Email</p>
                  <a href="mailto:truejoyproject@gmail.com" className="text-base text-white hover:underline">truejoyproject@gmail.com</a>
                </div>
              </div>
              <a href="https://www.instagram.com/truejoyproject" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Instagram className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Instagram</p>
                  <p className="text-base text-white group-hover:underline">@truejoyproject</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Ubicación</p>
                  <p className="text-base text-white">Maldonado, Uruguay</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider text-white/70 mb-2"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-white/70 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-white/70 mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                  placeholder="Escribe tu mensaje..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#F5A623] px-8 py-4 text-base font-bold text-white tracking-wider uppercase transition-all hover:bg-[#e09515] hover:scale-[1.02]"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
