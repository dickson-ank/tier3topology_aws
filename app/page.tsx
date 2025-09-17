"use client"

import { useState } from "react"
import { TopHeader } from "@/components/top-header"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { HeroSection } from "@/components/hero-section"
import { TutorialSection } from "@/components/tutorial-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ProgressBar } from "@/components/progress-bar"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar />
      <TopHeader
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <SidebarNavigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} isCollapsed={isSidebarCollapsed} />

      <div className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? "lg:ml-16" : "lg:ml-80"}`}>
        <main>
          <HeroSection />
          <TutorialSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
