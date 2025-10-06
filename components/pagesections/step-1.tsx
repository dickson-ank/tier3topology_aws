import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";
import { Paragraph } from "../paragraph";

interface Step1Props {
    setSelectedImage: (src: string) => void
}

export function Step1({setSelectedImage}: Step1Props){
    return(
        <ProjectSection id="step-1" title="Step 1: Creating VPC and Subnets" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              We'll create our VPC and subnets to isolate our application resources.
               This is a crucial step in setting up a secure and scalable architecture. <br/>
                <br />
                • Search for VPC in the AWS Management Console and open the VPC Dashboard. <br/>
                • Click on <span className="text-primary font-semibold">Create VPC</span>. <br/>
                • Choose "VPC only" and provide a name ("webapp-network" in my case). <br/>
                • Set the IPv4 CIDR block to <span className="font-mono text-primary">10.0.0.0/16</span><br/>
                • Review and Click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create VPC</span><br/>
            </p>
            <ImageContainer className="mb-1"src="./vpc-create.png" alt="Container setup" selectedImage={setSelectedImage} />
            <ImageContainer className="mt-1"src="./vpc-create2.png" alt="Container setup" selectedImage={setSelectedImage} />
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Next we will create our subnets. One each for presentation Tier and Application Tier, <br />
              and Two for the data tier for extra security and high availability. <br />
              as shown in the image below. <br />
            </p>
            <ImageContainer id="vpc-subnet-base" className="mt-1"src="./draw.io.vpc-subnet-base.png" alt="Container setup" selectedImage={setSelectedImage} />
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Expand the VPC Dashboard menu if closed and select Subnets
            </p>
            <Paragraph>
              In the Subnets section, click on <span className="text-primary font-semibold">Create Subnet</span><br />
              Choose the VPC you created earlier ("webapp-network"). <br />
              • We will create the Public Subnet first <br />
              <span className="font-mono ml-4 mb-1 block">Note that when you provision the resources using the
                cloudformation template the vpc name will prepend the subnet names.</span>
              to avoid confusion as you follow along, we will omit that here
              • Name it "public-subnet" since it's the only public subnet <br />
              • Set the Availability Zone to your preference (e.g., us-east-1a) and note it somewhere<br />
              • Set the IPv4 CIDR block to <span className="font-mono text-primary">10.0.1.0/24</span> <br />
              • Review and click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create Subnet</span> <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./create-subnet1.jpeg" alt="Subnet create screenshot" selectedImage={setSelectedImage} />
            <ImageContainer className="mt-1"src="./create-subnet2.jpeg" alt="Subnet create screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
              Repeat the process to create the three private subnets <br />
              • Name them "private-subnet-1", "private-subnet-2", and "private-subnet-3" respectively <br />
              • Put the first 2 private subnets in same Availability Zone as the public subnet <br />
                and put the last subnet in a different Availability Zone <br />
                refer the image <a href="vpc-subnet-base">here</a> and set their CIDRs as shown <br />
            </Paragraph>
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
            </div>
          </ProjectSection>
    )
}