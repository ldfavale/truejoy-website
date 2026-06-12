import { Metadata } from "next"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CatalogPageClient } from "@/components/catalog-page-client"
import { createClient } from "@/lib/supabase/server"
import { Product } from "@/lib/types"
import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { CloudTitle } from "@/components/cloud-title"

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
    <div className="min-h-screen bg-true-beige-light  flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Banner de Cabecera */}
        <div className="bg-true-beige py-4 px-6 text-center border-b border-true-beige-border/30 relative overflow-hidden">
          <CloudTitle title="Catálogo" />
        </div>

        {/* Client catalog component handles searching/filtering */}
        <Suspense fallback={<div className="text-center py-12 text-true-gray">Cargando catálogo...</div>}>
          <CatalogPageClient products={productsList} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
