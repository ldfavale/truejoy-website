"use client"

/**
 * Fase 2 — Context API del Carrito de Compras
 *
 * Conceptos clave:
 * - Context API: estado global accesible desde cualquier componente sin prop-drilling
 * - localStorage: persistencia entre recargas del navegador
 * - Problema de hidratación: Next.js renderiza el HTML en el servidor (donde
 *   localStorage no existe) y luego React "hidrata" ese HTML en el cliente.
 *   Si el estado inicial del servidor no coincide con el del cliente (porque el
 *   cliente cargó items del localStorage), React lanza un error de hidratación.
 *   Solución: inicializamos el carrito como array vacío y sólo cargamos el
 *   localStorage en un useEffect (que solo se ejecuta en el cliente).
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react"
import { Product } from "@/lib/types"

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextValue {
  // Estado
  items: CartItem[]
  isOpen: boolean

  // Acciones del carrito
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void

  // Control del drawer
  openCart: () => void
  closeCart: () => void

  // Valores derivados
  itemCount: number
  total: number
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null)

const CART_STORAGE_KEY = "truejoy-cart"

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicializamos con array vacío para evitar mismatch de hidratación.
  // El localStorage se carga en el useEffect de abajo (solo en el cliente).
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // ── Cargar desde localStorage al montar (solo cliente) ──────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        setItems(parsed)
      }
    } catch {
      // Si el JSON está corrupto, arrancamos con carrito vacío
      localStorage.removeItem(CART_STORAGE_KEY)
    }
    setHydrated(true)
  }, [])

  // ── Sincronizar al localStorage cada vez que cambian los items ───────────────
  useEffect(() => {
    // Solo guardamos después de la hidratación para no sobrescribir con []
    if (!hydrated) return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  // ─── Acciones ────────────────────────────────────────────────────────────────

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        // Ya existe → incrementamos la cantidad (sin superar el stock)
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock),
              }
            : item
        )
      }
      // No existe → lo agregamos con cantidad 1
      return [...prev, { product, quantity: 1 }]
    })
    // Abrir el drawer automáticamente al agregar
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        // Si la cantidad llega a 0, eliminamos el item
        setItems((prev) => prev.filter((item) => item.product.id !== productId))
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.min(quantity, item.product.stock) }
            : item
        )
      )
    },
    []
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  // ─── Valores derivados (memoizados para evitar re-renders innecesarios) ───────

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  )

  // ─── Value del context ────────────────────────────────────────────────────────

  const value: CartContextValue = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    itemCount,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ─── Hook de acceso ───────────────────────────────────────────────────────────

/**
 * Hook para consumir el carrito desde cualquier Client Component.
 * Lanza un error si se usa fuera del CartProvider (útil para detectar
 * problemas en desarrollo).
 */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>")
  }
  return ctx
}
