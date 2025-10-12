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
              • A database is essential for storing and managing the user information that our application will use. <br />
              • The App server will connect to this database to perform various operations such as reading,
               writing, and updating data. <br />
              • as well the Bastion host for management purposes as configured in the Security Groups step <br />
            </Paragraph>
            

            <Paragraph>
              Go to the Aurora/RDS Dashboard <br />
              • Create first a Subnet Group for the database <br />
              • Click on Subnet groups in the left sidebar <br />
              • Click on <span className="text-primary font-semibold">Create DB Subnet Group</span> <br />
              • We'll name it "database-subnet-group" <br />
              • Provide a description (optional) <br />
              • Select the VPC ("webapp-network") <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-subnetgroup1.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />
            <Paragraph>
              Next, we will add subnets to the group <br />
              • Selec the availability zones in which you created the subnets <br />
              • Check the 2 private subnets for the Data Tier <br />
               <span className="text-sm md:text-sm lg:text-sm sm:text-sm block ml-4">-Private-subnet-2 and Private-subnet-3</span>
              • Click on <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create</span> <br />
            </Paragraph>
            <ImageContainer  src="./rds-subnetgroup2.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />


            <Paragraph>
              Now, we can create the database instance <br />
              • Go to Databases and click on <span className="text-primary font-semibold">Create database</span> <br />
              • Choose "Standard Create" <br />
              • Select "MariaDB" as the engine type <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-engine.jpeg" alt="RDS Engine screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              • Leave the engine version to default <br />
              • For the template, select "Free tier" <br />
              • Set the DB instance identifier to "database-instance" <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-instanceid.jpeg" alt="RDS Instance ID screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              • Set the Master username to "adminuser" <br />
              • Set the Master password and confirm it (make sure to note this down somewhere) <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-masteruser.jpeg" alt="RDS Master User screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              • Move to connectivity section <br />
              • Select the VPC ("webapp-network") <br />
              • Select the subnet group created ("database-subnet-group") <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-connectivity.jpeg" alt="RDS Connectivity screenshot" selectedImage={setSelectedImage} />            
            
            <Paragraph>
              • Set Public access to "No" <br />
              • Set VPC security group to "Choose existing" and select "DatabaseSG" <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-connectivity2.jpeg" alt="RDS Connectivity screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              • Skip to Additional configuration expand it<br />
              • Set Initial database name to "db" for simplicity<br />
               <span className="text-sm md:text-sm lg:text-sm sm:text-sm block ml-4">- 
                This will create a database named "db" on the database-instance</span>
              • Since this architecture isn't fully functional, we will uncheck the backup and monitoring options
               for faster database creation<br />
              • Review and <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Create database</span> <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-additionalconfig.jpeg" alt="RDS Additional Configuration screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              • It will take a few minutes for the database to be created <br />
              • Once available, note down the endpoint, close to where you kept the Master password,
                we will need it to test connections to the database through the appserver in the next step <br />
              <br />
              Essentially, to connect to the database you will need the following <br />
              <span className="text-sm md:text-sm lg:text-sm sm:text-sm">- Endpoint</span> <br />
              <span className="text-sm md:text-sm lg:text-sm sm:text-sm">- Database name (in our case "db")</span> <br />
              <span className="text-sm md:text-sm lg:text-sm sm:text-sm">- Master username (in our case "adminuser")</span> <br />
              <span className="text-sm md:text-sm lg:text-sm sm:text-sm">- Master password (the one you set above)</span> <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./rds-endpoint.jpeg" alt="RDS Endpoint screenshot" selectedImage={setSelectedImage} />
            
            
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 5 - (Database)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                 the Database as dicussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 through Step 4 to make it work, and ensure the indentations are correct
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <ReadMore>
                    <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                      {`# Resources: ...

# VPC and Subnets section  
#    ....
# Routing section
#    ....
# Security groups
#    ....
# EC2 Instances
#    ....

# Database

  DatabaseSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: Subnet group for RDS instance
      SubnetIds:
        - !Ref PrivateSubnet2
        - !Ref PrivateSubnet3
      Tags:
        - Key: Name
          Value: database-subnet-group

  DatabaseInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: database-instance
      AllocatedStorage: 20
      DBInstanceClass: db.t4g.micro
      Engine: mariadb
      EngineVersion: "11.4.5"
      MasterUsername: !Ref DBMasterUsername
      MasterUserPassword: !Ref DBPassword
      VPCSecurityGroups:
        - !Ref DatabaseSecurityGroup
      DBSubnetGroupName: !Ref DatabaseSubnetGroup
      MultiAZ: false
      PubliclyAccessible: false
      StorageType: gp2
      DBName: db
      DeletionProtection: false
      BackupRetentionPeriod: 0
      MonitoringInterval: 0
      EnablePerformanceInsights: false
      AutoMinorVersionUpgrade: false
      CopyTagsToSnapshot: false
      Tags:
        - Key: Name
          Value: database-instance

              `}
                    </SyntaxHighlighter>
                  </ReadMore>
                                    </div>
                                </div>
                              </div>
          
        </ProjectSection>
    )
}