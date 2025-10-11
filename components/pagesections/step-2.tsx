import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";
import Note from "../note";

interface Step2Props {
    setSelectedImage: (src: string) => void
}

export function Step2({setSelectedImage}: Step2Props){
    return(
        <ProjectSection id="step-2" title="Step 2: Routing" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              While still in the VPC Dashboard we'll configure route tables for the subnets. The purpose of routing 
              is to control the traffic flow between the subnets and the internet. <br />
            </p>
            <Paragraph>
              What we'll create: <br />
              • A Route Table for the Public Subnet with a route to an Internet Gateway to enable internet access. <br />
              • A Route Table for the Private Subnets with routes to a NAT Gateway to ensure they remain isolated from direct internet access. <br />
            </Paragraph>

            <Paragraph>
              Let's create the components required for the routing, starting with Internet Gateway<br />
              Choose "Internet gateways" from the sidebar and click on 
              <span className="text-primary font-semibold"> Create Internet Gateway</span>.<br />
              • Name it "webapp-network-igw" implying that it's the VPC's gateway to the internet <br />
              and 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Create internet gateway
              </span>.<br />
            </Paragraph>
            <ImageContainer src="./igw-create.jpeg" alt="Internet gateway create" selectedImage={setSelectedImage} />

            <Paragraph>Select <span className="text-primary font-semibold">Attach to VPC</span>
             from the green pop-up and select the VPC ("webapp-network").
             </Paragraph>
            <ImageContainer src="./igw-attach.jpeg" alt="Internet gateway attach" selectedImage={setSelectedImage} />

            <Paragraph>
              Let's create a NAT Gateway in the same manner.<br /> <br />
              Before that, we need to allocate an Elastic IP address to the NAT Gateway so 
              that it maintains a consistent public IP address.<br />
              Go to "Elastic IPs" and click on 
              <span className="text-primary font-semibold"> Allocate Elastic IP address</span>.<br />
              Let's give it a tag name "ngw-eip" and leave the rest as default.<br />
              • Then, 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Allocate
              </span><br /><br />
            </Paragraph>
            <ImageContainer  src="./eip-create.jpeg" alt="Elastic IP create" selectedImage={setSelectedImage} />
            
            <Paragraph>
              Now go to "NAT Gateways" and hit 
              <span className="text-primary font-semibold"> Create NAT Gateway</span>.<br /> 
              • We'll name it "webapp-network-ngw" <br />
              • Choose the public subnet we created earlier ("public-subnet") from the dropdown <br />
                <span className="text-muted-foreground block text-sm mt-1 ml-4">
                A NAT Gateway must always be in a public subnet
                </span>
              • Choose the Elastic IP (ngw-eip) from the dropdown<br />
              • Review and 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Create a NAT gateway
              </span>
            </Paragraph>
            <ImageContainer className="mt-1" src="./ngw-create.jpeg" alt="NAT Gateway create" selectedImage={setSelectedImage} />

            <Paragraph>
              Now that we have both Internet Gateway and NAT Gateway created, we can focus on the subject of this step:
              <span className="text-muted-foreground font-medium"> "Routing"</span><br />
              So let's go to the "Route Tables", from the side menu section to 
              <span className="text-primary font-semibold"> Create Route Table.</span><br />
              • We'll name it "public-rt" and associate it with the VPC ("webapp-network"). <br />
              • Click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create route table</span>
               to confirm.<br />
            </Paragraph>
            <ImageContainer className="mt-1" src="./public-rt-create.jpeg" alt="Public route table create" selectedImage={setSelectedImage} />

            <Paragraph>
              You'll be redirected to the dashboard of the just created route table<br />
              There, select the "Routes" tab. Click on <span className="text-primary font-semibold"> Edit routes </span>
               and then <span className="text-primary font-semibold"> Add route</span>. <br />
              • Set the destination to <span className="font-mono text-primary">0.0.0.0/0</span> and the target to the Internet Gateway("webapp-network-igw")<br />
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Save changes</span> to apply the changes.
            </Paragraph>
            <ImageContainer className="mt-1" src="./public-rt-route.jpeg" alt="Public route table route" selectedImage={setSelectedImage} />

            <Paragraph>
              • Next, we need to associate this route table with the public subnet so that it can use this route table for its routing needs.<br />
              • Select the "Subnet associations" tab and click on <span className="text-primary font-semibold">Edit subnet associations</span>.<br />
              • Select the public subnet ("public-subnet") and click on <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Save associations</span> to confirm.
            </Paragraph>
            <ImageContainer className="mt-1" src="./public-rt-assoc.jpeg" alt="Public route table association" selectedImage={setSelectedImage} />

            <Paragraph>
              Repeat the process to create a route table for the private subnets.<br />
              • We'll name it "private-rt" and associate it with the VPC we created earlier ("webapp-network"). <br />
              • In the "Routes" tab, add a route with destination <span className="font-mono text-primary">0.0.0.0/0 </span> 
              and target the NAT Gateway we created earlier ("webapp-network-ngw"). <br />
              • In the "Subnet associations" tab, associate all three private subnets 
              ("private-subnet-1", "private-subnet-2", and "private-subnet-3") with this route table.<br />
            </Paragraph>
            <ImageContainer className="mt-1" src="./private-rt-route.jpeg" alt="Private route table route" selectedImage={setSelectedImage} />
            <ImageContainer className="mt-1" src="./private-rt-assoc.jpeg" alt="Private route table association" selectedImage={setSelectedImage} />

            <Paragraph>
              If everything is done correctly the VPC resource map should look like this. <br />
              The additional route table was created by default by the lab environment I used. It doesn't affect anything
            </Paragraph>
            <ImageContainer className="mt-1" src="./vpc-resource-map.jpeg" alt="VPC resource map" selectedImage={setSelectedImage} />







            <Note grid={true} 
              note1={
                    <>- A NAT Gateway must always be in a public subnet <br />
                - Private subnets should not have a direct route to the Internet Gateway <br />
                - Ensure that the route tables are correctly associated with their respective subnets <br />
                - Double-check the CIDR blocks to avoid overlaps and ensure proper segmentation <br /></>
                }
              
              note2={
              <>- Connect your API Gateway endpoints to the Lambda functions we created in the previous step.</>
            }
            />


            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 2 - (Routing)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates the IGW, 
                  NAT Gateway and Route Tables as discussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 to make it work, and ensure the indentations are correct
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <ReadMore>
                    <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                      {`# Resources: ...

# VPC and Subnets section  
#    ....


# Routing section

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