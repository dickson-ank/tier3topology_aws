"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Phone, Menu, X, Sun, Moon, MessageCircle } from "lucide-react"
import Image from "next/image"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const tutorialSteps = [
  {
    id: "introduction",
    title: "Introduction to 3-Tier Architecture",
    content: `
      A 3-tier architecture is a well-established software application architecture that organizes applications into three logical and physical computing tiers: the presentation tier, application tier, and data tier.
      
      This tutorial will guide you through building a scalable 3-tier architecture on AWS using modern cloud services.
    `,
    image: "/tier3.png",
  },
  {
    id: "presentation-tier",
    title: "Step 1: Setting Up the Presentation Tier",
    content: `
      The presentation tier is the user interface and communication layer of the application. In AWS, we'll use:
      
      • Amazon CloudFront for content delivery
      • Amazon S3 for static website hosting
      • AWS Amplify for modern web applications
      
      This tier handles user interactions and presents information to the user.
    `,
    image: "/Newtwork Topology - Project 4.png",
  },
  {
    id: "application-tier",
    title: "Step 2: Building the Application Tier",
    content: `
      The application tier contains the business logic and processes user requests. We'll implement:
      
      • Amazon EC2 instances or AWS Lambda functions
      • Application Load Balancer for traffic distribution
      • Auto Scaling Groups for high availability
      
      This tier processes requests from the presentation tier and communicates with the data tier.
    `,
    image: "/erhenfest.jpg",
  },
  {
    id: "data-tier",
    title: "Step 3: Configuring the Data Tier",
    content: `
      The data tier stores and manages application data. Our setup includes:
      
      • Amazon RDS for relational databases
      • Amazon DynamoDB for NoSQL requirements
      • Amazon S3 for object storage
      
      This tier ensures data persistence, backup, and recovery capabilities.
    `,
    image: "/shirt_illus.jgp",
  },
  {
    id: "security",
    title: "Step 4: Implementing Security",
    content: `
      Security is crucial in a 3-tier architecture. We'll configure:
      
      • VPC with public and private subnets
      • Security Groups and NACLs
      • IAM roles and policies
      • AWS WAF for web application protection
      
      These measures ensure your architecture is secure and compliant.
    `,
    image: "/Architecture Diagram.png",
  },
  {
    id: "monitoring",
    title: "Step 5: Setting Up Monitoring and Logging",
    content: `
      Monitoring helps maintain system health and performance:
      
      • Amazon CloudWatch for metrics and alarms
      • AWS CloudTrail for API logging
      • AWS X-Ray for distributed tracing
      
      These tools provide visibility into your application's performance and help with troubleshooting.
    `,
    image: "/shirt.jpg",
  },
  {
    id: "deployment",
    title: "Step 6: Deployment and Testing",
    content: `
      Finally, we'll deploy and test our 3-tier architecture:
      
      • AWS CloudFormation for infrastructure as code
      • AWS CodePipeline for CI/CD
      • Load testing and performance optimization
      
      This ensures your architecture is production-ready and scalable.
    `,
    image: "/tier3topology.png",
  },
]

export default function TutorialPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))

      const sections = tutorialSteps.map((step) => step.id)
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-background/95 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="ml-2 text-xs font-medium hidden sm:inline">Menu</span>
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDarkMode}
          className="bg-background/95 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="ml-2 text-xs font-medium hidden sm:inline">{isDarkMode ? "Light" : "Dark"}</span>
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={scrollToContact}
          className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <span className="text-xs font-medium">Contact Me</span>
        </Button>
      </div>

      <div
        className={`fixed top-16 left-4 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        <Card className="p-4 bg-background/95 backdrop-blur-sm border-border shadow-xl min-w-[280px] max-w-[320px]">
          <h2 className="text-sm font-semibold text-foreground mb-3 px-2">Tutorial Navigation</h2>
          <nav className="space-y-1">
            {tutorialSteps.map((step, index) => (
              <Button
                key={step.id}
                variant={activeSection === step.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(step.id)}
                className="w-full justify-start text-left text-xs px-3 py-2 h-auto hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                      activeSection === step.id
                        ? "bg-primary-foreground text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index === 0 ? "i" : index}
                  </div>
                  <span className="leading-tight">{step.title}</span>
                </div>
              </Button>
            ))}
          </nav>
        </Card>
      </div>

      <header className="sticky top-1 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 pl-20 sm:pl-24 pr-32 sm:pr-40">
          <div className="flex items-center justify-center">
            <div className="text-center max-w-md">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-foreground text-balance">AWS 3-Tier Architecture</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Complete Tutorial Guide</p>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-background via-background to-muted/20 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
              3-Tier Architecture
              <span className="block text-primary mt-2 !text-3xl">on Amazon Web Services(AWS)</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Learn to design and implement a robust, scalable 3-tier architecture using AWS cloud services. From
              presentation layer to data storage, master every component with hands-on examples.
            </p>
            <Image className="mx-auto" src={`${basePath}/tier3topology.png`} alt="Topology diagram" width={700} height={700} /> 
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
              Project by: Dickson Ankamah
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tutorialSteps.map((step, index) => (
          <section key={step.id} id={step.id} className="mb-12 sm:mb-16 scroll-mt-24">
            <Card className="p-6 sm:p-8 bg-card border-border">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {index === 0 ? "i" : index}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-4 text-balance">
                    {step.title}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {step.content.split("\n").map((paragraph, pIndex) => {
                      if (paragraph.trim() === "") return null
                      if (paragraph.trim().startsWith("•")) {
                        return (
                          <ul key={pIndex} className="list-disc list-inside text-muted-foreground leading-relaxed mb-4">
                            <li>{paragraph.trim().substring(1).trim()}</li>
                          </ul>
                        )
                      }
                      return (
                        <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph.trim()}
                        </p>
                      )
                    })}
                  </div>

                  {/* Placeholder for screenshot */}
                  <div className="mt-6 p-6 sm:p-8 bg-muted rounded-lg border-2 border-dashed border-border">
                    <div className="text-center text-muted-foreground">
                      <Image src={step.image} alt={step.id} width={700} height={600} />
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-background rounded-lg flex items-center justify-center text-2xl">
                        ssss
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        ))}

        <section id="contact" className="mt-16 sm:mt-24 scroll-mt-24">
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-card via-card to-muted/20 border-border shadow-xl">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <MessageCircle className="w-4 h-4 mr-2" />
                Get in Touch
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Have Questions?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                Reach out to me if you have any questions regarding the project or other reasons
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-4">
                <a
                  href="mailto:dicksonank@gmail.com"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 p-3 rounded-lg hover:bg-muted/50"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-medium">dicksonank@gmail.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/dickson-ank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 p-3 rounded-lg hover:bg-muted/50"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://wa.me/233547407384"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 p-3 rounded-lg hover:bg-muted/50"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-medium">WhatsApp</span>
                </a>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {isMenuOpen && <div className="fixed inset-0 bg-black/20 z-20" onClick={() => setIsMenuOpen(false)} />}
    </div>
  )
}
