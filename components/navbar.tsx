"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, User } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Tutoriales", href: "#tutoriales" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`} 
      id="inicio"
    >
      <div className={`w-full max-w-[1400px] mx-auto px-6 transition-all duration-300 flex items-center justify-between gap-4 ${
        isScrolled ? "py-2" : "py-3"
      }`}>
        {/* Left: Logo */}
        <div className="flex-shrink-0 w-[120px] sm:w-[150px]">
          <Link href="#inicio" className="block">
            <div className={`relative transition-all duration-300 ${isScrolled ? "w-28 h-10" : "w-36 h-12"}`}>
              <Image
                src="/images/logo-truejoy.png"
                alt="True Joy Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex justify-center items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#8B8B8B] hover:text-[#F5A623] transition-colors font-sans text-[13px] xl:text-sm tracking-[0.15em] whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Search, Login & Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-4 justify-end flex-shrink-0 w-auto lg:w-[300px]">
          {/* Search Input */}
          <div className="relative hidden md:flex items-center w-full max-w-[200px]">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-white border border-[#F5A623] text-gray-700 rounded-full py-1.5 px-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-colors"
            />
            <Search className="absolute right-3 text-[#F5A623] w-4 h-4" />
          </div>

          <button className="text-[#8B8B8B] hover:text-[#F5A623] transition-colors" aria-label="Login">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#8B8B8B] hover:text-[#F5A623] p-1 ml-1"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100">
          {/* Mobile Search */}
          <div className="md:hidden px-6 py-4 border-b border-gray-100">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="w-full bg-white border border-[#F5A623] text-gray-700 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5A623] w-4 h-4" />
            </div>
          </div>
          <nav>
            <ul className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[#8B8B8B] hover:text-[#F5A623] transition-colors font-sans text-sm tracking-[0.2em]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
