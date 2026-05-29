"use client"

import Image from "next/image"
import { Plus, Play, X } from "lucide-react"
import { useState } from "react"
import { StaggerContainer, StaggerItem } from "./scroll-reveal"

const ageCardVariants = ["rotateIn", "bounce", "slideLeft"] as const
const gameCardVariants = ["scale", "pop", "fadeUp", "rotateIn", "wobble"] as const

const ageCategories = [
  {
    range: "2 - 5",
    label: "años",
    bgColor: "bg-[#AFAFAF]",
  },
  {
    range: "6 - 12",
    label: "años",
    bgColor: "bg-[#4A7DE8]",
  },
  {
    range: "12 - 120",
    label: "años",
    bgColor: "bg-[#D6E8F0]",
    textColor: "text-[#8B8B8B]",
  },
]

const games = [
  { 
    name: "Arca de Noé", 
    image: "/images/game-1.jpg",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Un divertido juego de memoria sobre la historia de Noé."
  },
  { 
    name: "Familia Unida", 
    image: "/images/game-2.jpg",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Trivia bíblica para toda la familia."
  },
  { 
    name: "Historias Bíblicas", 
    image: "/images/game-3.jpg",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Aprende las historias de la Biblia jugando."
  },
  { 
    name: "Aventura de Fe", 
    image: "/images/game-4.jpg",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Un juego de estrategia con temas bíblicos."
  },
  { 
    name: "Quiz Bíblico", 
    image: "/images/game-5.jpg",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "El juego de preguntas perfecto para jóvenes."
  },
]

type ModalContent = {
  type: "image" | "video"
  game: typeof games[0]
} | null

export function CatalogSection() {
  const [modalContent, setModalContent] = useState<ModalContent>(null)

  const openImageModal = (game: typeof games[0]) => {
    setModalContent({ type: "image", game })
  }

  const openVideoModal = (game: typeof games[0]) => {
    setModalContent({ type: "video", game })
  }

  const closeModal = () => {
    setModalContent(null)
  }

  return (
    <section id="catalogo" className="bg-[#E8DCC8]">
      <div className="flex justify-center pt-12 pb-8">
        <div className="relative">
          <Image
            src="/images/cloud.png"
            alt=""
            width={500}
            height={250}
            className="w-[300px] md:w-[400px] lg:w-[500px] h-auto"
          />
          <h2 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-tt-milks text-[#F5A623] mt-2">
            Catálogo
          </h2>
        </div>
      </div>

      {/* Age Categories Section */}
      <div className="px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col gap-6 md:gap-8">
          <StaggerContainer className="flex flex-wrap flex-col md:flex-row gap-4 md:gap-6 w-full" stagger={0.15}>
            {ageCategories.map((cat, i) => (
              <StaggerItem
                key={cat.range}
                variant={ageCardVariants[i % ageCardVariants.length]}
                className="flex-1"
              >
                <div
                  className={`${cat.bgColor} ${cat.textColor || "text-white"} rounded-2xl p-6 md:p-8 text-center relative cursor-pointer hover:scale-105 transition-transform h-full`}
                >
                  <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </button>
                  <p className="text-4xl md:text-5xl font-bold leading-none mt-4 font-tt-milks">{cat.range}</p>
                  <p className="text-3xl mt-1 font-tt-milks">{cat.label}</p>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem variant="bounce" className="w-full basis-full">
              <div className="bg-[#F5A623] text-white rounded-2xl p-6 md:p-8 text-center relative cursor-pointer hover:scale-105 transition-transform">
                <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </button>
                <p className="text-3xl md:text-4xl lg:text-5xl font-tt-milks leading-none mt-4">
                  para toda la familia
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"
            stagger={0.08}
            delayChildren={0.05}
          >
            {games.map((game, index) => (
              <StaggerItem
                key={index}
                variant={gameCardVariants[index % gameCardVariants.length]}
                className="flex flex-col items-center group"
              >
                <div className="relative w-full aspect-square bg-[#E8DCC8] rounded-xl overflow-hidden border-2 border-[#D4C8B4]">
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => openImageModal(game)}
                  />
                  {/* Video play button overlay */}
                  <button
                    onClick={() => openVideoModal(game)}
                    className="absolute bottom-2 right-2 w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center shadow-lg hover:bg-[#E09520] transition-colors opacity-0 group-hover:opacity-100"
                    aria-label={`Ver video de ${game.name}`}
                  >
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </button>
                </div>
                <p className="text-[#8B8B8B] tracking-[0.1em] font-sans text-sm mt-3 text-center">
                  {game.name}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center text-white hover:bg-[#E09520] transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {modalContent.type === "image" ? (
              <div className="p-6">
                <div className="relative aspect-video w-full mb-4">
                  <Image
                    src={modalContent.game.image}
                    alt={modalContent.game.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#4A7DE8] mb-2">
                  {modalContent.game.name}
                </h3>
                <p className="text-[#8B8B8B]">{modalContent.game.description}</p>
                <button
                  onClick={() => setModalContent({ type: "video", game: modalContent.game })}
                  className="mt-4 flex items-center gap-2 bg-[#F5A623] text-white px-6 py-3 rounded-full hover:bg-[#E09520] transition-colors"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Ver Video
                </button>
              </div>
            ) : (
              <div className="p-6">
                <div className="aspect-video w-full mb-4">
                  <iframe
                    src={modalContent.game.video}
                    title={`Video de ${modalContent.game.name}`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#4A7DE8] mb-2">
                  {modalContent.game.name}
                </h3>
                <p className="text-[#8B8B8B]">{modalContent.game.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
