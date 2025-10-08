import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";

interface Step3Props {
    setSelectedImage: (src: string) => void
}

export function Step3({setSelectedImage}: Step3Props){
    return(
        <ProjectSection id="step-3" title="Step 3: Security Groups" onImageClick={setSelectedImage}>
            <Paragraph>
              In this step we will set up Security Groups to control access to our AWS resources.
              Security Groups act as virtual firewalls that regulate inbound and outbound traffic. 
               We will create rules to allow only necessary traffic, enhancing the security of our application.
            </Paragraph>
            <Paragraph>
              What we'll create:
              • A Security Group for Bastion Host to allow SSH access from our IP.<br />
              • A Security Group for the Web Server to allow inbound HTTP/HTTPS traffic<br />
              • A Security Group for the App Server to allow traffic only from the Web Server and Bastion Host Security Groups<br />
              • A Security Group for the Database to allow traffic only from the App Server Security and Bastion Host Security Groups<br />
            </Paragraph>
            <ImageContainer  src="./draw.io.securitygroups.png" alt="" selectedImage={setSelectedImage} />

            <Paragraph>
              We'll create the Bastion Host Security Group first. <br />
              • Go to Security in the VPC Dashboard. <br />
              • Choose "Security Groups" and click on <span className="text-primary font-semibold">Create Security Group</span>.<br />
              • We'll name it "BastionHostSG" <br />
              • Add a description (optional) <br />
              • Choose the VPC we created earlier ("webapp-vpc") from the dropdown <br />
            </Paragraph>

            <Paragraph>
              For Inbound rules:<br />
              • Add a rule for SSH access<br />
              • Choose "SSH" from the dropdown <br />
              • Set the Source to "My IP" and it will auto-fill your current IP address<br />
              • Review and click
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Create security group</span>
            </Paragraph>
            <ImageContainer  src="./bastionhostSG-create.jpeg" alt="Bastion Host SG screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
              We'll create the Web Server Security Group next. <br />
              • We'll name it "WebServerSG" <br />
              • Add 3 inbound rules:<br />
              • HTTP - Source: Anywhere IPv4<span className="font-mono text-primary"> (0.0.0.0/0) </span><br />
              • HTTPS - Source: Anywhere IPv4 <span className="font-mono text-primary"> (0.0.0.0/0)  </span><br />
              • SSH - Source: "My IP" (for management purposes) <br />
              • We should add ICMP rule from App Server SG but we 
              haven't created it yet so we'll come back and add it later<br />
              • Review and create the security group<br />
            </Paragraph>
            <ImageContainer  src="./webserverSG-create.jpeg" alt="Web Server SG screenshot" selectedImage={setSelectedImage} />
            <ImageContainer  src="./webserverSG-create2.jpeg" alt="Web Server SG screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              Next, we'll create the App Server Security Group. <br />
              • We'll name it "AppServerSG" <br />
              • Add 3 inbound rules:<br />
              • SSH - Source: Custom - "BastionHostSG" (search "sg" and select BastionHostSG from the dropdown) <br />
              • HTTP - Source: Custom - "WebServerSG" (search "sg" and select WebServerSG from the dropdown) <br />
              • ICMP - Source: Custom - "WebServerSG"<br />
              • We can ingnore https and use only http between web and app server for simplicity <br />
              • We should add MySQL/Aurora rule from Database SG but we 
              haven't created it yet so we'll come back and add it later<br /><br />
              • Review and create the security group<br />
            </Paragraph>
            <ImageContainer  src="./appserverSG-create.jpeg" alt="App Server SG screenshot" selectedImage={setSelectedImage} />
            <ImageContainer  src="./appserverSG-create2.jpeg" alt="App Server SG screenshot" selectedImage={setSelectedImage} />          
            
            
            
            
            
            
            
            
            
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
              </div>
          
        </ProjectSection>
    )
}