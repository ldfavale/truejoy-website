"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Tutoriales", href: "#tutoriales" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white w-full" id="inicio">
      {/* Logo Section - Centered Large Logo */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <Image
          src="/images/logo-truejoy.png"
          alt="True Joy - a la mesa con Jesús"
          width={280}
          height={280}
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
          priority
        />
        
        {/* Search Bar - Right aligned */}
        <div className="mt-4 flex justify-end w-full max-w-5xl px-6">
          <button className="flex items-center gap-3 bg-[#F5A623] text-white px-8 py-3 rounded-full hover:bg-[#e09515] transition-colors shadow-sm">
            <Search className="w-5 h-5" />
            <span className="font-sans text-lg">Buscar</span>
          </button>
        </div>
      </div>

      {/* Orange Line */}
      <div className="w-full h-1 bg-[#F5A623] mt-4" />

      {/* Navigation */}
      <nav className="py-6">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center items-center gap-10 lg:gap-16">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#8B8B8B] hover:text-[#F5A623] transition-colors font-sans text-lg tracking-[0.2em]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#8B8B8B] p-2"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="md:hidden flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#8B8B8B] hover:text-[#F5A623] transition-colors font-sans text-lg tracking-[0.2em]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
