import { Product } from "./types"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Arca de Noé",
    description: "Un divertido juego de memoria y estrategia sobre la historia del Arca de Noé. Perfecto para desarrollar habilidades de concentración y aprender sobre la Biblia de una manera interactiva.",
    price: 24900,
    image_url: "/images/game-1.jpg",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    stock: 15,
    category: "Juegos Infantiles",
    age_range: "2 - 5",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Familia Unida",
    description: "Trivia bíblica emocionante para toda la familia. Reúne a tus seres queridos y pon a prueba tus conocimientos de las Escrituras con cientos de preguntas divertidas y dinámicas grupales.",
    price: 29900,
    image_url: "/images/game-2.jpg",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    stock: 25,
    category: "Juegos Familiares",
    age_range: "6 - 12",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Historias Bíblicas",
    description: "Aprende las historias más asombrosas de la Biblia jugando. Este juego de cartas desafía a los jugadores a ordenar cronológicamente los eventos clave del Antiguo y Nuevo Testamento.",
    price: 19900,
    image_url: "/images/game-3.jpg",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    stock: 30,
    category: "Juegos de Cartas",
    age_range: "6 - 12",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Aventura de Fe",
    description: "Un profundo juego de mesa de estrategia y toma de decisiones basado en los viajes de los apóstoles. Supera desafíos, comparte la palabra y fortalece tu fe en cada turno.",
    price: 34900,
    image_url: "/images/game-4.jpg",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    stock: 10,
    category: "Estrategia",
    age_range: "12 - 120",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    name: "Quiz Bíblico",
    description: "El juego de preguntas y respuestas rápido y divertido perfecto para jóvenes y campamentos. Ideal para romper el hielo y repasar las enseñanzas bíblicas con risas aseguradas.",
    price: 17900,
    image_url: "/images/game-5.jpg",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    stock: 40,
    category: "Juegos de Bolsillo",
    age_range: "12 - 120",
    created_at: new Date().toISOString()
  }
]
