"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { StaggerContainer, StaggerItem } from "./scroll-reveal"
import { CloudTitle } from "./cloud-title"

const ageCardVariants = ["rotateIn", "bounce", "slideLeft"] as const
const gameCardVariants = ["scale", "pop", "fadeUp", "rotateIn", "wobble"] as const

const ageCategories = [
  {
    range: "2 - 5",
    label: "Años",
    bgColor: "bg-true-light-gray",
  },
  {
    range: "6 - 12",
    label: "Años",
    bgColor: "bg-true-blue",
  },
  {
    range: "12 - 120",
    label: "Años",
    bgColor: "bg-true-sky",
    textColor: "text-true-gray",
  },
]

const games = [
  { 
    id: "1",
    name: "Arca de Noé", 
    image: "/images/game-1.jpg",
  },
  { 
    id: "2",
    name: "Familia Unida", 
    image: "/images/game-2.jpg",
  },
  { 
    id: "3",
    name: "Historias Bíblicas", 
    image: "/images/game-3.jpg",
  },
  { 
    id: "4",
    name: "Aventura de Fe", 
    image: "/images/game-4.jpg",
  },
  { 
    id: "5",
    name: "Quiz Bíblico", 
    image: "/images/game-5.jpg",
  },
]

export function CatalogSection() {
  return (
    <section id="catalogo" className="bg-true-beige">
      <CloudTitle title="Catálogo" />

      {/* Age Categories Section */}
      <div className="px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col gap-6 md:gap-8">
          {/* Age Cards */}
          <StaggerContainer className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full" stagger={0.15}>
            {ageCategories.map((cat, i) => (
              <StaggerItem
                key={cat.range}
                variant={ageCardVariants[i % ageCardVariants.length]}
                className="flex-1 w-full"
              >
                <Link
                  href={`/productos?age=${encodeURIComponent(cat.range)}`}
                  className={`${cat.bgColor} ${cat.textColor || "text-white"} rounded-2xl p-6 md:p-8 text-center relative cursor-pointer hover:scale-105 transition-transform h-full block`}
                >
                  <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center pointer-events-none">
                    <Plus className="w-4 h-4" />
                  </button>
                  <p className="text-4xl md:text-5xl font-bold leading-none mt-4 font-tt-milks">{cat.range}</p>
                  <p className="text-3xl mt-1 font-manjari font-[1000] tracking-[0.005em]">{cat.label}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Para toda la familia banner */}
          <StaggerContainer stagger={0.15} delayChildren={0.2}>
            <StaggerItem variant="bounce">
              <Link
                href={`/productos?category=${encodeURIComponent("Juegos Familiares")}`}
                className="bg-true-orange rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 relative w-full cursor-pointer hover:scale-[1.02] transition-transform block"
              >
                <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/30 flex items-center justify-center text-white pointer-events-none">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-tt-milks text-center leading-none mt-2 sm:mt-0">
                  Para toda la familia
                </p>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            stagger={0.08}
            delayChildren={0.05}
          >
            {games.map((game, index) => (
              <StaggerItem
                key={index}
                variant={gameCardVariants[index % gameCardVariants.length]}
                className="flex w-full flex-col items-center group"
              >
                <Link
                  href={`/productos/${game.id}`}
                  className="w-full flex flex-col items-center"
                >
                  <div className="relative w-full aspect-square bg-true-beige rounded-xl overflow-hidden border-2 border-true-beige-border">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-true-gray tracking-[0.1em] font-sans text-sm mt-3 text-center group-hover:text-true-orange transition-colors">
                    {game.name}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Botón para ver catálogo completo */}
          <div className="flex justify-center mt-12">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-true-orange hover:bg-true-orange-hover text-white font-manjari font-[1000] tracking-[0.05em] text-lg px-8 py-4 rounded-full transition-transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
