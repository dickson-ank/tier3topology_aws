import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";

interface Step2Props {
    setSelectedImage: (src: string) => void
}

export function Step2({setSelectedImage}: Step2Props){
    return(
        <ProjectSection id="step-2" title="Step 2: Routing" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              The routing part is also done in the VPC Dashboard. <br />
              We will create a route table for the public subnet to enable internet access <br />
              and another for the private subnets to ensure they remain isolated from direct internet access. <br />
            </p>
            <Paragraph>
              What we'll create: <br />
              • A Route Table for the Public Subnet with a route to an Internet Gateway. <br />
              • A Route Table for the Private Subnets with routes to a NAT Gateway. <br />
            </Paragraph>
            <Paragraph>Let's create the internet gateways<br />
              In the VPC Dashboard, choose "Internet Gateways" and click on <span className="text-primary font-semibold">Create Internet Gateway</span>.<br />
              • Name it "webapp-network-igw" implying that it's the VPC's gateway to the internet and click 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create internet gateway</span>.<br />
            </Paragraph>
            <Paragraph>Select <span className="text-primary font-semibold">Attach to VPC</span> from the green pop-up and choose the VPC we created earlier ("webapp-network").</Paragraph>
            <ImageContainer src="./igw-attach.png" alt="Internet gateway attach" selectedImage={setSelectedImage} />
            <ImageContainer src="./igw-attach.png" alt="Internet gateway attach" selectedImage={setSelectedImage} />
            
            <Paragraph>
              We have both internet
              Go back to the side menu, navigate to the "Route Tables" section and click on <span className="text-primary font-semibold">Create Route Table</span>.<br />
              • We'll name it "public-rt" and associate it with the VPC we created earlier ("webapp-network"). <br />
              • After creating the route table, select it and go to the "Routes" tab. Click on <span className="text-primary font-semibold">Edit routes</span> and then <span className="text-primary font-semibold">Add route</span>. <br />
              • Set the destination to <span className="font-mono text-primary">0.0.0.0/0</span> and the target to the Internet Gateway you created earlier. <br />
              • Click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Save routes</span> to apply the changes.
            </Paragraph>
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
    )
}