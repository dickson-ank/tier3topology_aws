"use client"

import { Navigation } from "@/components/navigation"
import { ProjectSection } from "@/components/project-section"
import { ContactSection } from "@/components/contact-section"
import { ImageContainer } from "@/components/custom-image-container"
import { ImageModal } from "@/components/image-modal"
import { useState } from "react"
import { Introduction } from "@/components/pagesections/Introduction"

const sections = [
  { id: "step-1", title: "Step 1: Setup" },
  { id: "step-2", title: "Step 2: Configuration" },
  { id: "step-3", title: "Step 3: Implementation" },
  { id: "step-4", title: "Step 4: Deployment" },
  { id: "step-5", title: "Step 5: Testing" },
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

          

          <ProjectSection id="step-3" title="Step 3: Set Up API Gateway" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Configure API Gateway to create RESTful endpoints that will trigger our Lambda functions. This step
              involves setting up routes, methods, and integration with our Lambda functions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">REST API Setup</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
                  Create a new REST API in API Gateway and configure the necessary resources and methods.
                </p>
              </div>
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">Lambda Integration</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
                  Connect your API Gateway endpoints to the Lambda functions we created in the previous step.
                </p>
              </div>
            </div>

            <ImageContainer src="./placeholder.svg" alt="Lambda function creation" selectedImage={setSelectedImage} />

          </ProjectSection>

          <ProjectSection id="step-4" title="Step 4: Configure Database & Storage" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Set up DynamoDB for our NoSQL database needs and configure S3 buckets for file storage. This step ensures
              our serverless application has persistent data storage.
            </p>

            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">DynamoDB Table Creation</h3>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <div className="text-muted-foreground mb-1"># Create DynamoDB table</div>
                  <div className="whitespace-nowrap">aws dynamodb create-table \</div>
                  <div className="ml-4">--table-name UserData \</div>
                  <div className="ml-4">--attribute-definitions AttributeName=userId,AttributeType=S \</div>
                  <div className="ml-4">--key-schema AttributeName=userId,KeyType=HASH</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <ImageContainer src="./placeholder.svg" alt="Dynamo DB" selectedImage={setSelectedImage} />
                <ImageContainer src="./placeholder.svg" alt="S3 configuration" selectedImage={setSelectedImage} />
              </div>
            </div>
          </ProjectSection>

          <ProjectSection id="step-5" title="Step 5: Deploy & Test Your Architecture" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              The final step involves deploying our serverless architecture and running comprehensive tests to ensure
              everything works as expected. We'll also set up monitoring and logging.
            </p>

            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Deployment Commands</h3>
                <div className="space-y-4">
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># Deploy Lambda function</div>
                    <div>
                      aws lambda update-function-code --function-name myFunction --zip-file fileb://function.zip
                    </div>
                  </div>
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># Deploy API Gateway</div>
                    <div>aws apigateway create-deployment --rest-api-id abc123 --stage-name prod</div>
                  </div>
                </div>
              </div>

              {/* Before and after, placing images side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <ImageContainer src="./placeholder.svg" alt="Before Deployment" selectedImage={setSelectedImage} />
                <ImageContainer src="./placeholder.svg" alt="After-deployment" selectedImage={setSelectedImage} />
              </div>

              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Testing Your Deployment</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty mb-4">
                  Use these commands to test your deployed serverless architecture and verify all components are working
                  correctly.
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                  <div className="text-muted-foreground mb-1"># Test API endpoint</div>
                  <div>curl -X GET https://your-api-id.execute-api.region.amazonaws.com/prod/hello</div>
                </div>
              </div>
            </div>
          </ProjectSection>

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
