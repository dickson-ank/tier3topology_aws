"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Layers, Shield, Zap } from "lucide-react"

export function HeroSection() {
  const scrollToOverview = () => {
    const element = document.getElementById("overview")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
          Build a Scalable
          <span className="text-primary block mt-2">3-Tier Architecture on AWS</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Learn to design and implement a robust 3-tier architecture on AWS with step-by-step guidance, screenshots, and
          best practices. Perfect for showcasing your cloud skills.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" onClick={scrollToOverview} className="text-lg px-8">
            Start Building
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Layers className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Scalable Architecture</h3>
            <p className="text-muted-foreground">
              Learn to separate concerns with presentation, application, and data tiers for maximum scalability.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Security Best Practices</h3>
            <p className="text-muted-foreground">
              Implement proper security groups, VPCs, and access controls across all tiers.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Production Ready</h3>
            <p className="text-muted-foreground">
              Build a real-world architecture that you can deploy and showcase in your portfolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
