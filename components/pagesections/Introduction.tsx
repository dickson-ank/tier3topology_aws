import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";

interface IntroductionProps {
    setSelectedImage: (src: string) => void
}

export function Introduction({setSelectedImage}: IntroductionProps){
    return(
        
        <ProjectSection id="introduction" title="Introduction: Initial Setup & Prerequisites" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                A 3-tier architecture is a proven software design model that separates an application into three distinct layers; <br />
                presentation, application, and data. This separation improves scalability, security, and maintainability.
                In this guide, you’ll learn how to deploy a 3-tier web application architecture on AWS, step by step.
            </p>
            <ImageContainer src="./tier3topology.png" alt="Topology Diagram" selectedImage={setSelectedImage}>
                <div className="text-center p-1 rounded text-xs sm:text-sm text-muted-foreground mt-1">
                Topology Diagram
                </div>
            </ImageContainer>
            <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border mb-6">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Prerequisites</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• AWS Account with appropriate IAM users and permissions</li>
                <li>• Familiarity with AWS Management Console</li>
                <li>• A Command Line Interface (CLI) tool</li>
                <p className="text-xs text-muted-foreground mt-1 pl-4">I will use a wsl terminal in this guide</p>
                <li>• Familiarity with Linux Commands</li>
                <li>• Familiarity with AWS CloudFormation (optional but recommended)</li>
                </ul>
            </div>
            {/* <ImageContainer src="./placeholder.svg" alt="Container setup" selectedImage={setSelectedImage} />

            <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                <div className="text-muted-foreground mb-1"># Configure AWS CLI</div>
                <div className="whitespace-nowrap">aws configure</div>
                <div className="mt-2 text-muted-foreground"># Verify configuration</div>
                <div>aws sts get-caller-identity</div>
            </div> */}
        </ProjectSection>
    )
}