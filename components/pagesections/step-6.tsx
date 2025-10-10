import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import Note from "../note";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";

interface Step6Props {
    setSelectedImage: (src: string) => void
}

export function Step6({setSelectedImage}: Step6Props){
    return(
        <ProjectSection id="step-6" title="Step 6: Testing" onImageClick={setSelectedImage}>
            <Paragraph>
              In this final step, we will test the entire setup to ensure that all components are functioning correctly.
               We will verify that the App server can communicate with the database as well 
               with the Web Sever.
               We will also test if the Web server is serving the web application properly. <br />
               We will test if only permitted access is allowed to all the Instances. <br /> <br />
               We will need a terminal for this step. I will be using WSL terminal on Windows.

               We 
            </Paragraph>


            <Paragraph>
              <span className="block mb-2">
               First download this html file and save it to your home directory(or the directory you will be using the terminal in).
                This file will be used to test if the web server is serving the web application properly. <br />
                <a
                  href="./webapp-index.html"
                  download
                  className="px-1 py-1 bg-primary text-primary-foreground rounded-lg font-small font-mono 
                  hover:bg-primary/90 transition-colors text-xs sm:text-xs md:text-sm lg:text-sm"
                >
                  📄Download webapp-index.html
                </a>
              </span>
              And then upload they key pair pem file you created in Step 4 to the same directory.
            </Paragraph>
            <ImageContainer src="./terminal-show-current-files.png" 
            alt="Uploading the key pair and html file to the terminal directory" selectedImage={setSelectedImage}/>

            <Paragraph>
              Rename the file to index.html <br />
              The file kept interfering with other index.html files while developing the project 
              that's the reason I named it webapp-index.html but you must rename it to index.html <br />
              Run this command: <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">
                  scp -i YOUR-KEY-PAIR.pem webapp-index.html ec2-user@YOUR-WEB-SERVER-IP:~/
                </span>
              </span>
            </Paragraph>
            <ImageContainer src="./rename-to-index.png" 
            alt="Renaming the html file to index.html" selectedImage={setSelectedImage}/>

            <div className="space-y-6 mt-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty mb-4">
                  Make sure your key pair have the right permissions set. <br /> <br />
                  Run this to set it if it doesn't: <br />
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                  <div className="text-muted-foreground mb-1">
                    chmod 400 YOUR-KEY-PAIR.pem
                  </div>
                </div>
                </p>
                  Now run the following command to upload the html file to the web server instance. <br />
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                  <div className="text-muted-foreground mb-1">
                    scp -i YOUR-KEY-PAIR.pem index.html ec2-user@YOUR-WEB-SERVER-PUBLIC-IP:~/
                  </div>
                </div>
                </div>
                Go to your web server instance in the EC2 Dashboard and copy the Public IP. <br />
                If prompted to confirm key authenticity type "yes" and hit enter. <br />
            </div>
            <ImageContainer src="./upload-index-html.png" 
            alt="Upload the index.html file to the web server" selectedImage={setSelectedImage}/>

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
 
        </ProjectSection>
    )
}






























               
 