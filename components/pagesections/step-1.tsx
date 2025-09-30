import { useState } from "react";
import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";

interface Step1Props {
    setSelectedImage: (src: string) => void
}

export function Step1({setSelectedImage}: Step1Props){
    return(
        <ProjectSection id="step-1" title="Step 1: Create Lambda Functions" onImageClick={setSelectedImage}>
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

              <ImageContainer src="./placeholder.svg" alt="Lambda function creation" selectedImage={setSelectedImage} />

            </div>
          </ProjectSection>
    )
}