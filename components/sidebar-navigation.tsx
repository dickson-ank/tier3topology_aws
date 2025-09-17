"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Layers } from "lucide-react"

interface SidebarNavigationProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isCollapsed: boolean
}

export function SidebarNavigation({ isOpen, setIsOpen, isCollapsed }: SidebarNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsOpen])

  const navigationItems = [
    {
      id: "overview",
      title: "Overview",
      subsections: [
        { id: "architecture-intro", title: "Architecture Introduction" },
        { id: "benefits", title: "Benefits & Use Cases" },
        { id: "prerequisites", title: "Prerequisites" },
      ],
    },
    {
      id: "presentation-tier",
      title: "Presentation Tier",
      subsections: [
        { id: "cloudfront-setup", title: "CloudFront Setup" },
        { id: "s3-hosting", title: "S3 Static Hosting" },
        { id: "domain-configuration", title: "Domain Configuration" },
      ],
    },
    {
      id: "application-tier",
      title: "Application Tier",
      subsections: [
        { id: "ec2-instances", title: "EC2 Instances" },
        { id: "load-balancer", title: "Application Load Balancer" },
        { id: "auto-scaling", title: "Auto Scaling Groups" },
        { id: "security-groups", title: "Security Groups" },
      ],
    },
    {
      id: "data-tier",
      title: "Data Tier",
      subsections: [
        { id: "rds-setup", title: "RDS Database Setup" },
        { id: "database-security", title: "Database Security" },
        { id: "backup-strategy", title: "Backup Strategy" },
      ],
    },
    {
      id: "deployment",
      title: "Deployment",
      subsections: [
        { id: "step-by-step", title: "Step-by-Step Guide" },
        { id: "testing", title: "Testing & Validation" },
        { id: "monitoring", title: "Monitoring Setup" },
      ],
    },
  ]

  return (
    <>
      <aside
        className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r border-border z-40 transform transition-all duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-16" : "lg:w-80"}
        w-80
      `}
      >
        <div className={`p-6 ${isCollapsed ? "lg:p-2" : ""}`}>
          <div className={`flex items-center mb-8 ${isCollapsed ? "lg:justify-center lg:mb-4" : "space-x-2"}`}>
            <Layers className="h-8 w-8 text-primary" />
            {!isCollapsed && <span className="text-xl font-semibold text-foreground lg:block">3-Tier AWS</span>}
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex-1 text-left px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors ${
                      isCollapsed ? "lg:px-1 lg:text-xs lg:truncate" : ""
                    }`}
                    title={isCollapsed ? item.title : undefined}
                  >
                    {isCollapsed ? (
                      <span className="hidden lg:block text-center w-full">
                        {item.title
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </span>
                    ) : (
                      item.title
                    )}
                    <span className="lg:hidden">{item.title}</span>
                  </button>
                  {!isCollapsed && (
                    <Button variant="ghost" size="sm" onClick={() => toggleSection(item.id)} className="p-1 h-8 w-8">
                      {expandedSections.includes(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {!isCollapsed && expandedSections.includes(item.id) && (
                  <div className="ml-4 space-y-1">
                    {item.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => scrollToSection(subsection.id)}
                        className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          onTouchStart={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
