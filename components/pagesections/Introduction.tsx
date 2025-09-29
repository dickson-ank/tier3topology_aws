import { useState } from "react";
import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";



export function Introduction(){
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    return(
        <>
            <ProjectSection id="introduction" title="Introduction: Initial Setup & Prerequisites" onImageClick={setSelectedImage}>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                    A 3-tier architecture is a well-established software application architecture that orgainizes application into 
                    three logical and physical computing tiers: the presentation tier, application tier, and data tier <br/> 
                    This guide will walk you through setting up a 3-tier web application on AWS.
                </p>
                <ImageContainer src="./tier3topology.svg" alt="Topology Diagram" selectedImage={setSelectedImage}>
                    <div className="text-center p-1 rounded text-xs sm:text-sm text-muted-foreground mt-1">
                    Topology Diagram
                    </div>
                </ImageContainer>

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

                <ImageContainer src="./placeholder.svg" alt="Container setup" selectedImage={setSelectedImage} />

                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <div className="text-muted-foreground mb-1"># Configure AWS CLI</div>
                    <div className="whitespace-nowrap">aws configure</div>
                    <div className="mt-2 text-muted-foreground"># Verify configuration</div>
                    <div>aws sts get-caller-identity</div>
                </div>
            </ProjectSection>
        </>
    )
}