"use client"

import { CloudBackground } from "./cloud-background"
import Image from "next/image"
import { StaggerContainer, StaggerItem } from "./scroll-reveal"
import { TutorialVideoCard } from "./tutorial-video-card"

const tutorialVariants = ["flip", "scale", "fadeUp", "rotateIn", "slideRight"] as const

const tutorials = [
  {
    name: "NOMBRE",
    poster: "/images/tutorial-1.jpg",
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    alt: "Tutorial 1",
  },
  {
    name: "NOMBRE",
    poster: "/images/tutorial-2.jpg",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    alt: "Tutorial 2",
  },
  {
    name: "NOMBRE",
    poster: "/images/tutorial-3.jpg",
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
    alt: "Tutorial 3",
  },
  {
    name: "NOMBRE",
    poster: "/images/tutorial-4.jpg",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    alt: "Tutorial 4",
  },
  {
    name: "NOMBRE",
    poster: "/images/tutorial-5.jpg",
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    alt: "Tutorial 5",
  },
]

export function TutorialsSection() {
  return (
    <section id="tutoriales" className="relative bg-true-sky overflow-hidden py-20 sm:py-12">
      <CloudBackground />

      <div className="flex justify-center px-4 pt-16 pb-36 sm:pt-12 sm:pb-20 md:pb-28 relative z-10">
        <div className="relative w-[min(92vw,26rem)] sm:w-auto">
          <Image
            src="/images/cloud_beige.png"
            alt=""
            width={500}
            height={250}
            className="w-full sm:w-[400px] lg:w-[500px] h-auto"
            priority
          />
          <h2 className="absolute inset-0 flex items-center justify-center text-8xl leading-none sm:text-7xl md:text-8xl font-manjari font-[1000] tracking-[0] text-white mt-8 sm:mt-6 md:mt-20">
            Tutoriales
          </h2>
        </div>
      </div>

      <div className="px-6 pt-4 pb-4 sm:pt-0 relative z-10">
        <div className="mx-auto max-w-5xl">
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 sm:gap-4 md:gap-6"
            stagger={0.1}
          >
            {tutorials.map((tutorial, index) => (
              <StaggerItem
                key={index}
                variant={tutorialVariants[index % tutorialVariants.length]}
                className="relative flex w-full flex-col items-center"
              >
                <TutorialVideoCard
                  poster={tutorial.poster}
                  video={tutorial.video}
                  alt={tutorial.alt}
                />
                <p className="text-true-light-gray tracking-[0.15em] font-sans text-sm mt-6 sm:mt-3">
                  {tutorial.name}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <div className="h-14 mt-16 sm:h-8 sm:mt-8" />
    </section>
  )
}
