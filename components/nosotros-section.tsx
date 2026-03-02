"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Home,
  Clock,
  Stethoscope,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const stats = [
  {
    icon: Home,
    value: "100%",
    label: "Atención Domiciliaria",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600",
    borderColor: "border-green-500/20",
  },
  {
    icon: Heart,
    value: "Sin Estrés",
    label: "Para tu Mascota",
    color: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-600",
    borderColor: "border-red-500/20",
  },
  {
    icon: Clock,
    value: "Tiempo Real",
    label: "Consultas sin Apuros",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Stethoscope,
    value: "Integral",
    label: "Evaluación Completa",
    color: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-purple-600",
    borderColor: "border-purple-500/20",
  },
];

const values = [
  {
    title: "Atención Personalizada y Sin Apuros",
    description:
      "Cada consulta con tiempo real de escucha, observación y explicación clara",
  },
  {
    title: "Medicina Preventiva",
    description:
      "Seguimiento clínico continuo y evaluaciones detalladas por sistemas",
  },
  {
    title: "Acompañamiento Profesional",
    description:
      "Especialización en procesos crónicos y geriátricos con comunicación honesta y empática",
  },
  {
    title: "Enfoque Individualizado",
    description:
      "Cada paciente es único y cada decisión considera su bienestar integral",
  },
];

export function NosotrosSection() {
  const [hoveredStatIndex, setHoveredStatIndex] = useState<number | null>(null);
  const [hoveredValueIndex, setHoveredValueIndex] = useState<number | null>(
    null
  );

  return (
    <section
      id="sobre-nosotros"
      className="relative py-16 md:py-20 lg:py-28 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-green-500/[0.02] to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16 lg:mb-20 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-green-600/10 text-green-700 border border-green-600/20">
              <Sparkles className="h-4 w-4" />
              Conócenos
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Sobre Nosotros
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Medicina veterinaria con tiempo, criterio y vocación
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16 items-center">
          {/* Left Column - Image */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative aspect-[3/3] rounded-3xl overflow-hidden border-4 border-green-600/10 shadow-2xl group-hover:border-green-600/30 transition-all duration-500">
                <Image
                  src="/Dra.jpg"
                  alt="Salud Animal Domiciliaria"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div
            className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700"
            style={{ animationDelay: "200ms" }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Salud Animal Domiciliaria
              </h3>
              <p className="text-lg font-semibold text-green-700">
                Atención veterinaria personalizada, profesional y humana, en el
                hogar
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-base sm:text-lg">
                En Salud Animal Domiciliaria creemos que la medicina veterinaria
                va más allá del diagnóstico: se trata de comprender al paciente,
                respetar sus tiempos y acompañar a su familia con compromiso y
                calidez.
              </p>
              <p className="text-base sm:text-lg">
                Ofrecemos atención veterinaria profesional a domicilio, pensada
                especialmente para animales que necesitan un enfoque
                individualizado, sin el estrés que muchas veces genera la
                consulta tradicional.
              </p>
              <p className="text-base sm:text-lg">
                El hogar es un entorno seguro para el animal. Allí se reduce el
                estrés, se observan conductas reales y se logra una evaluación
                más fiel del paciente.
              </p>
            </div>

            {/* Values list */}
            <div className="space-y-3 pt-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group cursor-pointer"
                  onMouseEnter={() => setHoveredValueIndex(index)}
                  onMouseLeave={() => setHoveredValueIndex(null)}
                >
                  <div className="mt-1">
                    <CheckCircle2
                      className={`h-5 w-5 transition-all duration-300 ${
                        hoveredValueIndex === index
                          ? "text-green-600 scale-110"
                          : "text-green-600/60"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold text-base transition-colors duration-300 ${
                        hoveredValueIndex === index
                          ? "text-green-700"
                          : "text-foreground"
                      }`}
                    >
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid - 2x2 en móvil, 4 columnas en desktop */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredStatIndex(index)}
              onMouseLeave={() => setHoveredStatIndex(null)}
            >
              <Card
                className={`group relative h-full border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${stat.borderColor} backdrop-blur-sm bg-background/50`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                />

                <CardContent className="relative flex flex-col items-center gap-3 p-4 text-center sm:gap-4 sm:p-6">
                  {/* Icon */}
                  <div
                    className={`relative rounded-2xl bg-gradient-to-br ${stat.color} p-3 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 sm:p-4`}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl ${stat.color} blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
                    />
                    <stat.icon
                      className={`relative h-6 w-6 sm:h-8 sm:w-8 ${
                        stat.iconColor
                      } transition-transform duration-500 ${
                        hoveredStatIndex === index ? "scale-110" : ""
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Value */}
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                      {stat.label}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="flex gap-1.5 mt-1 sm:mt-2">
                    <div
                      className={`h-1.5 w-1.5 rounded-full bg-green-600/40 transition-all duration-300 ${
                        hoveredStatIndex === index ? "w-8 bg-green-600" : ""
                      }`}
                    />
                    <div className="h-1.5 w-1.5 rounded-full bg-green-600/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-green-600/40" />
                  </div>
                </CardContent>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div
          className="mt-16 flex justify-center animate-in fade-in duration-1000"
          style={{ animationDelay: "800ms" }}
        >
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-green-600/0 via-green-600 to-green-600/0" />
        </div>
      </div>
    </section>
  );
}
