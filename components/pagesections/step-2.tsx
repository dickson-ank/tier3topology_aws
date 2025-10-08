import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";

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
              • Click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Allocate</span><br /><br />
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
              • We will be redirected to the dashboard of the just created route table<br />
              There, select the "Routes" tab. Click on <span className="text-primary font-semibold">Edit routes</span> and then <span className="text-primary font-semibold">Add route</span>. <br />
              • Set the destination to <span className="font-mono text-primary">0.0.0.0/0</span> and the target to the Internet Gateway we created earlier("webapp-network-igw")<br />
              • Click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Save changes</span> to apply the changes.
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


            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 2 - (Routing)</h3>
                <p className="text:xs text-muted-foreground md:text:xs lg:text-xs mb-2">The part of the Cloudformation code that creates the IGW, NAT Gateway and Route Tables as discussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 to make it work, and ensure the indentations are correct
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <ReadMore>
                    <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                      {`# Resources: ...

# VPC and Subnets section  

#######################
# Routing section
#######################

  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: webapp-network-igw

  GatewayToInternet:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref InternetGateway

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: public-rt

  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: GatewayToInternet
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway

  PublicSubnetRouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnet
      RouteTableId: !Ref PublicRouteTable

  ElasticIP:
    Type: AWS::EC2::EIP
    Properties:
      Domain: vpc
      Tags:
        - Key: Name
          Value: ngw-eip

  NATGateway:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt ElasticIP.AllocationId
      SubnetId: !Ref PublicSubnet
      Tags:
        - Key: Name
          Value: webapp-network-ngw

  PrivateRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: private-rt

  PrivateRouteToNAT:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NATGateway
  
  PrivateSubnetRouteTableAssociation1:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PrivateSubnet1
      RouteTableId: !Ref PrivateRouteTable

  PrivateSubnetRouteTableAssociation2:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PrivateSubnet2
      RouteTableId: !Ref PrivateRouteTable

  PrivateSubnetRouteTableAssociation3:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PrivateSubnet3
      RouteTableId: !Ref PrivateRouteTable
              `}
              </SyntaxHighlighter>
            </ReadMore>
                  </div>
              </div>
            </div>
        </ProjectSection>
    )
}