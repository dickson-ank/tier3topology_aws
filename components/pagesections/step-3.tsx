import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";

interface Step3Props {
    setSelectedImage: (src: string) => void
}

export function Step3({setSelectedImage}: Step3Props){
    return(
        <ProjectSection id="step-3" title="Step 3: Security Groups" onImageClick={setSelectedImage}>
            <Paragraph>
              In this step we will set up Security Groups to control access to our AWS resources.
              Security Groups act as virtual firewalls that regulate inbound and outbound traffic. 
               We will create rules to allow only necessary traffic, enhancing the security of our application.
            </Paragraph>
            <ImageContainer  src="./draw.io.securitygroups.png" alt="" selectedImage={setSelectedImage} />

            
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">DynamoDB Table Creation</h3>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <div className="text-muted-foreground mb-1"># Create DynamoDB table</div>
                  <div className="whitespace-nowrap">aws dynamodb create-table \</div>
                  <div className="ml-4">--table-name UserData \</div>
                  <div className="ml-4">--attribute-definitions AttributeName=userId,AttributeType=S \</div>
                  <div className="ml-4">--key-schema AttributeName=userId,KeyType=HASH</div>
                </div>
              </div>
              </div>
          
        </ProjectSection>
    )
}