"use client"

/**
 * Fase 2 — Drawer del Carrito de Compras
 *
 * Panel lateral que se desliza desde la derecha con:
 * - Animación de entrada/salida con Tailwind transitions (translate-x)
 * - Overlay oscuro que cierra el drawer al hacer click
 * - Lista de items con imagen, nombre, precio y controles de cantidad
 * - Subtotal y CTA de pago (deshabilitado hasta la Fase 4)
 */

import { useEffect } from "react"
import Image from "next/image"
import { X, Trash2, ShoppingCart, Plus, Minus, Lock } from "lucide-react"
import { useCart } from "@/context/cart-context"

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(price)
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } =
    useCart()

  // Bloquear el scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeCart])

  return (
    <>
      {/* ── Overlay oscuro ───────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ── Panel del carrito ─────────────────────────────────────────────────── */}
      {/*
        La animación de entrada/salida:
        - translate-x-full → el panel está completamente fuera de la pantalla (a la derecha)
        - translate-x-0    → el panel está visible
        - transition-transform duration-300 ease-in-out → la transición entre ambos estados
      */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrito de compras"
        role="dialog"
        aria-modal="true"
      >
        {/* ── Cabecera ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-true-neutral">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-true-orange" />
            <h2 className="text-lg font-manjari font-bold text-true-navy">
              Mi carrito
            </h2>
            {itemCount > 0 && (
              <span className="bg-true-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-true-cream transition-colors text-true-gray hover:text-true-navy cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Lista de productos o estado vacío ────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            /* Estado vacío */
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="w-20 h-20 rounded-full bg-true-cream flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-true-beige-border" />
              </div>
              <div>
                <p className="font-manjari font-bold text-xl text-true-navy mb-1">
                  Tu carrito está vacío
                </p>
                <p className="text-true-gray text-sm">
                  Explorá nuestros juegos y añadí alguno 🎲
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 bg-true-orange hover:bg-true-orange-hover text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors cursor-pointer"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            /* Lista de items */
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-4 p-4 bg-true-cream rounded-2xl border border-true-beige-border/40"
                >
                  {/* Imagen */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-true-neutral">
                    <Image
                      src={product.image_url || "/images/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info y controles */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-manjari font-bold text-true-navy text-sm leading-tight line-clamp-2">
                          {product.name}
                        </p>
                        {product.category && (
                          <p className="text-[10px] text-true-gray uppercase tracking-wider font-bold mt-0.5">
                            {product.category}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-true-gray transition-colors flex-shrink-0 cursor-pointer"
                        aria-label={`Eliminar ${product.name} del carrito`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Precio */}
                      <span className="font-sans font-[1000] text-true-orange-medium text-base">
                        {formatPrice(product.price * quantity)}
                      </span>

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2 bg-white rounded-xl border border-true-neutral px-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 rounded-lg hover:bg-true-cream text-true-navy transition-colors cursor-pointer disabled:opacity-40"
                          aria-label="Disminuir cantidad"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-true-navy">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 rounded-lg hover:bg-true-cream text-true-navy transition-colors cursor-pointer disabled:opacity-40"
                          aria-label="Aumentar cantidad"
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Pie con total y CTA ──────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-true-neutral px-6 py-5 flex flex-col gap-4 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-true-gray font-semibold text-sm">
                Subtotal ({itemCount} {itemCount === 1 ? "producto" : "productos"})
              </span>
              <span className="font-sans font-[1000] text-true-navy text-xl">
                {formatPrice(total)}
              </span>
            </div>

            {/* Separador */}
            <div className="border-t border-true-neutral" />

            {/* CTA principal — deshabilitado hasta Fase 4 */}
            <div className="relative group">
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 bg-true-lighter-gray text-white font-bold py-3.5 rounded-2xl text-base cursor-not-allowed"
                aria-label="Proceder al pago (disponible próximamente)"
              >
                <Lock className="w-4 h-4" />
                Proceder al pago
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-true-navy text-white text-xs text-center rounded-xl px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                Los pagos se activarán en la Fase 4 🚀
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-true-navy" />
              </div>
            </div>

            {/* Botón secundario */}
            <button
              onClick={closeCart}
              className="w-full text-center text-true-orange hover:text-true-orange-hover font-bold text-sm transition-colors cursor-pointer"
            >
              Seguir comprando →
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
