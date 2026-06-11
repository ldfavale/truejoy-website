import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Play, ShieldCheck, Truck, Check, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Product } from "@/lib/types"
import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { AddToCartButton } from "./add-to-cart-button"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params
  let product: Product | null = null

  // Intentar cargar desde Supabase
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

    if (data) {
      product = data as Product
    }
  } catch (error) {
    console.warn("Error consultando producto en Supabase, buscando en mock data:", error)
  }

  // Fallback a mock data si no se encontró en Supabase (ej: ID de prueba 1 a 5)
  if (!product) {
    product = MOCK_PRODUCTS.find((p) => p.id === id) || null
  }

  // Si no existe, error 404
  if (!product) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-true-cream flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-true-gray hover:text-true-orange transition-colors font-semibold text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-true-beige-border/50 mb-12">
            {/* Left Column: Image & Video link */}
            <div className="flex flex-col gap-6">
              <div className="relative w-full aspect-square bg-true-beige rounded-2xl overflow-hidden border border-true-beige-border">
                <Image
                  src={product.image_url || "/images/placeholder.jpg"}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Badges and tags */}
              <div className="flex flex-wrap gap-2">
                {product.category && (
                  <span className="bg-true-sky text-true-navy text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.category}
                  </span>
                )}
                {product.age_range && (
                  <span className="bg-true-orange/15 text-true-orange-dark text-xs font-bold px-3 py-1.5 rounded-full">
                    Edad: {product.age_range} años
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Title, Price, Description, Buy */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-manjari font-bold text-true-navy mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-3xl font-sans font-[1000] text-true-orange-medium mb-6">
                  {formatPrice(product.price)}
                </p>

                {/* Stock Status Badge */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <div className="inline-flex items-center gap-1.5 text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                      Disponible ({product.stock} unidades en stock)
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full text-xs font-bold">
                      Agotado
                    </div>
                  )}
                </div>

                <div className="border-t border-true-neutral my-6"></div>

                <p className="text-true-gray text-base md:text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-true-navy font-semibold">
                    <Truck className="w-5 h-5 text-true-orange" />
                    <span>Envío a todo Chile (físico)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-true-navy font-semibold">
                    <ShieldCheck className="w-5 h-5 text-true-blue" />
                    <span>Pago seguro garantizado</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-true-navy font-semibold">
                    <Sparkles className="w-5 h-5 text-true-orange-medium" />
                    <span>Inspirado en la palabra de Dios</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>

          {/* Video Section if available */}
          {product.video_url && (
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-true-beige-border/50">
              <h2 className="text-2xl md:text-3xl font-manjari font-bold text-true-navy mb-6 flex items-center gap-2">
                <Play className="w-6 h-6 text-true-orange fill-true-orange" />
                ¿Cómo se juega? Ver video tutorial
              </h2>
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-inner border-2 border-true-beige">
                <iframe
                  src={product.video_url}
                  title={`Video tutorial de ${product.name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
