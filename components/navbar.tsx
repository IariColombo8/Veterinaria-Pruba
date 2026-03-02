"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { signOut, checkIfUserIsAdmin } from "@/lib/firebase/auth"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Navbar() {
  const { user } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminStatus = await checkIfUserIsAdmin(user.uid)
        setIsAdmin(adminStatus)
      } else {
        setIsAdmin(false)
      }
    }
    checkAdmin()
  }, [user])

  const handleSignOut = async () => {
    await signOut()
    setMobileMenuOpen(false)
    router.push("/")
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group transition-transform hover:scale-105" 
            onClick={closeMobileMenu}
          >
            <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-md ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
              <Image
                src="/logo1.png"
                alt="Salud Animal Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl"
                  style={{ 
  fontFamily: "'Roboto', 'Open Sans', system-ui, sans-serif",
  fontWeight: '700',
  color: '#F08CAE',
  letterSpacing: '0em'
}}>
                Salud Animal Domiciliaria
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase"
                    style={{ 
                      color: '#2C5F4F',
                      letterSpacing: '0.15em'
                    }}>
                MEDICINA Veterinaria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1.5 md:flex">
            <Link href="/">
              <Button 
                variant="ghost" 
                size="default"
                className="font-medium hover:bg-primary/5 transition-colors"
              >
                Inicio
              </Button>
            </Link>
            <Link href="/turno">
              <Button 
                size="default"
                className="font-semibold shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              >
                Sacar Turno
              </Button>
            </Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button 
                      variant="outline" 
                      size="default"
                      className="font-medium border-2 hover:bg-primary/5 transition-colors"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut} 
                  size="default"
                  className="font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="default"
                  className="font-medium hover:bg-primary/5 transition-colors"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/40 py-6 md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              <Link href="/" onClick={closeMobileMenu}>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full justify-start font-medium hover:bg-primary/5 transition-colors"
                >
                  Inicio
                </Button>
              </Link>
              <Link href="/turno" onClick={closeMobileMenu}>
                <Button 
                  size="lg" 
                  className="w-full font-semibold shadow-md bg-gradient-to-r from-primary to-primary/90"
                >
                  Sacar Turno
                </Button>
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" onClick={closeMobileMenu}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full bg-transparent border-2 font-medium hover:bg-primary/5 transition-colors"
                      >
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut} 
                    size="lg" 
                    className="w-full justify-start font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={closeMobileMenu}>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full justify-start font-medium hover:bg-primary/5 transition-colors"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}