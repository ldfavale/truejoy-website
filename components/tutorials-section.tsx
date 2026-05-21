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
      {/* White Cloud Decorations using actual cloud image */}
      <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute top-8 left-4 w-24 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={80} height={40} className="absolute top-20 left-20 w-16 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={160} height={80} className="absolute top-4 right-8 w-32 h-auto opacity-90" />
      <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute top-16 right-28 w-20 h-auto opacity-90" />
      
      {/* Beige Cloud Header with "Tutoriales" */}
      <div className="flex justify-center pt-8 pb-12 relative z-10">
        <div className="relative">
          <div className="cloud-shape-beige px-12 py-10 md:px-20 md:py-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans text-white text-center">
              Tutoriales
            </h2>
          </div>
        </div>
      </div>

      {/* Logo + JUEGOS */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <Image
          src="/images/logo-truejoy.png"
          alt="True Joy"
          width={120}
          height={120}
          className="w-24 h-24 md:w-28 md:h-28 object-contain"
        />
        <p className="text-[#8B8B8B] tracking-[0.3em] font-sans text-lg mt-2">
          J U E G O S
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

      {/* Bottom Cloud Decorations */}
      <div className="relative h-48 mt-8">
        <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute bottom-24 left-8 w-20 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={140} height={70} className="absolute bottom-32 left-1/4 w-28 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={80} height={40} className="absolute bottom-20 left-1/3 w-16 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute bottom-28 right-1/3 w-24 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute bottom-36 right-1/4 w-20 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={140} height={70} className="absolute bottom-24 right-8 w-28 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={80} height={40} className="absolute bottom-16 left-16 w-16 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute bottom-12 right-16 w-20 h-auto opacity-90" />
        <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute bottom-8 left-1/2 w-24 h-auto opacity-90" />
      </div>
    </section>
  )
}
