"use client"

import { CloudBackground } from "./cloud-background"
import Image from "next/image"
import { StaggerContainer, StaggerItem } from "./scroll-reveal"

const tutorialVariants = ["flip", "scale", "fadeUp", "rotateIn", "slideRight"] as const

const tutorials = [
  { name: "NOMBRE", image: "/images/tutorial-1.jpg", alt: "Tutorial 1" },
  { name: "NOMBRE", image: "/images/tutorial-2.jpg", alt: "Tutorial 2" },
  { name: "NOMBRE", image: "/images/tutorial-3.jpg", alt: "Tutorial 3" },
  { name: "NOMBRE", image: "/images/tutorial-4.jpg", alt: "Tutorial 4" },
  { name: "NOMBRE", image: "/images/tutorial-5.jpg", alt: "Tutorial 5" },
]

export function TutorialsSection() {
  return (
    <section id="tutoriales" className="relative bg-[#D6E8F0] overflow-hidden py-12">
      <CloudBackground />

      <div className="flex justify-center pt-12 pb-16 md:pb-24 relative z-10">
        <div className="relative">
          <Image
            src="/images/cloud_beige.png"
            alt=""
            width={500}
            height={250}
            className="w-[300px] md:w-[400px] lg:w-[500px] h-auto"
          />
          <h2 className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl lg:text-8xl font-tt-milks text-white mt-6 md:mt-8">
            Tutoriales
          </h2>
        </div>
      </div>

      <div className="px-6 relative z-10">
        <div className="mx-auto max-w-5xl">
          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"
            stagger={0.1}
          >
            {tutorials.map((tutorial, index) => (
              <StaggerItem
                key={index}
                variant={tutorialVariants[index % tutorialVariants.length]}
                className="flex flex-col items-center"
              >
                <div className="relative w-full aspect-square bg-[#E8DCC8] rounded-xl overflow-hidden border-2 border-[#D4C8B4]">
                  <Image
                    src={tutorial.image}
                    alt={tutorial.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[#AFAFAF] tracking-[0.15em] font-sans text-sm mt-3">
                  {tutorial.name}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <div className="h-8 mt-8" />
    </section>
  )
}
