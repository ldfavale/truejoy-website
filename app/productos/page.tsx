import { Metadata } from "next"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CatalogPageClient } from "@/components/catalog-page-client"
import { CatalogProductSkeleton } from "@/components/catalog-product-skeleton"
import { CloudTitle } from "@/components/cloud-title"

export const metadata: Metadata = {
  title: "Catálogo de Juegos de Mesa Cristianos - True Joy",
  description: "Explora nuestro catálogo completo de juegos de mesa inspirados en la Biblia. Filtra por edad, categoría y busca tu juego preferido.",
}

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-true-beige-light flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="bg-true-beige py-4 px-6 text-center border-b border-true-beige-border/30 relative overflow-hidden">
          <CloudTitle title="Catálogo" />
        </div>

        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto py-12 px-6">
              <CatalogProductSkeleton count={12} />
            </div>
          }
        >
          <CatalogPageClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
