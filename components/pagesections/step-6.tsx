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
        <ProjectSection id="step-3" title="Step 3: Security Groups" onImageClick={setSelectedImage}>
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






























               
 