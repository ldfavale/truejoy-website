import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CatalogPageClient } from "@/components/catalog-page-client"
import { createClient } from "@/lib/supabase/server"
import { Product } from "@/lib/types"
import { MOCK_PRODUCTS } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Catálogo de Juegos de Mesa Cristianos - True Joy",
  description: "Explora nuestro catálogo completo de juegos de mesa inspirados en la Biblia. Filtra por edad, categoría y busca tu juego preferido.",
}

export default async function ProductosPage() {
  let products: Product[] = []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      console.warn("Supabase query error on catalog page (using mock fallback):", error.message)
    } else if (data) {
      products = data as Product[]
    }
  } catch (error) {
    console.warn("Failed to connect to Supabase on catalog page (using mock fallback):", error)
  }

  // Fallback a datos simulados si la base de datos está vacía o desconectada
  const productsList = products.length > 0 ? products : MOCK_PRODUCTS

  return (
    <div className="min-h-screen bg-true-cream flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Banner de Cabecera */}
        <div className="bg-true-sky py-16 px-6 text-center border-b border-true-beige-border/30 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-xs tracking-[0.2em] font-[1000] text-true-orange-dark uppercase block mb-3 font-sans">
              DIVERSIÓN CON PROPÓSITO
            </span>
            <h1 className="text-5xl md:text-6xl font-manjari font-[1000] tracking-[0.005em] text-true-navy leading-none">
              Catálogo de Juegos
            </h1>
            <p className="text-true-gray font-sans text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Encuentra el juego perfecto para tu grupo de jóvenes, familia o escuela bíblica. Diseñados para divertir y enseñar la palabra de Dios.
            </p>
          </div>
        </div>

        {/* Client catalog component handles searching/filtering */}
        <CatalogPageClient products={productsList} />
      </main>

      <Footer />
    </div>
  )
}
