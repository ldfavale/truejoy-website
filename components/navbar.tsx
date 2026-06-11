"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, User, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Tutoriales", href: "/#tutoriales" },
  { label: "Sobre nosotros", href: "/#sobre-nosotros" },
  { label: "Contacto", href: "/#contacto" },
]

const NAVBAR_OFFSET = 72

function scrollToSection(href: string) {
  const id = href.replace("/#", "").replace("#", "")
  const element = document.getElementById(id)
  if (!element) return

  const top =
    element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET

  window.scrollTo({ top, behavior: "smooth" })
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, openCart } = useCart()

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/") {
      e.preventDefault()
      scrollToSection(href)
    }
    // Si no estamos en el home, el comportamiento por defecto de Link nos llevará al "/" con el hash correspondiente.
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <>
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
          <Link
            href="/#inicio"
            className="block"
            onClick={(e) => handleNavClick(e, "/#inicio")}
          >
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
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-true-gray hover:text-true-orange transition-colors font-sans text-[13px] xl:text-sm tracking-[0.15em] whitespace-nowrap"
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
              className="w-full bg-white border border-true-orange text-gray-700 rounded-full py-1.5 px-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-true-orange transition-colors"
            />
            <Search className="absolute right-3 text-true-orange w-4 h-4" />
          </div>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative text-true-gray hover:text-true-orange transition-colors cursor-pointer"
            aria-label={`Carrito (${itemCount} productos)`}
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-true-orange text-white text-[10px] font-[1000] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          <button className="text-true-gray hover:text-true-orange transition-colors" aria-label="Login">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-true-gray hover:text-true-orange p-1 ml-1"
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
                className="w-full bg-white border border-true-orange text-gray-700 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-true-orange w-4 h-4" />
            </div>
          </div>
          <nav>
            <ul className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-true-gray hover:text-true-orange transition-colors font-sans text-sm tracking-[0.2em]"
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

    {/* El CartDrawer se renderiza fuera del <header> pero dentro del mismo componente */}
    <CartDrawer />
    </>
  )
}
