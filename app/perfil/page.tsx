import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { logout } from "@/app/auth/actions"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { User, Mail, LogOut, ShoppingBag } from "lucide-react"

export const metadata: Metadata = {
  title: "Mi Perfil - True Joy",
  description: "Administrá tu cuenta y revisá tus pedidos.",
}

function getInitials(name: string | null | undefined, email: string) {
  if (name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
  return email[0].toUpperCase()
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // El middleware ya protege esta ruta, pero lo verificamos también en el Server Component
  if (!user) {
    redirect("/login?next=/perfil")
  }

  const fullName = user.user_metadata?.full_name as string | undefined
  const initials = getInitials(fullName, user.email!)
  const memberSince = new Date(user.created_at).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
  })

  return (
    <div className="min-h-screen bg-true-beige-light flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <h1 className="text-2xl font-bold text-true-navy mb-8 tracking-wide">
          Mi cuenta
        </h1>

        {/* Avatar + info */}
        <div className="bg-white rounded-3xl shadow-sm border border-true-beige-border/40 overflow-hidden mb-6">
          {/* Header con color */}
          <div className="bg-true-beige px-8 py-6 flex items-center gap-5">
            {/* Avatar con iniciales */}
            <div className="w-16 h-16 rounded-full bg-true-orange flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-sm">
              {initials}
            </div>
            <div>
              {fullName && (
                <p className="font-bold text-true-navy text-lg leading-tight">
                  {fullName}
                </p>
              )}
              <p className="text-true-gray text-sm">{user.email}</p>
              <p className="text-true-lighter-gray text-xs mt-1">
                Miembro desde {memberSince}
              </p>
            </div>
          </div>

          {/* Datos de la cuenta */}
          <div className="px-8 py-6 space-y-4">
            <h2 className="text-sm font-semibold text-true-navy tracking-widest uppercase text-true-light-gray">
              Información de la cuenta
            </h2>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-true-beige-light flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-true-orange" />
              </div>
              <div>
                <span className="font-medium text-true-navy">Nombre</span>
                <p className="text-true-gray">{fullName ?? "Sin nombre registrado"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-true-beige-light flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-true-orange" />
              </div>
              <div>
                <span className="font-medium text-true-navy">Email</span>
                <p className="text-true-gray">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mis pedidos (placeholder para Fase 4) */}
        <div className="bg-white rounded-3xl shadow-sm border border-true-beige-border/40 px-8 py-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-5 h-5 text-true-orange" />
            <h2 className="font-bold text-true-navy">Mis pedidos</h2>
          </div>
          <p className="text-sm text-true-gray">
            Todavía no realizaste ningún pedido. ¡Explorá nuestro{" "}
            <a href="/productos" className="text-true-orange font-semibold hover:underline">
              catálogo
            </a>{" "}
            y encontrá tu juego favorito!
          </p>
        </div>

        {/* Cerrar sesión */}
        <form action={logout}>
          <button
            type="submit"
            id="logout-btn"
            className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-2xl py-3 text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
