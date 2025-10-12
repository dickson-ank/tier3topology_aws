import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";

interface IntroductionProps {
    setSelectedImage: (src: string) => void
}

export function Introduction({setSelectedImage}: IntroductionProps){
    return(
        
        <ProjectSection id="introduction" title="Introduction: Initial Setup & Prerequisites" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                A 3-tier architecture is a proven software design model that separates an application into three distinct layers;
                presentation, application, and data. This separation improves scalability, security, and maintainability.
                In this guide, we'll walk through the process of deploying a 3-tier web application architecture on AWS, step by step.
            </p>
            <Paragraph>
                <span className="text-primary">The Presentation Tier: <br /></span>
                 <span className="block ml-4 text-sm sm:text-xs md:text-sm lg:text-sm">
                    -The user-facing side of the application, containing web servers which receives and responds to incoming requests <br />
                </span>
                <span className="text-primary">The Application Tier: <br /></span>
                 <span className="block ml-4 text-sm sm:text-xs md:text-sm lg:text-sm">
                    -The section where the backend/application logic resides. 
                </span>
                <span className="text-primary">Data Tier: <br /></span>
                 <span className="block ml-4 text-sm sm:text-xs md:text-sm lg:text-sm">
                    -Hosts and manages the application data. Often where the databases are stored. <br />
                </span>

            </Paragraph>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                A three tier architecture obeys the principle of lose coupling
                in that it makes it easy to detach/substitute resources for new ones without
                needing to redesign the whole architecture.
                <br />
                A web application designed in this manner is Scalable, Reliable, Resilient and Secure.

            </p>
            <Paragraph>
                Here's the architecture we're going to develop
            </Paragraph>
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
        </ProjectSection>
    )
}