"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export function ContactSection() {
  return (
    <section id="contacto" className="py-16 bg-[#4A7DE8] text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-sans tracking-[0.2em]">
            CONTACTO
          </h2>
          <Image
            src="/images/logo-truejoy.png"
            alt="True Joy"
            width={100}
            height={100}
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
          />
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
                  <p className="text-base text-white">hola@truejoy.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Teléfono</p>
                  <p className="text-base text-white">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Ubicación</p>
                  <p className="text-base text-white">Ciudad de Guatemala, Guatemala</p>
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
    </section>
  )
}
