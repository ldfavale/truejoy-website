"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Eye, Play, X, SlidersHorizontal, ArrowUpDown, HelpCircle, ShoppingCart } from "lucide-react"
import { Product } from "@/lib/types"
import { useCart } from "@/context/cart-context"

interface CatalogPageClientProps {
  products: Product[]
}

type SortOption = "name-asc" | "price-asc" | "price-desc" | "newest"

export function CatalogPageClient({ products }: CatalogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedAge, setSelectedAge] = useState("Todos")
  const [sortBy, setSortBy] = useState<SortOption>("name-asc")
  const { addItem } = useCart()
  
  // Modal states for preview
  const [modalProduct, setModalProduct] = useState<Product | null>(null)
  const [modalType, setModalType] = useState<"image" | "video" | null>(null)

  // Obtener categorías únicas dinámicamente
  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category).filter(Boolean) as string[]
    return ["Todos", ...Array.from(new Set(allCategories))]
  }, [products])

  // Rangos de edad predefinidos para simplificar
  const ageFilters = [
    { label: "Todas las edades", value: "Todos" },
    { label: "2 - 5 años", value: "2 - 5" },
    { label: "6 - 12 años", value: "6 - 12" },
    { label: "12 - 120 años", value: "12 - 120" }
  ]

  // Lógica de filtrado y ordenación
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filtro por texto
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query))
        
        // Filtro por categoría
        const matchesCategory =
          selectedCategory === "Todos" || product.category === selectedCategory

        // Filtro por edad
        const matchesAge =
          selectedAge === "Todos" || product.age_range === selectedAge

        return matchesSearch && matchesCategory && matchesAge
      })
      .sort((a, b) => {
        // Ordenación
        if (sortBy === "name-asc") {
          return a.name.localeCompare(b.name)
        }
        if (sortBy === "price-asc") {
          return a.price - b.price
        }
        if (sortBy === "price-desc") {
          return b.price - a.price
        }
        if (sortBy === "newest") {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
        return 0
      })
  }, [products, searchQuery, selectedCategory, selectedAge, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0
    }).format(price)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Todos")
    setSelectedAge("Todos")
    setSortBy("name-asc")
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Search and Filters Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-true-beige-border/50 shadow-sm mb-12 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Buscar juegos por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-true-beige-light border-0 border-true-beige focus:border-1 focus:border-true-orange text-true-navy rounded-full py-3 px-6 pr-12 focus:outline-none transition-colors"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-true-orange w-5 h-5" />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-true-gray text-sm flex-shrink-0 flex items-center gap-1.5 font-semibold">
              <ArrowUpDown className="w-4 h-4 text-true-orange" />
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-true-beige-light border border-true-beige text-true-navy py-2.5 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-true-orange w-full md:w-48 text-sm font-semibold cursor-pointer"
            >
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="newest">Más nuevos</option>
            </select>
          </div>
        </div>

        {/* Filter Categories and Age Buttons */}
        <div className="flex flex-col gap-4 border-t border-true-neutral/50 pt-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-true-navy font-bold text-sm mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4 text-true-orange" />
              Categoría:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-true-blue text-white shadow-sm"
                    : "bg-true-beige-light text-true-navy hover:bg-true-beige/35"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Age range Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-true-navy font-bold text-sm mr-2 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-true-orange-medium" />
              Rango de edad:
            </span>
            {ageFilters.map((age) => (
              <button
                key={age.value}
                onClick={() => setSelectedAge(age.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedAge === age.value
                    ? "bg-true-orange text-white shadow-sm"
                    : "bg-true-beige-light text-true-navy hover:bg-true-beige/35"
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-true-beige-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full bg-true-beige-light border-b border-true-neutral/50 overflow-hidden">
                <Image
                  src={product.image_url || "/images/placeholder.jpg"}
                  alt={product.name}
                  fill
                  sizes="(max-w-7xl) 25vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay details buttons */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setModalProduct(product)
                      setModalType("image")
                    }}
                    className="p-3 bg-white hover:bg-true-orange hover:text-white rounded-full text-true-navy shadow transition-colors cursor-pointer"
                    aria-label="Ver imagen ampliada"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {product.video_url && (
                    <button
                      onClick={() => {
                        setModalProduct(product)
                        setModalType("video")
                      }}
                      className="p-3 bg-white hover:bg-true-orange hover:text-white rounded-full text-true-navy shadow transition-colors cursor-pointer"
                      aria-label="Ver video tutorial"
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  )}
                </div>

                {/* Age category badge floating */}
                {product.age_range && (
                  <span className="absolute top-3 left-3 bg-true-orange text-white text-[10px] font-[1000] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                    {product.age_range} años
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <span className="text-[10px] text-true-gray tracking-wider uppercase font-[1000]">
                    {product.category || "Juego de Mesa"}
                  </span>
                  <h3 className="text-lg font-manjari font-bold text-true-navy mt-1 group-hover:text-true-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-true-gray text-xs font-sans mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-sans font-[1000] text-true-orange-medium">
                      {formatPrice(product.price)}
                    </span>
                    {product.stock > 0 ? (
                      <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200 font-bold">
                        Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-bold">
                        Agotado
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/productos/${product.id}`}
                      className="flex-1 text-center bg-true-beige-light hover:bg-true-beige/35 text-true-navy text-xs font-bold py-2.5 rounded-xl border border-true-beige-border transition-colors"
                    >
                      Detalles
                    </Link>
                    <button
                      disabled={product.stock === 0}
                      onClick={() => addItem(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-true-orange hover:bg-true-orange-hover disabled:bg-true-light-gray disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                      aria-label={`Añadir ${product.name} al carrito`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-true-beige-border/50 max-w-md mx-auto">
          <p className="text-true-navy font-manjari font-bold text-2xl mb-2">
            No se encontraron juegos
          </p>
          <p className="text-true-gray text-sm mb-6">
            Intenta cambiar los filtros de categoría, edad o escribe otro término de búsqueda.
          </p>
          <button
            onClick={resetFilters}
            className="bg-true-orange hover:bg-true-orange-hover text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Preview Modals */}
      {modalProduct && modalType && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setModalProduct(null)
            setModalType(null)
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setModalProduct(null)
                setModalType(null)
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-true-orange rounded-full flex items-center justify-center text-white hover:bg-true-orange-hover transition-colors"
              aria-label="Cerrar vista previa"
            >
              <X className="w-6 h-6" />
            </button>

            {modalType === "image" ? (
              <div className="p-6">
                <div className="relative aspect-video w-full mb-4 bg-true-beige-light rounded-xl overflow-hidden">
                  <Image
                    src={modalProduct.image_url || "/images/placeholder.jpg"}
                    alt={modalProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-true-navy">
                    {modalProduct.name}
                  </h3>
                  <span className="text-xl font-bold text-true-orange-medium">
                    {formatPrice(modalProduct.price)}
                  </span>
                </div>
                <p className="text-true-gray text-sm mb-4 leading-relaxed">{modalProduct.description}</p>
                <div className="flex gap-2">
                  {modalProduct.video_url && (
                    <button
                      onClick={() => setModalType("video")}
                      className="flex items-center gap-2 bg-true-orange text-white px-5 py-2.5 rounded-full hover:bg-true-orange-hover transition-colors text-xs font-bold"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Ver video
                    </button>
                  )}
                  <Link
                    href={`/productos/${modalProduct.id}`}
                    className="flex items-center gap-2 bg-true-blue text-white px-5 py-2.5 rounded-full hover:bg-true-blue/95 transition-colors text-xs font-bold"
                    onClick={() => {
                      setModalProduct(null)
                      setModalType(null)
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    Ficha completa
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="aspect-video w-full mb-4 rounded-xl overflow-hidden">
                  <iframe
                    src={modalProduct.video_url || ""}
                    title={`Video tutorial de ${modalProduct.name}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-true-navy">
                    {modalProduct.name}
                  </h3>
                  <span className="text-xl font-bold text-true-orange-medium">
                    {formatPrice(modalProduct.price)}
                  </span>
                </div>
                <p className="text-true-gray text-sm mb-4 leading-relaxed">{modalProduct.description}</p>
                <Link
                  href={`/productos/${modalProduct.id}`}
                  className="inline-flex items-center gap-2 bg-true-blue text-white px-5 py-2.5 rounded-full hover:bg-true-blue/95 transition-colors text-xs font-bold"
                  onClick={() => {
                    setModalProduct(null)
                    setModalType(null)
                  }}
                >
                  <Eye className="w-4 h-4" />
                  Ficha completa
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
