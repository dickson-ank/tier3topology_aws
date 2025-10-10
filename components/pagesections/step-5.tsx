import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import Note from "../note";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";

interface Step5Props {
    setSelectedImage: (src: string) => void
}

export function Step5({setSelectedImage}: Step5Props){
    return(
        <ProjectSection id="step-5" title="Step 5: Database" onImageClick={setSelectedImage}>
            <Paragraph>
              In this section we are going to create an RDS Database. <br />
              • A database is essential for storing and managing the data that our application will use. <br />
              • The App server will connect to this database to perform various operations such as reading,
               writing, and updating data. <br />
              • as well the Bastion host for management purposes as configured in the Security Groups step <br />
            </Paragraph>
            

            <Paragraph>
              Go to the RDS/Aurora Dashboard <br />
              • Create first a Subnet Group for the database <br />
              • Click on Subnet groups in the left sidebar <br />
              • Click on <span className="text-primary font-semibold">Create DB Subnet Group</span> <br />
              • We'll name it "database-subnet-group" <br />
              • Provide a description (optional) <br />
              • Select the VPC ("webapp-network") <br />
              • Check the 2 private subnets in the Data Tier <br />
               <span className="text-sm md:text-sm lg:text-sm sm:text-sm block ml-4">-Private-subnet-2 and Private-subnet-3</span>
              • Click on <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create</span> <br />
            </Paragraph>
            <ImageContainer  src="./rds-subnetgroup-create.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />


            <Paragraph>
              Now, we can create the database instance <br />
              • Go to Databases click on <span className="text-primary font-semibold">Create database</span> <br />
              • Choose "Standard Create" <br />
            </Paragraph>
            
            
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 5 - (Database)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                 the Database as dicussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 and Step 2 to make it work, and ensure the indentations are correct
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <ReadMore>
                    <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                      {`# Resources: ...

# VPC and Subnets section  
#    ....
# Routing section
#    ....
####################
# Security groups

  BastionSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access from my IP
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: !Ref MyIP 
      Tags:
        - Key: Name
          Value: BastionHostSG

  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP and HTTPS access from anywhere
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
      Tags:
        - Key: Name
          Value: WebServerSG

  AppServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable access from Web Server and Bastion Host Security Groups
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          SourceSecurityGroupId: !Ref BastionSecurityGroup
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          SourceSecurityGroupId: !Ref WebServerSecurityGroup
        - IpProtocol: icmp
          FromPort: -1
          ToPort: -1
          SourceSecurityGroupId: !Ref WebServerSecurityGroup
      Tags:
        - Key: Name
          Value: AppServerSG
  
  DatabaseSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable access from App Server and Bastion Host Security Groups
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 3306
          ToPort: 3306
          SourceSecurityGroupId: !Ref AppServerSecurityGroup
        - IpProtocol: tcp
          FromPort: 3306
          ToPort: 3306
          SourceSecurityGroupId: !Ref BastionSecurityGroup
      Tags:
        - Key: Name
          Value: DatabaseSG

  AppServerDatabaseSGIngress:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      GroupId: !Ref AppServerSecurityGroup
      IpProtocol: tcp
      FromPort: 3306
      ToPort: 3306
      SourceSecurityGroupId: !Ref DatabaseSecurityGroup

  BastionDatabaseSGIngress:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      GroupId: !Ref BastionSecurityGroup
      IpProtocol: tcp
      FromPort: 3306
      ToPort: 3306
      SourceSecurityGroupId: !Ref DatabaseSecurityGroup

  WebServerAppServerSGIngress:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      GroupId: !Ref WebServerSecurityGroup
      IpProtocol: icmp
      FromPort: -1
      ToPort: -1
      SourceSecurityGroupId: !Ref AppServerSecurityGroup

              `}
                    </SyntaxHighlighter>
                  </ReadMore>
                                    </div>
                                </div>
                              </div>
          
        </ProjectSection>
    )
}