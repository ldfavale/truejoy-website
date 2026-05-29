

import { CloudBackground } from "./cloud-background"
import Image from "next/image"

const tutorials = [
  { name: "NOMBRE" },
  { name: "NOMBRE" },
  { name: "NOMBRE" },
  { name: "NOMBRE" },
  { name: "NOMBRE" },
]

export function TutorialsSection() {
  return (
    <section id="tutoriales" className="relative bg-[#D6E8F0] overflow-hidden py-12">
      <CloudBackground />

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
          <h2 className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl lg:text-[2rem] font-tt-milks text-[#F5A623] mt-2">
            
          </h2>
        </div>
      </div>

      {/* JUEGOS */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <p className="text-[#8B8B8B] font-tt-milks text-3xl mt-1">
          Juegos
        </p>
      </div>

      {/* Tutorial Grid */}
      <div className="px-6 relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-[#E8DCC8] rounded-xl flex items-center justify-center">
                  <span className="text-[#D4C8B4] font-sans text-lg">FOTO</span>
                </div>
                <p className="text-[#AFAFAF] tracking-[0.15em] font-sans text-sm mt-3">
                  {tutorial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-8 mt-8" />

    </section>
  )
}
