"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const products = [
  {
    name: "Alimento Premium Perros",
    image: "/premium-dog-food-bag.png",
    description: "Nutrición balanceada para perros adultos",
    rating: 4.8,
    badge: "Más Vendido",
    badgeColor: "bg-blue-500"
  },
  {
    name: "Alimento Premium Gatos",
    image: "/premium-cat-food-bag.jpg",
    description: "Fórmula especial para gatos adultos",
    rating: 4.9,
    badge: "Recomendado",
    badgeColor: "bg-purple-500"
  },
  {
    name: "Collar Antipulgas",
    image: "/flea-collar-for-pets.jpg",
    description: "Protección por 8 meses",
    rating: 4.7,
    badge: "Nuevo",
    badgeColor: "bg-green-500"
  },
  {
    name: "Juguete Interactivo",
    image: "/interactive-pet-toy.jpg",
    description: "Estimula la mente de tu mascota",
    rating: 4.6,
    badge: "Oferta",
    badgeColor: "bg-red-500"
  },
]

export function ProductsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16 lg:mb-20 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
              Tienda
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Productos Destacados
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Encuentra todo lo necesario para el cuidado y bienestar de tu mascota
          </p>
        </div>

        {/* Products Grid - 2 columnas en móvil, 4 en desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="group relative h-full overflow-hidden border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm bg-background/95">
                {/* Badge */}
                <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${product.badgeColor} shadow-lg animate-in slide-in-from-left-4 duration-500 sm:top-3 sm:left-3 sm:px-3 sm:py-1 sm:text-xs`}>
                  {product.badge}
                </div>

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-muted/50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </div>
                </div>

                <CardContent className="relative p-2.5 space-y-1.5 sm:p-4 sm:space-y-2 md:p-5 md:space-y-3">
                  {/* Rating */}
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        } transition-all duration-300`}
                      />
                    ))}
                    <span className="ml-0.5 text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground sm:ml-1">
                      {product.rating}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-bold leading-tight transition-colors duration-300 group-hover:text-primary sm:text-sm md:text-lg lg:text-xl line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Description - oculta en móvil */}
                  <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-foreground/70 md:text-sm">
                    {product.description}
                  </p>

                  {/* Progress indicator */}
                  <div className="flex gap-0.5 pt-1 sm:gap-1 sm:pt-2 md:pt-3">
                    <div className={`h-0.5 rounded-full bg-primary transition-all duration-300 sm:h-1 ${hoveredIndex === index ? 'w-6 sm:w-12' : 'w-3 sm:w-6'}`} />
                    <div className="h-0.5 w-3 rounded-full bg-primary/30 sm:h-1 sm:w-6" />
                    <div className="h-0.5 w-3 rounded-full bg-primary/30 sm:h-1 sm:w-6" />
                  </div>
                </CardContent>

                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 sm:h-1" />
              </Card>
            </div>
          ))}
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex justify-center animate-in fade-in duration-1000" style={{ animationDelay: '1000ms' }}>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
        </div>
      </div>
    </section>
  )
}