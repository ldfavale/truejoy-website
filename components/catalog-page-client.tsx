"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Eye, Play, X, SlidersHorizontal, ArrowUpDown, HelpCircle, ShoppingCart } from "lucide-react"
import { Product } from "@/lib/types"
import { ProductSortOption } from "@/lib/products-query"
import { useCart } from "@/context/cart-context"
import { CatalogProductSkeleton } from "@/components/catalog-product-skeleton"
import { CatalogPagination } from "@/components/catalog-pagination"

const PAGE_SIZE = 12
const SEARCH_DEBOUNCE_MS = 350

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function CatalogPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const ageParam = searchParams.get("age")
  const searchParam = searchParams.get("search")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedAge, setSelectedAge] = useState("Todos")
  const [sortBy, setSortBy] = useState<ProductSortOption>("name-asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(["Todos"])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()

  const debouncedSearch = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE_MS)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory("Todos")
    }
  }, [categoryParam])

  useEffect(() => {
    if (ageParam) {
      setSelectedAge(ageParam)
    } else {
      setSelectedAge("Todos")
    }
  }, [ageParam])

  useEffect(() => {
    setSearchQuery(searchParam ?? "")
  }, [searchParam])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedCategory, selectedAge, sortBy])

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)

    const params = new URLSearchParams({
      page: String(currentPage),
      limit: String(PAGE_SIZE),
      sort: sortBy,
    })

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim())
    }
    if (selectedCategory !== "Todos") {
      params.set("category", selectedCategory)
    }
    if (selectedAge !== "Todos") {
      params.set("age", selectedAge)
    }

    try {
      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) throw new Error("Error al cargar productos")

      const data = await response.json()
      setProducts(data.products)
      setTotalCount(data.total)
      setTotalPages(data.totalPages)
      if (data.categories?.length) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setProducts([])
      setTotalCount(0)
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, debouncedSearch, selectedCategory, selectedAge, sortBy])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const [modalProduct, setModalProduct] = useState<Product | null>(null)
  const [modalType, setModalType] = useState<"image" | "video" | null>(null)

  const ageFilters = [
    { label: "Todas las edades", value: "Todos" },
    { label: "2 - 5 años", value: "2 - 5" },
    { label: "6 - 12 años", value: "6 - 12" },
    { label: "12 - 120 años", value: "12 - 120" },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Todos")
    setSelectedAge("Todos")
    setSortBy("name-asc")
    setCurrentPage(1)
  }

  const showEmptyState = !isLoading && products.length === 0

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-true-beige-border/50 shadow-sm mb-12 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-true-gray text-sm flex-shrink-0 flex items-center gap-1.5 font-semibold">
              <ArrowUpDown className="w-4 h-4 text-true-orange" />
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as ProductSortOption)}
              className="bg-true-beige-light border border-true-beige text-true-navy py-2.5 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-true-orange w-full md:w-48 text-sm font-semibold cursor-pointer"
            >
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="newest">Más nuevos</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-true-neutral/50 pt-6">
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

      <div ref={gridRef}>
        {!isLoading && totalCount > 0 && (
          <p className="text-sm text-true-gray mb-6 font-semibold">
            Mostrando {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, totalCount)} de {totalCount} juegos
          </p>
        )}

        {isLoading ? (
          <CatalogProductSkeleton count={PAGE_SIZE} />
        ) : showEmptyState ? (
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
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-true-beige-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => router.push(`/productos/${product.id}`)}
                >
                  <div className="relative aspect-square w-full bg-true-beige-light border-b border-true-neutral/50 overflow-hidden">
                    <Image
                      src={product.image_url || "/images/placeholder.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {product.video_url && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setModalProduct(product)
                          setModalType("video")
                        }}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-true-orange rounded-full flex items-center justify-center shadow-lg hover:bg-true-orange-hover transition-colors opacity-0 group-hover:opacity-100"
                        aria-label={`Ver video de ${product.name}`}
                      >
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </button>
                    )}

                    {product.age_range && (
                      <span className="absolute top-3 left-3 bg-true-orange text-white text-[10px] font-[1000] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                        {product.age_range} años
                      </span>
                    )}
                  </div>

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
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 text-center bg-true-beige-light hover:bg-true-beige/35 text-true-navy text-xs font-bold py-2.5 rounded-xl border border-true-beige-border transition-colors"
                        >
                          Detalles
                        </Link>
                        <button
                          disabled={product.stock === 0}
                          onClick={(e) => {
                            e.stopPropagation()
                            addItem(product)
                          }}
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

            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

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
                  <h3 className="text-2xl font-bold text-true-navy">{modalProduct.name}</h3>
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
                  <h3 className="text-2xl font-bold text-true-navy">{modalProduct.name}</h3>
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
