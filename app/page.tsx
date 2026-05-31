import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CatalogSection } from "@/components/catalog-section"
import { AboutSection } from "@/components/about-section"
import { TutorialsSection } from "@/components/tutorials-section"
import { GozateSection } from "@/components/gozate-section"
import { ContactSection } from "@/components/contact-section"
import TestimonialCarousel from "@/components/testimonial-carousel"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CatalogSection />
      <TutorialsSection />
      <AboutSection />
      <GozateSection />
      <TestimonialCarousel />
      <ContactSection />
    </main>
  )
}
