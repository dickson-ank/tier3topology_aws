"use client"

import { Button } from "@/components/ui/button"
import { Mail, Menu, X, Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface TopHeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  isSidebarCollapsed: boolean
  setIsSidebarCollapsed: (collapsed: boolean) => void
}

export function TopHeader({ isMenuOpen, setIsMenuOpen, isSidebarCollapsed, setIsSidebarCollapsed }: TopHeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <div
          className={`hidden lg:flex items-center space-x-2 transition-all duration-300 ${
            isSidebarCollapsed ? "lg:ml-20" : "lg:ml-80"
          }`}
        >
          <span className="text-lg font-semibold text-foreground">3-Tier AWS Architecture Guide</span>
        </div>

        <div className="flex items-center space-x-2">
          {mounted && (
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          <Button
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact Me
          </Button>
        </div>
      </div>
    </header>
  )
}
