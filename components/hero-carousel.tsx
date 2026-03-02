"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    imagePC: "/foto-1-PC.jpg",
    imageCEL: "/foto-1-CEL.jpg",
    title: "Atención Veterinaria en el Hogar",
    subtitle:
      "Medicina profesional y humana, sin el estrés de la consulta tradicional",
  },
  {
    imagePC: "/foto-2-PC.jpg",
    imageCEL: "/foto-2-CEL.jpg",
    title: "Cuidado Personalizado y Sin Apuros",
    subtitle:
      "Cada consulta con tiempo real de escucha, observación y acompañamiento",
  },
  {
    imagePC: "/foto-3-PC.jpg",
    imageCEL: "/foto-3-CEL.jpg",
    title: "Compromiso con el Bienestar Animal",
    subtitle: "Medicina veterinaria con tiempo, criterio y vocación",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg md:rounded-2xl">
      {/* Contenedor para móvil con aspect ratio 3:4 */}
      <div className="relative w-full md:hidden" style={{ aspectRatio: "3/4" }}>
        {slides.map((slide, index) => (
          <div
            key={`mobile-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.imageCEL || "/placeholder.svg"}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
              <h1 className="max-w-4xl text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
                {slide.title}
              </h1>
              <p className="max-w-2xl text-pretty text-base text-white/90 sm:text-lg">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Botón para móvil */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4 px-4 text-center mt-56 pointer-events-auto">
            <Link href="/turno" className="group">
              <Button
                size="lg"
                className="text-base bg-green-600 hover:bg-green-700 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Sacar Turno Ahora
                  <Calendar className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Botones de navegación móvil */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition hover:bg-white/30"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition hover:bg-white/30"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Indicadores móvil */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Contenedor para PC/tablet con aspect ratio 4:3 */}
      <div className="relative w-full hidden md:block md:h-[350px] lg:h-[450px]">
        {slides.map((slide, index) => (
          <div
            key={`desktop-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.imagePC || "/placeholder.svg"}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
              <h1 className="max-w-4xl text-balance text-5xl font-bold leading-tight text-white lg:text-6xl">
                {slide.title}
              </h1>
              <p className="max-w-2xl text-pretty text-xl text-white/90 lg:text-2xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Botón para PC */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-6 px-4 text-center mt-72 lg:mt-80 pointer-events-auto">
            <Link href="/turno" className="group">
              <Button
                size="lg"
                className="text-lg bg-green-600 hover:bg-green-700 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Sacar Turno Ahora
                  <Calendar className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Botones de navegación PC */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/30"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/30"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Indicadores PC */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
