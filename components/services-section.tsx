"use client"

import {
  Stethoscope,
  Scissors,
  Syringe,
  Heart,
  HeartPulse} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

const services = [
  {
    icon: Stethoscope,
    title: "Consultas Generales",
    description:
      "Exámenes completos y diagnósticos profesionales para tu mascota",
    color: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600",
    borderColor: "group-hover:border-blue-500/50",
  },
  {
    icon: Scissors,
    title: "Telemedicina",
    description:
      "Procedimientos para detectar online y con rapidez el diagnóstico",
    color: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-600",
    borderColor: "group-hover:border-purple-500/50",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Plan de vacunación completo para proteger a tu mascota",
    color: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-600",
    borderColor: "group-hover:border-green-500/50",
  },
  {
    icon: HeartPulse,
    title: "Cardiología",
    description:
      "Diagnóstico y tratamiento de enfermedades cardiovasculares",
    color: "from-red-500/10 to-rose-500/10",
    iconColor: "text-red-600",
    borderColor: "group-hover:border-red-500/50",
  },
];

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header with stagger animation */}
        <div className="mb-12 text-center md:mb-16 lg:mb-20 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
              Lo que ofrecemos
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Ofrecemos atención integral para el bienestar de tu mascota con profesionales altamente capacitados
          </p>
        </div>

        {/* Services Grid - 2 columnas en móvil, 4 en desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card 
                className={`group relative h-full border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${service.borderColor} backdrop-blur-sm bg-background/50`}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`} />
                
                <CardContent className="relative flex flex-col items-center gap-2 p-3 text-center sm:gap-3 sm:p-4 md:gap-4 md:p-6 lg:p-8">
                  {/* Icon container with pulse animation */}
                  <div className={`relative rounded-xl bg-gradient-to-br ${service.color} p-2 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 sm:p-3 md:rounded-2xl md:p-4`}>
                    <div className={`absolute inset-0 rounded-xl md:rounded-2xl ${service.color} blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
                    <service.icon 
                      className={`relative h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 ${service.iconColor} transition-transform duration-500 ${hoveredIndex === index ? 'scale-110' : ''}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  
                  {/* Title with slide animation */}
                  <h3 className="text-xs font-bold sm:text-sm md:text-lg lg:text-xl transition-colors duration-300 group-hover:text-primary line-clamp-2">
                    {service.title}
                  </h3>
                  
                  {/* Description with fade animation - oculta en móvil, visible desde sm */}
                  <p className="hidden sm:block text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base transition-all duration-300 group-hover:text-foreground/80 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Decorative dot indicator */}
                  <div className="mt-1 flex gap-1 sm:mt-2">
                    <div className={`h-1 w-1 rounded-full bg-primary/40 transition-all duration-300 sm:h-1.5 sm:w-1.5 ${hoveredIndex === index ? 'w-4 bg-primary sm:w-8' : ''}`} />
                    <div className="h-1 w-1 rounded-full bg-primary/40 sm:h-1.5 sm:w-1.5" />
                    <div className="h-1 w-1 rounded-full bg-primary/40 sm:h-1.5 sm:w-1.5" />
                  </div>
                </CardContent>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center animate-in fade-in duration-1000" style={{ animationDelay: '800ms' }}>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
        </div>
      </div>
    </section>
  )
}