import { useState } from "react";
import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";

interface Step3Props {
    setSelectedImage: (src: string) => void
}

export function Step3({setSelectedImage}: Step3Props){
    return(
        <ProjectSection id="step-3" title="Step 3: Configure Database & Storage" onImageClick={setSelectedImage}>
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
    )
}