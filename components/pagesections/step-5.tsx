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
               <span className="text-xs lg:text-sm md:text-xs block ml-4">-Private-subnet-2 and Private-subnet-3</span>
              • Click on <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create</span> <br />
            </Paragraph>
            <ImageContainer  src="./rds-subnetgroup-create.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />


            <Paragraph>
              Now, we can create the database instance <br />
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
            <ImageContainer  src="./appserverSG-create2.jpeg" alt="App Server SG screenshot" selectedImage={setSelectedImage} />
            <ImageContainer  src="./appserverSG-create.jpeg" alt="App Server SG screenshot" selectedImage={setSelectedImage} />          
            
            <Paragraph>
              Finally, we'll create the Database Security Group. <br />
              • We'll name it "DatabaseSG" <br />
              • Add 2 inbound rules:<br />
              • MySQL/Aurora - Source: Custom - "AppServerSG" <br />
              • MySQL/Aurora - Source: Custom - "BastionHostSG" <br />
              • Review and create the security group<br />
            </Paragraph>
            <ImageContainer  src="./databaseSG-create.jpeg" alt="Database SG screenshot" selectedImage={setSelectedImage} />            
            
            <Paragraph>
              Now, let's go back and add the missing rules to the Web Server and App Server Security Groups. <br />
              • Select each Security Group and edit the inbound rules<br />
              • For WebServerSG, add an ICMP rule with Source: Custom - "AppServerSG"<br />
              • For AppServerSG, add a MySQL/Aurora rule with Source: Custom - "DatabaseSG"<br />
              • Save the changes<br /><br />
              This completes the setup of our Security Groups, ensuring that our application components
              can communicate securely while minimizing exposure to potential threats.
            </Paragraph>
            
            <Note grid={false}
            note1={<>
              - Allow limited access to specific IPs into bastion host <br />
              - Since web server already built to allow traffic from internet,
               we do not to ssh into it through the bastion host<br />
              - Allowing too much traffic from anywhere can risk your most critical resources <br />
              - Regularly review and update security group rules as needed <br />
              - Use descriptive names and comments for rules to make management easier <br />
                  </>}        
            />
            
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 3 - (Security Groups)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                 the Security Groups as dicussed above<br/>
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