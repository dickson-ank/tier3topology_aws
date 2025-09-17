"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Layers } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Layers className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">3-Tier AWS Architecture</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("overview")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection("presentation-tier")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Presentation Tier
            </button>
            <button
              onClick={() => scrollToSection("application-tier")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Application Tier
            </button>
            <button
              onClick={() => scrollToSection("data-tier")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Data Tier
            </button>
            <button
              onClick={() => scrollToSection("deployment")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Deployment
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("overview")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("presentation-tier")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Presentation Tier
              </button>
              <button
                onClick={() => scrollToSection("application-tier")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Application Tier
              </button>
              <button
                onClick={() => scrollToSection("data-tier")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Data Tier
              </button>
              <button
                onClick={() => scrollToSection("deployment")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Deployment
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
