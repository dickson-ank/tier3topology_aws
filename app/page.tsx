"use client"

import { Navigation } from "@/components/navigation"
import { ProjectSection } from "@/components/project-section"
import { ContactSection } from "@/components/contact-section"
import { ImageModal } from "@/components/image-modal"
import { Introduction } from "@/components/pagesections/Introduction"
import { Step1 } from "@/components/pagesections/step-1"
import { Step2 } from "@/components/pagesections/step-2"
import { Step3 } from "@/components/pagesections/step-3"
import { Step4 } from "@/components/pagesections/step-4"
import { useState } from "react"
import { Hero } from "@/components/pagesections/hero"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "step-1", title: "Step 1: Configuration" },
  { id: "step-2", title: "Step 2: Implementation" },
  { id: "step-3", title: "Step 3: Deployment" },
  { id: "step-4", title: "Step 4: Testing" },
  { id: "conclusion", title: "Conclusion"},
  { id: "thank-you", title: "Thank You" },
]

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation sections={sections} />
      <main className="pt-16">
        <Hero/>

          {/* Project Sections */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <Introduction setSelectedImage={setSelectedImage}/>
          <Step1 setSelectedImage={setSelectedImage}/>
          <Step2 setSelectedImage={setSelectedImage}/>
          <Step3 setSelectedImage={setSelectedImage}/>
          <Step4 setSelectedImage={setSelectedImage}/>

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
