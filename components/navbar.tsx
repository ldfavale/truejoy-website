"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, User, ShoppingCart, LogOut, UserCircle } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { CartDrawer } from "@/components/cart-drawer"
import { logout } from "@/app/auth/actions"

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

function getInitials(name: string | null | undefined, email: string | undefined) {
  if (name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
  return email ? email[0].toUpperCase() : "?"
}

/** Botón de usuario en desktop: ícono si no logueado, avatar con dropdown si logueado */
function NavbarUserButton() {
  const { user, isLoading } = useAuth()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-true-gray hover:text-true-orange transition-colors"
        aria-label="Iniciar sesión"
      >
        <User className="w-5 h-5 md:w-6 md:h-6" />
      </Link>
    )
  }

  const fullName = user.user_metadata?.full_name as string | undefined
  const initials = getInitials(fullName, user.email)

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-true-orange text-white text-xs font-bold flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm"
        aria-label="Menú de usuario"
        aria-expanded={open}
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
          {/* User info */}
          <div className="px-4 py-2 border-b border-gray-100 mb-1">
            {fullName && (
              <p className="text-sm font-semibold text-gray-900 truncate">{fullName}</p>
            )}
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <Link
            href="/perfil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <UserCircle className="w-4 h-4 text-true-orange" />
            Mi perfil
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

/** Enlace de usuario en menú mobile */
function MobileUserLink() {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-true-gray hover:text-true-orange transition-colors font-sans text-sm tracking-[0.2em]"
      >
        Iniciar sesión
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        href="/perfil"
        className="text-true-gray hover:text-true-orange transition-colors font-sans text-sm tracking-[0.2em]"
      >
        Mi perfil
      </Link>
      <form action={logout}>
        <button
          type="submit"
          className="text-red-400 hover:text-red-500 transition-colors font-sans text-sm tracking-[0.2em]"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, openCart } = useCart()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return

    router.push(`/productos?search=${encodeURIComponent(trimmed)}`)
    setSearchQuery("")
    setIsOpen(false)
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/") {
      e.preventDefault()
      scrollToSection(href)
    }
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

        <div className="flex items-center gap-3 md:gap-4 justify-end flex-shrink-0 w-auto lg:w-[300px]">
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:flex items-center w-full max-w-[200px]"
          >
            <input
              type="search"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-true-orange text-gray-700 rounded-full py-1.5 px-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-true-orange transition-colors"
              aria-label="Buscar juegos"
            />
            <button
              type="submit"
              className="absolute right-3 text-true-orange"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

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

          <NavbarUserButton />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-true-gray hover:text-true-orange p-1 ml-1"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100">
          <form
            onSubmit={handleSearchSubmit}
            className="md:hidden px-6 py-4 border-b border-gray-100"
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-true-orange text-gray-700 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none"
                aria-label="Buscar juegos"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-true-orange"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
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
              <li className="pt-2 border-t border-gray-100 w-full text-center">
                <MobileUserLink />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>

    <CartDrawer />
    </>
  )
}
