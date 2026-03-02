"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
  Send,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-card via-card to-muted/20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 md:gap-10 lg:gap-8">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-3 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white shadow-lg ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50 group-hover:scale-110">
                <Image
                  src="/logo1.png"
                  alt="VetCare Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-xl font-bold tracking-tight md:text-2xl"
                  style={{
                    fontFamily: "'Brush Script MT', cursive",
                    color: "#F08CAE",
                  }}
                >
                  Priscila Silva
                </span>
                <span
                  className="text-[10px] font-semibold tracking-wider uppercase"
                  style={{
                    color: "#2C5F4F",
                    letterSpacing: "0.15em",
                  }}
                >
                  Medicina Veterinaria
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Cuidado profesional y amoroso para tus mascotas. Especialistas en
              cardiología veterinaria con más de 10 años de experiencia.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center sm:items-start"
            style={{ animationDelay: "100ms" }}
          >
            <h3 className="mb-5 text-base font-bold text-foreground md:text-lg flex items-center gap-2">
              Enlaces Rápidos
              <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-[60px]" />
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-center sm:items-start">
              {[
                { href: "/", label: "Inicio" },
                { href: "/turno", label: "Sacar Turno" },
                { href: "/#servicios", label: "Servicios" },
                { href: "/#productos", label: "Productos" },
                { href: "/#sobre-nosotros", label: "Sobre Nosotros" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-muted-foreground transition-all hover:text-primary hover:translate-x-1"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 transition-all group-hover:w-3 group-hover:bg-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center sm:items-start"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-5 text-base font-bold text-foreground md:text-lg flex items-center gap-2">
              Servicios
              <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-[60px]" />
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-center sm:items-start">
              {[
                "Consultas Generales",
                "Telemedicina",
                "Vacunación",
                "Urgencias 24/7",
                "Análisis Clínicos",
              ].map((service, index) => (
                <li key={index}>
                  <span className="group flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-3.5 w-3.5 text-primary/60 fill-primary/20 transition-all group-hover:fill-primary/40" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className="lg:col-span-3 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center sm:items-start"
            style={{ animationDelay: "300ms" }}
          >
            <h3 className="mb-5 text-base font-bold text-foreground md:text-lg flex items-center gap-2">
              Contacto
              <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-[60px]" />
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground w-full flex flex-col items-center sm:items-start">
              <li className="flex flex-col items-center gap-1.5 group sm:flex-row sm:items-start sm:gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-medium text-foreground text-xs mb-0.5">
                    Dirección
                  </p>
                  <span className="text-xs">Servicio a Domicilio</span>
                </div>
              </li>
              <li className="flex flex-col items-center gap-1.5 group sm:flex-row sm:items-start sm:gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-medium text-foreground text-xs mb-0.5">
                    Teléfono
                  </p>
                  <a
                    href="tel:+5493794662600"
                    className="text-xs hover:text-primary transition-colors"
                  >
                    +54 9 379 466-2600
                  </a>
                </div>
              </li>
              <li className="flex flex-col items-center gap-1.5 group sm:flex-row sm:items-start sm:gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-medium text-foreground text-xs mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:veterinariapriscilas@gmail.com"
                    className="text-xs hover:text-primary transition-colors break-all"
                  >
                    veterinariapriscilas@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media - Nueva columna */}
          <div
            className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center sm:items-start"
            style={{ animationDelay: "400ms" }}
          >
            <h3 className="mb-5 text-base font-bold text-foreground md:text-lg flex items-center gap-2">
              Síguenos
              <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-[60px]" />
            </h3>
            <a
              href="https://www.instagram.com/cardiologiavet.pri"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl bg-primary/10 p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white"
              aria-label="instagram"
              onMouseEnter={() => setHoveredSocial("instagram")}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <Instagram
                className={`h-5 w-5 text-primary transition-colors group-hover:text-white ${
                  hoveredSocial === "instagram" ? "scale-110" : ""
                }`}
              />

              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Instagram
              </span>
            </a>
          </div>
        </div>

        {/* Divider with decoration */}
        <div className="relative my-10 md:my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-card">
              <Heart className="h-6 w-6 text-primary fill-primary/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="flex flex-col items-center justify-center gap-4 animate-in fade-in duration-700"
          style={{ animationDelay: "400ms" }}
        >
          <p className="text-center text-xs text-muted-foreground md:text-sm">
            &copy; {new Date().getFullYear()} Priscila Silva - Medicina
            Veterinaria. Todos los derechos reservados.
          </p>
          <span className="flex items-center gap-1.5 text-muted-foreground text-sm md:text-base">
            Hecho por{" "}
            <a
              href="https://linktr.ee/Serviteccdelu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:text-primary/80 transition-colors underline decoration-primary/40 hover:decoration-primary text-base md:text-lg"
            >
              ServiTec
            </a>
          </span>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    </footer>
  );
}
