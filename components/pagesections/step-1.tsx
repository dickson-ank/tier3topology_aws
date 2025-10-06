import { useState } from "react";
import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";

interface Step1Props {
    setSelectedImage: (src: string) => void
}

export function Step1({setSelectedImage}: Step1Props){
    return(
        <ProjectSection id="step-1" title="Step 1: Creating the VPC and Subnets" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              We'll create our VPC and subnets to isolate our application resources.
               This is a crucial step in setting up a secure and scalable architecture. <br/>
                <br />
                1. Search for VPC in the AWS Management Console and open the VPC Dashboard. <br/>
                2. Click on "Create VPC". <br/>
                3. Choose "VPC only" and provide a name ("webapp-network" in my case). <br/>
                4. Set the IPv4 CIDR block to "10.0.0.0/16". <br/>
                5. Review and Click "Create VPC". <br/>
            </p>
            <ImageContainer className="mb-1"src="./vpc-create.png" alt="Container setup" selectedImage={setSelectedImage} />
            <ImageContainer className="mt-1"src="./vpc-create2.png" alt="Container setup" selectedImage={setSelectedImage} />
          
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Next we will create our subnets. One for presentation Tier, One for Application Tier and 
              Two for the data tier for extra security and high availability. <br />
            </p>
            <ImageContainer className="!mt-1"src="./draw.io.vpc-subnet-base.png" alt="Container setup" selectedImage={setSelectedImage} />

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