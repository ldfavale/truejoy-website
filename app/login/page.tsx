"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react"
import { login } from "@/app/auth/actions"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") ?? "/perfil"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(translateError(result.error))
      }
    })
  }

  return (
    <div className="min-h-screen bg-true-beige-light flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8 block">
        <div className="relative w-40 h-14">
          <Image
            src="/images/logo-truejoy.png"
            alt="True Joy Logo"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-true-beige-border/40 overflow-hidden">
        {/* Header */}
        <div className="bg-true-beige px-8 py-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/60 mb-3">
            <LogIn className="w-5 h-5 text-true-orange" />
          </div>
          <h1 className="text-2xl font-bold text-true-navy tracking-wide">
            Iniciar sesión
          </h1>
          <p className="text-sm text-true-gray mt-1">
            ¡Bienvenido/a de vuelta!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3 flex items-start gap-2">
              <span className="mt-0.5 shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="block text-sm font-semibold text-true-navy tracking-wide"
            >
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="tu@email.com"
              className="w-full border border-true-beige-border rounded-2xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-true-orange/30 focus:border-true-orange transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="block text-sm font-semibold text-true-navy tracking-wide"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full border border-true-beige-border rounded-2xl px-4 py-2.5 pr-11 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-true-orange/30 focus:border-true-orange transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-true-gray hover:text-true-orange transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit-btn"
            disabled={isPending}
            className="w-full bg-true-orange hover:bg-true-orange-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-3 text-sm tracking-wide transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-true-gray pt-2">
            ¿No tenés cuenta?{" "}
            <Link
              href="/register"
              className="text-true-orange font-semibold hover:underline"
            >
              Crear una cuenta
            </Link>
          </p>
        </form>
      </div>

      {/* Back to home */}
      <Link
        href="/"
        className="mt-6 text-sm text-true-gray hover:text-true-orange transition-colors"
      >
        ← Volver al inicio
      </Link>
    </div>
  )
}

function translateError(error: string): string {
  if (error.includes("Invalid login credentials"))
    return "Email o contraseña incorrectos."
  if (error.includes("Email not confirmed"))
    return "Debés confirmar tu email antes de iniciar sesión. Revisá tu bandeja de entrada."
  if (error.includes("too many requests"))
    return "Demasiados intentos. Esperá unos minutos antes de volver a intentar."
  return error
}
