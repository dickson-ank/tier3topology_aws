import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";
import { Paragraph } from "../paragraph";
import ReadMore from "../read-more-less";

interface Step1Props {
    setSelectedImage: (src: string) => void
}

export function Step1({setSelectedImage}: Step1Props){
    return(
        <ProjectSection id="step-1" title="Step 1: Creating VPC and Subnets" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              We'll begin by creating our VPC and subnets to isolate our application resources, 
               a crucial step in setting up a highly available and resilient architecture. <br/>
                <br />
                • In the Management Console search for VPC and open the VPC Dashboard. <br/>
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
              • Let's name it "public-subnet" since it's the only public subnet <br />
              • Set the Availability Zone to your preference (e.g., us-east-1a) and note it somewhere<br />
              • Set the IPv4 CIDR block to <span className="font-mono text-primary">10.0.1.0/24</span> <br />
              • Review and click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create Subnet</span> <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./create-subnet1.jpeg" alt="Subnet create screenshot" selectedImage={setSelectedImage} />
            <ImageContainer className="mt-1"src="./create-subnet2.jpeg" alt="Subnet create screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
              Repeat the process to create the three private subnets <br />
              <br />
              • We'll name them "private-subnet-1", "private-subnet-2", and "private-subnet-3" respectively <br />
              <span className="ml-4 mb-1 block">or go for any naming format that works for you</span>
              • Put the first 2 private subnets in same Availability Zone as the public subnet <br />
                <span className="block ml-4">and then put the last subnet in a different Availability Zone <br />
                refer to the image for clarity <a href="#vpc-subnet-base" className="text-primary font-medium">here</a> and set their CIDRs as shown </span><br />
            </Paragraph>
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 1 - (VPC and Subnets)</h3>
                <p className="text:xm text-muted-foreground md:text:xs lg:text-xs mb-2">The part of the Cloudformation code that creates the vpc and subnets as discussed above
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                <ReadMore>
                <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                  {`AWSTemplateFormatVersion: "2010-09-09"
                    
Description: >-
  This template creates a 3 tier web application infrastructure on AWS.
  It includes a VPC with public and private subnets across two availability zones,
  along with necessary routing, NAT gateways, and network ACLs.

Parameters:
  VPCName:
    Description: The name of the VPC being created.
    Type: String
    Default: webapp-network
  MyIP:
    Description: Enter your IP address with /32 suffix or leave it at default (e.g., 201.16.145.100/32)
    Type: String
    Default: 0.0.0.0/0
  
  AL2023AMI:
    Type: AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>
    Default: /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64

Mappings:
  SubnetConfig:
    VPC:
      CIDR: 10.0.0.0/16
    Public:
      CIDR: 10.0.1.0/24
    Private1:
      CIDR: 10.0.2.0/24
    Private2:
      CIDR: 10.0.3.0/24
    Private3:
      CIDR: 10.0.4.0/24
  
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      EnableDnsSupport: "true"
      EnableDnsHostnames: "true"
      CidrBlock: !FindInMap
        - SubnetConfig
        - VPC
        - CIDR
      Tags:
        - Key: Name
          Value: !Ref VPCName

  PublicSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select
        - 0
        - !GetAZs
      CidrBlock: !FindInMap
        - SubnetConfig
        - Public
        - CIDR
      Tags:
        - Key: Name
          Value: public-subnet

  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select
        - 0
        - !GetAZs
      CidrBlock: !FindInMap
        - SubnetConfig
        - Private1
        - CIDR
      Tags:
        - Key: Name
          Value: private-subnet-1

  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select
        - 0
        - !GetAZs
      CidrBlock: !FindInMap
        - SubnetConfig
        - Private2
        - CIDR
      Tags:
        - Key: Name
          Value: private-subnet-2

  PrivateSubnet3:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select
        - 1
        - !GetAZs
      CidrBlock: !FindInMap
        - SubnetConfig
        - Private3
        - CIDR
      Tags:
        - Key: Name
          Value: private-subnet-3

                    `}
                   </SyntaxHighlighter>
                  </ReadMore>
                </div>
              </div>
            </div>
          </ProjectSection>
    )
}