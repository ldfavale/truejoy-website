"use client"

import Image from "next/image"
import { Plus, Play, X } from "lucide-react"
import { useState } from "react"

const ageCategories = [
  {
    range: "2 - 5",
    label: "AÑOS",
    bgColor: "bg-[#AFAFAF]",
  },
  {
    range: "6 - 12",
    label: "AÑOS",
    bgColor: "bg-[#4A7DE8]",
  },
  {
    range: "12 - 120",
    label: "AÑOS",
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
      {/* Cloud Header with CATÁLOGO */}
      <div className="flex justify-center pt-12 pb-8">
        <div className="relative">
          <Image
            src="/images/cloud.png"
            alt=""
            width={500}
            height={250}
            className="w-[300px] md:w-[400px] lg:w-[500px] h-auto"
          />
          <h2 className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-sans text-[#F5A623] tracking-wide">
            CATÁLOGO
          </h2>
        </div>
      </div>

      {/* Age Categories Section */}
      <div className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Logo + JUEGOS */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/logo-truejoy.png"
                alt="True Joy"
                width={160}
                height={160}
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
              <p className="text-[#8B8B8B] tracking-[0.3em] font-sans text-lg mt-2">
                J U E G O S
              </p>
            </div>

            {/* Age Cards */}
            <div className="flex flex-1 gap-4 md:gap-6 justify-center">
              {ageCategories.map((cat) => (
                <div
                  key={cat.range}
                  className={`${cat.bgColor} ${cat.textColor || "text-white"} rounded-2xl p-6 md:p-8 text-center relative cursor-pointer hover:scale-105 transition-transform min-w-[120px] md:min-w-[160px]`}
                >
                  <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </button>
                  <p className="text-3xl md:text-4xl font-bold leading-none mt-4">{cat.range}</p>
                  <p className="text-sm tracking-[0.2em] mt-2">
                    {cat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Para toda la familia banner */}
          <div className="mt-8 bg-[#F5A623] rounded-3xl p-8 md:p-12 relative">
            <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white">
              <Plus className="w-5 h-5" />
            </button>
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-sans text-center">
              para toda la familia
            </p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {games.map((game, index) => (
              <div key={index} className="flex flex-col items-center group">
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
              </div>
            ))}
          </div>
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
