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
              The routing part is also done in the VPC Dashboard. The purpose of routing 
              is to control the traffic flow between the subnets and the internet. <br />
            </p>
            <Paragraph>
              What we'll create: <br />
              • A Route Table for the Public Subnet with a route to an Internet Gateway to enable internet access. <br />
              • A Route Table for the Private Subnets with routes to a NAT Gateway to ensure they remain isolated from direct internet access. <br />
            </Paragraph>
            <Paragraph>Let's create the components required for the routing starting with the internet gateway<br />
              In the VPC Dashboard, choose "Internet Gateways" and click on <span className="text-primary font-semibold">Create Internet Gateway</span>.<br />
              • Name it "webapp-network-igw" implying that it's the VPC's gateway to the internet <br />and click 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create internet gateway</span>.<br />
            </Paragraph>
            <ImageContainer src="./igw-create.jpeg" alt="Internet gateway create" selectedImage={setSelectedImage} />
            <Paragraph>Select <span className="text-primary font-semibold">Attach to VPC</span> from the green pop-up and choose the VPC we created earlier ("webapp-network").</Paragraph>
            <ImageContainer src="./igw-attach.jpeg" alt="Internet gateway attach" selectedImage={setSelectedImage} />
            <Paragraph>
              Let's create a NAT Gateway in the same manner.<br /> <br />
              Before that, we need to allocate an Elastic IP address to the NAT Gateway so that it maintains a consistent public IP address.<br />
              Go to "Elastic IPs" and click on <span className="text-primary font-semibold">Allocate Elastic IP address</span>.<br />
              Let's give it a tag name "ngw-eip" and leave the rest as default.<br />
              • Click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Allocate</span> in the next screen to confirm.<br /><br />
            </Paragraph>
              <ImageContainer  src="./eip-create.jpeg" alt="Elastic IP create" selectedImage={setSelectedImage} />
            <Paragraph>
               Now, go back to the VPC Dashboard. <br />
              •Choose "NAT Gateways" from the side menu and click on <span className="text-primary font-semibold">Create NAT Gateway</span>.<br />
              • We'll name it "webapp-network-ngw" <br />
              • Choose the public subnet we created earlier ("public-subnet") from the dropdown <br />
                <span className="text-muted-foreground block font-mono text-sm mt-1 ml-4">
                A NAT Gateway must always be in a public subnet
                </span>
              • We'll choose our Elastic IP (ngw-eip) from the dropdown<br />
              • Review and click on
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create a NAT gateway</span>
            </Paragraph>
              <ImageContainer className="mt-1" src="./ngw-create.jpeg" alt="NAT Gateway create" selectedImage={setSelectedImage} />

            <Paragraph>
              Now that we have both Internet Gateway and NAT Gateway created, focus is back on the main subject of this step: <span className="text-muted-foreground font-medium">"Setting up routes"</span><br />
              So let's go to the "Route Tables", from the side menu section and click on <span className="text-primary font-semibold">Create Route Table</span>.<br />
              • We'll name it "public-rt" and associate it with the VPC we created earlier ("webapp-network"). <br />
              • Click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create route table</span> to confirm.<br />
            </Paragraph>
            <ImageContainer className="mt-1" src="./public-rt-create.jpeg" alt="Public route table create" selectedImage={setSelectedImage} />
            <Paragraph>
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
        </ProjectSection>
    )
}