"use client"

import { Navigation } from "@/components/navigation"
import { ProjectSection } from "@/components/project-section"
import { ContactSection } from "@/components/contact-section"
import { ImageModal } from "@/components/image-modal"
import { useState } from "react"


const sections = [
  { id: "step-1", title: "Step 1: Setup" },
  { id: "step-2", title: "Step 2: Configuration" },
  { id: "step-3", title: "Step 3: Implementation" },
  { id: "step-4", title: "Step 4: Deployment" },
  { id: "step-5", title: "Step 5: Testing" },
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              AWS Serverless Architecture Guide
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              A comprehensive step-by-step guide to provisioning and deploying a serverless architecture on AWS. Follow
              along with detailed instructions and screenshots.
            </p>
            <div className="px-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("https://github.com/yourusername/aws-serverless-guide", "_blank")}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                View CloudFormation Code 
              </button>
            </div>
          </div>
        </section>

        {/* Project Sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <ProjectSection id="step-1" title="Introduction: Initial Setup & Prerequisites" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Before we begin provisioning our serverless architecture, we need to set up our development environment
              and ensure we have all the necessary prerequisites in place.
            </p>

            <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border mb-6">
              <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Prerequisites Checklist</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• AWS Account with appropriate permissions</li>
                <li>• AWS CLI installed and configured</li>
                <li>• Node.js 18+ for Lambda functions</li>
                <li>• Terraform or AWS CDK (optional but recommended)</li>
                <li>• Code editor with AWS extensions</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-1 mb-6">
              <img
                src={"./net-topology.png" }
                alt={"AWS Console Setup"}
                className={"w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"}
                // width={977}
                // height={414}
                onClick={() => setSelectedImage("./net-topology.png")}
              />
            </div>

            <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="text-muted-foreground mb-1"># Configure AWS CLI</div>
              <div className="whitespace-nowrap">aws configure</div>
              <div className="mt-2 text-muted-foreground"># Verify configuration</div>
              <div>aws sts get-caller-identity</div>
            </div>
          </ProjectSection>

          <ProjectSection id="step-2" title="Step 2: Create Lambda Functions" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Now we'll create our Lambda functions that will handle the core business logic of our serverless
              application. We'll start with a simple API handler and then add more complex functions.
            </p>

            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Creating Your First Lambda</h3>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <div className="text-muted-foreground mb-2">// lambda/handler.js</div>
                  <div>exports.handler = async (event) =&gt; {"{"}</div>
                  <div className="ml-4">return {"{"}</div>
                  <div className="ml-8">statusCode: 200,</div>
                  <div className="ml-8">body: JSON.stringify('Hello from Lambda!')</div>
                  <div className="ml-4">{"}"}</div>
                  <div>{"}"}</div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-1">
                <img
                  src="./feature-one-interfac.jpg"
                  alt="Lambda Function Creation"
                  className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage("./feature-one-interfac.jpg")}
                />
              </div>
            </div>
          </ProjectSection>

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

            <div className="bg-card border border-border rounded-lg p-1">
              <img
                src="./feature-two-dashboad.jpg"
                alt="API Gateway Configuration"
                className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage("./feature-two-dashoard.jpg")}
              />
            </div>
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
                <div className="bg-card border border-border rounded-lg p-1">
                  <img
                    src="./feature-three-analtics.jpg"
                    alt="DynamoDB Setup"
                    className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("./feature-tree-analytics.jpg")}
                  />
                </div>
                <div className="bg-card border border-border rounded-lg p-1">
                  <img
                    src="./terminal-installation-rocess.jpg"
                    alt="S3 Configuration"
                    className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("./terminal-insallation-process.jpg")}
                  />
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-card border border-border rounded-lg p-1">
                  <img
                    src="./usage-xample-before.jpg"
                    alt="Before Deployment"
                    className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("./usage-exmple-before.jpg")}
                  />
                </div>
                <div className="bg-card border border-border rounded-lg p-1">
                  <img
                    src="./usage-exampe-after.jpg"
                    alt="After Deployment"
                    className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("./usage-exampe-after.jpg")}
                  />
                </div>
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
        </div>

        <ContactSection />
      </main>

      <ImageModal
        src={selectedImage || "/placeholder.svg"}
        alt="Expanded view"
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
}
