import { HeroCarousel } from "@/components/hero-carousel"
import { ServicesSection } from "@/components/services-section"
import { ProductsSection } from "@/components/products-section"
import { LocationSection } from "@/components/location-section"
import { NosotrosSection } from "@/components/nosotros-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto py-8">
        <HeroCarousel />
      </div>
       <section id="servicios">
        <ServicesSection />
      </section>
      <section id="productos">
        <ProductsSection  />
      </section>
      <section id="sobre-nosotros">
        <NosotrosSection  />
      </section>
      <LocationSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
