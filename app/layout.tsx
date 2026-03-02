import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salud Animal Domiciliaria - Atención Veterinaria a Domicilio",
  description:
    "Medicina veterinaria profesional y humana en el hogar. Atención personalizada sin el estrés de la consulta tradicional. Cuidado con tiempo, criterio y vocación.",
  generator: "v0.app",
  keywords: [
    "veterinaria",
    "veterinaria a domicilio",
    "Salud Animal",
    "atención domiciliaria",
    "mascotas",
    "medicina veterinaria",
    "veterinario en casa",
  ],
  authors: [{ name: "Salud Animal Domiciliaria" }],
  creator: "Salud Animal Domiciliaria",

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://veterinariaps.vercel.app/", // Cambia por tu dominio real
    siteName: "Salud Animal Domiciliaria",
    title: "Salud Animal Domiciliaria - Atención Veterinaria en el Hogar",
    description:
      "Medicina veterinaria profesional y humana en el hogar. Atención personalizada sin el estrés de la consulta tradicional.",
    images: [
      {
        url: "/metadato.jpg",
        width: 1200,
        height: 630,
        alt: "Salud Animal Domiciliaria - Atención Veterinaria a Domicilio",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Salud Animal Domiciliaria - Atención Veterinaria en el Hogar",
    description:
      "Medicina veterinaria profesional y humana en el hogar. Atención personalizada sin el estrés de la consulta tradicional.",
    images: ["/metadato.jpg"],
  },

  // Iconos
  icons: {
    icon: [
      {
        url: "/icon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo111.png",
        type: "image/png",
      },
    ],
    apple: "/logo111.png",
  },

  // Configuración adicional
  metadataBase: new URL("https://veterinariaps.vercel.app/"), // Cambia por tu dominio real
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
