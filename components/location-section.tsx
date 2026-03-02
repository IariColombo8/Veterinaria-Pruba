"use client"

import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LocationSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const contactInfo = [
    {
      icon: Clock,
      title: "Horarios",
      detail: "Lun-Sáb: 8:00-20:00",
      subDetail: "Urgencias 24/7",
    },
    {
      icon: Phone,
      title: "Teléfono",
      detail: "+54 9 379 466-2600",
      subDetail: "WhatsApp disponible",
      link: "tel:+5493794662600",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "veterinariapriscilas@gmail.com",
      subDetail: "Respuesta en 24hs",
      link: "mailto:veterinariapriscilas@gmail.com",
    },
    {
      icon: Mail,
      title: "Área de Cobertura",
      detail: "Concepción del Uruguay.",
      subDetail: "Servicio personalizado en tu domicilio.",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16 lg:mb-20 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
              <MapPin className="h-4 w-4" />
              Contacto
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Estamos Para Ti
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Atención veterinaria a domicilio en Concepción del Uruguay. Tu mascota merece el mejor cuidado en la comodidad de su hogar
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-10">
          {/* Contact Info - 2 columnas en móvil */}
          <div className="lg:col-span-2 space-y-4 animate-in fade-in slide-in-from-left-8 duration-700" style={{ animationDelay: '200ms' }}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="group border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm bg-background/95"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardContent className="p-2.5 sm:p-4">
                    <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-left sm:gap-3">
                      {/* Icon */}
                      <div className="rounded-xl bg-primary/10 p-2 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 sm:p-2.5">
                        <info.icon 
                          className="h-4 w-4 text-primary transition-transform duration-300 sm:h-5 sm:w-5"
                          strokeWidth={2.5}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[10px] font-bold text-foreground mb-0.5 sm:text-sm">
                          {info.title}
                        </h3>
                        <p className="text-[10px] text-foreground/90 font-medium truncate sm:text-sm">
                          {info.link ? (
                            <a 
                              href={info.link}
                              className="hover:text-primary transition-colors hover:underline"
                            >
                              {info.detail}
                            </a>
                          ) : (
                            info.detail
                          )}
                        </p>
                        <p className="text-[9px] text-muted-foreground hidden sm:block sm:text-xs">
                          {info.subDetail}
                        </p>
                      </div>

                      {/* Indicator - oculto en móvil */}
                      <div className={`hidden sm:block h-2 w-2 rounded-full bg-primary/40 transition-all duration-300 ${hoveredIndex === index ? 'scale-150 bg-primary' : ''}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

        
          </div>

          {/* Map Section */}
          <div className="lg:col-span-3 animate-in fade-in slide-in-from-right-8 duration-700" style={{ animationDelay: '300ms' }}>
            <Card className="h-full min-h-[400px] lg:min-h-[550px] border-2 overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-3xl">
              <div className="relative h-full">
                {/* Map overlay badge */}
                <div className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-foreground">Concepción del Uruguay</span>
                  </div>
                </div>

                {/* Map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54577.89461234567!2d-58.23456789!3d-32.48765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95afdd7ce3456789%3A0x1234567890abcdef!2sConcepci%C3%B3n%20del%20Uruguay%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses-419!2sar!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Zona de Cobertura - Concepción del Uruguay"
                  className="transition-all duration-500 group-hover:saturate-110"
                />

                {/* Info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm p-4 sm:p-6 border-t border-border/50">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm sm:text-base text-foreground">Concepción del Uruguay</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Entre Ríos, Argentina</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs sm:text-sm font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                      asChild
                    >
                      <a href="https://www.google.com/maps/place/Concepción+del+Uruguay" target="_blank" rel="noopener noreferrer">
                        Abrir en Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex justify-center animate-in fade-in duration-1000" style={{ animationDelay: '700ms' }}>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
        </div>
      </div>
    </section>
  )
}