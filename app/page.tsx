"use client"

import { Navigation } from "@/components/navigation"
import { ProjectSection } from "@/components/project-section"
import { ContactSection } from "@/components/contact-section"
import { ImageModal } from "@/components/image-modal"
import { useState } from "react"
import { Introduction } from "@/components/pagesections/Introduction"
import { Step1 } from "@/components/pagesections/step-1"
import { Step2 } from "@/components/pagesections/step-2"
import { Step3 } from "@/components/pagesections/step-3"
import { Step4 } from "@/components/pagesections/step-4"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "step-1", title: "Step 1: Configuration" },
  { id: "step-2", title: "Step 2: Implementation" },
  { id: "step-3", title: "Step 3: Deployment" },
  { id: "step-4", title: "Step 4: Testing" },
  { id: "thank-you", title: "Thank You" },
]

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation sections={sections} />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="gradient-bg py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
              Build A 3-Tier Web Application on AWS
            </h1>
            <p className="text-sm sm:text-lg text-primary mb-10 text-pretty max-w-2xl mx-auto">
              Learn to design a robust, scalable web application using AWS services like EC2, RDS, etc. This step-by-step guide
            </p>
            <p className="text-left text-xs sm:text-sm text-muted-hero mb-8 text-pretty max-w-2xl mx-auto">
              This project was developed within a lab environment that automatically terminates 
              all resources when lab timer lapses. To ensure continuity,
               I created an Infrastructure as Code (IaC) solution using CloudFormation. 
               This allowed me to quickly redeploy the entire stack, allowing me to pick up right where
                I left off without any manual reconfiguration after the lab resets.
            </p>
            
            <div className="px-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("https://github.com/dickson-ank/tier3topology_aws/blob/main/Cloudformation/tier3.yml", "_blank")}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                View CloudFormation Code
              </button>
            </div>
          </div>
        </section>

        {/* Project Sections */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <Introduction />
          <Step1/>
          <Step2/>
          <Step3/>
          <Step4/>

          {/* Thank you section */}
          <ProjectSection id="thank-you" title="Thank You">
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
             Thank you for following this guide on building a 3-tier web application on AWS. I hope you found it informative and helpful.
             If you have any questions or need further assistance, feel free to reach out!
            </p>
          </ProjectSection>
        </div>

        <ContactSection />
      </main>

      <ImageModal
        src={selectedImage || "./placeholder.svg"}
        alt="Expanded view"
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
}
