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
            • Choose an Instance Type. Select "t2.micro" (eligible for free tier). <br/>
            • Select a key pair for SSH access. If you don't have one, 
            create a new key pair and download the .pem file. <br/>
            • Edit Network Settings: <br/>
            - Select the VPC we created (webapp-network) <br/>
            - Select the public subnet (public-subnet) <br/>
            - Enable Auto-assign Public IP <br/>
            - Under Security Group, select "Choose an existing security group" 
            and select the Bastion security group (BastionHostSG) <br/>
            - 


          </Paragraph>








       <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Set UP MariaDB database</h3>
                <div className="space-y-4">
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># # # # # #</div>
                    <div>
                      mysql -h db.c7pjluiomm3k.us-west-2.rds.amazonaws.com -u root -p mydb
                    </div>
                  </div>
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># Database User Data</div>
                    <div>#!/bin/bash <br />
                        set -euxo pipefail <br />
                        sudo dnf update -y <br />
                        sudo dnf install -y mariadb105-server <br />

                        sudo systemctl enable --now mariadb
                    </div>
                    <div className="text-muted-foreground mb-1 mt-6"># Web Server User Data</div>
                      <div> #!/bin/bash <br />
                            sudo yum update -y <br />
                            sudo amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2 <br />
                            sudo yum install -y httpd <br />
                            sudo systemctl start httpd <br />
                            sudo systemctl enable httpd <br/>

                            #!/bin/bash
                            set -euxo pipefail
                            sudo dnf update -y
                            sudo dnf install -y mysql
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
                </div>
              </div>

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
        </ProjectSection>
    )
}