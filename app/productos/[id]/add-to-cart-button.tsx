"use client"

/**
 * AddToCartButton — Client Component
 *
 * ¿Por qué un archivo separado?
 * La página de detalle del producto (page.tsx) es un Server Component para
 * poder hacer el fetch de datos de Supabase de forma segura en el servidor.
 * Pero para usar `useCart` (un hook) necesitamos un Client Component.
 *
 * La solución de Next.js es simple: extraer sólo la parte interactiva
 * (el botón) a un archivo separado con "use client", e importarlo desde
 * el Server Component. Next.js sabe que debe hidratar ese componente
 * en el cliente sin afectar el resto de la página.
 */

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const outOfStock = product.stock === 0

  const handleClick = () => {
    addItem(product)

    // Feedback visual momentáneo: cambia el botón a "¡Añadido!" por 1.5s
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      disabled={outOfStock}
      className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-sm text-lg cursor-pointer disabled:bg-true-light-gray disabled:cursor-not-allowed ${
        added
          ? "bg-green-500 text-white"
          : "bg-true-orange hover:bg-true-orange-hover text-white"
      }`}
      aria-label={
        outOfStock
          ? "Producto agotado"
          : added
          ? "Producto añadido al carrito"
          : "Añadir al carrito"
      }
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          ¡Añadido al carrito!
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          {outOfStock ? "Agotado" : "Añadir al Carrito"}
        </>
      )}
    </button>
  )
}
