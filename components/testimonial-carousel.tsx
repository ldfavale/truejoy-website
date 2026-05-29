"use client";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SectionTitle } from './section-title';
import { Card } from './card';
import { ScrollReveal, StaggerContainer, StaggerItem } from './scroll-reveal';

const testimonialsData = [
  {
    text: "Desde que compramos 'Aventura en la Selva', nuestras tardes de domingo cambiaron por completo. Es increíble ver cómo mis hijos dejan las pantallas para sentarse juntos a jugar y reír. ¡Totalmente recomendado!",
    author: "Familia García",
    role: "Jugadores frecuentes",
    image: "/images/family.jpg"
  },
  {
    text: "Como abuelo, a veces me costaba encontrar actividades para compartir con mis nietos. Estos juegos de mesa han sido un puente maravilloso. Son fáciles de aprender y nos mantienen la mente ágil.",
    author: "Roberto y sus nietos",
    role: "Abuelo de 3 niños",
    image: "/images/roberto_granpa.png"
  },
  {
    text: "Mis hijos y sus amigos siempre buscan juegos rápidos y divertidos para sus tardes. 'Misterio en la Ciudad' es un éxito rotundo. Las partidas son dinámicas y siempre los dejan con ganas de más.",
    author: "Yasmir (Mamá de Sofia)",
    role: "Grupo de amigos",
    image: "/images/sofis_mom.jpg"
  },
  {
    text: "La calidad de los materiales es excepcional. A mis hijas pequeñas les encantan los colores y las piezas. Además, las mecánicas son súper originales y fáciles de entender para ellas.",
    author: "Familia Pérez",
    role: "Padres de dos niñas",
    image: "/images/family_2.png"
  },
  {
    text: "En la escuela lo usamos como herramienta didáctica y los chicos están fascinados. Aprenden a colaborar, a esperar su turno y a resolver problemas sin darse cuenta de que están estudiando.",
    author: "Laura M. y sus alumnos",
    role: "Docente de primaria",
    image: "/images/maestra.png"
  }
];

const TRUE_ORANGE = '#F5A623'; // var(--true-orange)

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the middle item

  const handleIndicatorClick = (i: number) => {
    setActiveIndex(i);
  };

  const reorderedTemonials = useMemo(() => {
    const testimonials = testimonialsData.map((t, i) => ({ ...t, originalIndex: i }));
    const middle = Math.floor(testimonials.length / 2);
    
    const reordered = [];
    for (let i = 0; i < testimonials.length; i++) {
        const offset = (i - middle + testimonials.length) % testimonials.length;
        const originalIndex = (activeIndex + offset) % testimonials.length;
        const testimonial = testimonials.find(t => t.originalIndex === originalIndex);
        if(testimonial) {
          reordered.push(testimonial);
        }
    }
    return reordered;
  }, [activeIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto text-center py-16 px-6">
      <SectionTitle className="mb-12 shadow-sm w-full" animation="flip">
        Qué dicen de nuestros juegos
      </SectionTitle>
      <ScrollReveal variant="scale" delay={0.15}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 min-h-[16rem] flex flex-col justify-center items-center w-full"
        >
          <Card bgColor="#E5E5E5" textColor="#8B8B8B" className="flex-col w-full text-center">
            <blockquote className="text-lg md:text-xl font-sans mb-6 text-gray-800">
              “{testimonialsData[activeIndex].text}”
            </blockquote>
            <p className="font-sans font-bold text-[#1a365d]">{testimonialsData[activeIndex].author}</p>
            <p className="font-sans">{testimonialsData[activeIndex].role}</p>
          </Card>
        </motion.div>
      </AnimatePresence>
      </ScrollReveal>
      
      <StaggerContainer className="flex justify-center items-center gap-4 flex-wrap" stagger={0.08}>
        {reorderedTemonials.map((testimonial) => {
          const isActive = activeIndex === testimonial.originalIndex;
          return (
            <StaggerItem key={`stagger-${testimonial.originalIndex}`} variant="pop">
            <motion.button 
              layout
              key={testimonial.originalIndex} 
              onClick={() => handleIndicatorClick(testimonial.originalIndex)}
              className={`focus:outline-none ${isActive ? 'mx-2' : ''}`}
              animate={isActive ? "active" : "inactive"}
              whileHover={isActive ? "active" : "hover"}
              transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
            >
              <motion.div
                className="p-1 rounded-full"
                variants={{
                  inactive: { scale: 0.9, boxShadow: `0 0 0 0px ${TRUE_ORANGE}` },
                  active:   { scale: 1.1, boxShadow: `0 0 0 3px ${TRUE_ORANGE}` },
                  hover:    { scale: 1,   boxShadow: `0 0 0 3px ${TRUE_ORANGE}` }
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-16 h-16 md:w-20 md:h-20"
                />
              </motion.div>
            </motion.button>
            </StaggerItem>
          )}
        )}
      </StaggerContainer>
    </div>
  );
};

export default TestimonialCarousel;