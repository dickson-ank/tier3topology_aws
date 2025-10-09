import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";

interface Step4Props {
    setSelectedImage: (src: string) => void
}

export function Step4({setSelectedImage}: Step4Props){
    return(
        <ProjectSection id="step-4" title="Step 4: EC2 Instances & RDS Database" onImageClick={setSelectedImage}>
          <Paragraph>
            In this step, we will launch EC2 instances for the web server and database server,
             configure them with appropriate security groups created in the previous step,
            and set up user data scripts to automate the installation of necessary software.
          </Paragraph>
          <Paragraph>
            What we'll create:
            • EC2 Instance for Bastion<br />
            • EC2 Instance for Web Server<br />
            • EC2 Instance for Database Server<br />
            • RDS Instance for MariaDB
          </Paragraph>
          <ImageContainer src="./draw.io-ec2-database.png" alt="EC2 and Database Setup Diagram" selectedImage={setSelectedImage} />

          <Paragraph>
            • Search for "EC2" in the Search bar and open the EC2 Dashboard. <br/>
            • Click on "Launch Instance" to create a new EC2 instance. <br/>
            • We'll create the first instance for the Bastion host. <br/>
            • Choose an Amazon Machine Image (AMI). Select "Amazon Linux 2023. <br/>
          </Paragraph>
          <ImageContainer src="./ec2-create.jpeg" alt="EC2 Dashboard" selectedImage={setSelectedImage} />
          <ImageContainer src="./ec2-ami.jpeg" alt="EC2 AMI Selection" selectedImage={setSelectedImage} />

          <Paragraph>
            • Choose an Instance Type. Select "t2.micro" (eligible for free tier). <br/>
            • Select a key pair for SSH access. If you don't have one, 
            create a new key pair and download the ".pem" file <br/>
            <span className="text-sm md:text-sm lg:text-sm sm:text-sm">you'll need this to connect to your instance 
              later when we you test the deployment.</span> <br/>
          </Paragraph>
          <ImageContainer src="./ec2-instance-type.jpeg" alt="EC2 Instance Type Selection" selectedImage={setSelectedImage} />
                    
          <Paragraph> 
            • Edit Network Settings: <br/>
            - Select the VPC we created (webapp-network) <br/>
            - Select the public subnet (public-subnet) <br/>
            - Enable Auto-assign Public IP <br/>
            - Under Security Group, select "Choose an existing security group" 
            and select the Bastion security group (BastionHostSG) <br/>
         </Paragraph>
          <ImageContainer src="./ec2-network-settings.jpeg" alt="EC2 Network Settings" selectedImage={setSelectedImage} />

          <Paragraph>
            • Leave everything else as default and scroll to Advanced Details <br />
            • In the User Data section, copy and paste the code below:
          </Paragraph>
          
            <div className="space-y-6 mb-4">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Bastion Host User Data</h3>
                <div className="space-y-4">
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># Copy this and paste it into the user data</div>
                    <div>
                      #!/bin/bash <br />
                      set -euxo pipefail <br />
                      sudo dnf update -y <br />
                      sudo dnf install -y mariadb105 <br />
                    </div>

                        </div>
                    </div>
                </div>
            </div>
          <ImageContainer src="./ec2-user-data.jpeg" alt="EC2 User Data" selectedImage={setSelectedImage} />
          <Paragraph>
            • Review and click   
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Launch instance</span>
          </Paragraph>

      <div className="space-y-6 mt-6">
        <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Testing Your Deployment</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty mb-4">
                  Use these commands to test your deployed serverless architecture and verify all components are working
                  correctly.
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                  <div className="text-muted-foreground mb-1"># Test API endpoint</div>
                  <div>curl -X GET https://your-api-id.execute-api.region.amazonaws.com/prod/hello</div>
                </div>
          </div>
      </div>

               <div className="text-muted-foreground mb-1 mt-6"># Web Server User Data</div>
                    <div>
                      mysql -h db.c7pjluiomm3k.us-west-2.rds.amazonaws.com -u root -p db
                    </div>
                      <div> #!/bin/bash
                            set -euxo pipefail
                            sudo yum update -y
                            sudo yum install -y httpd
                            sudo systemctl start httpd
                            sudo systemctl enable httpd

                            #!/bin/bash
                            set -euxo pipefail
                            sudo dnf update -y
                            sudo dnf install -y mariadb105
                      </div>
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># Database User Data</div>
                    <div>#!/bin/bash <br />
                        set -euxo pipefail <br />
                        sudo dnf update -y <br />
                        sudo dnf install -y mariadb105<br />

                        sudo systemctl enable --now mariadb
                    </div>
                </div>
                        <div>
                          <a
                            href="./webapp-index.html"
                            download
                            className="px-1 py-1 bg-primary text-primary-foreground rounded-lg font-small font-mono 
                            hover:bg-primary/90 transition-colors text-xs sm:text-xs md:text-sm lg:text-sm"
                          >
                            📄Download webapp-index.html
                          </a>
                        </div>
                
        </ProjectSection>
    )
}