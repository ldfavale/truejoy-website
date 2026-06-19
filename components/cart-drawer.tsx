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

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "59891369739"
    let itemsText = ""
    items.forEach(({ product, quantity }) => {
      itemsText += `- ${quantity}x *${product.name}* (${formatPrice(product.price * quantity)})\n`
    })

    const message = `¡Hola! Me interesa solicitar los siguientes artículos de mi carrito de compras:\n\n${itemsText}\n*Total:* ${formatPrice(total)}\n\n¿Me podrían indicar cómo proceder con el pedido?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

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

            {/* Botón de WhatsApp para consultar/pedir */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-base cursor-pointer"
              aria-label="Pedir por WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar / Pedir por WhatsApp
            </button>

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
