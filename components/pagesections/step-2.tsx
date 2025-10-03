import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";

interface Step2Props {
    setSelectedImage: (src: string) => void
}

export function Step2({setSelectedImage}: Step2Props){
    return(
        <ProjectSection id="step-2" title="Step 2: Set Up API Gateway" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Configure API Gateway to create RESTful endpoints that will trigger our Lambda functions. This step
              involves setting up routes, methods, and integration with our Lambda functions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">REST API Setup</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
                  Create a new REST API in API Gateway and configure the necessary resources and methods.
                </p>
              </div>
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">Lambda Integration</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
                  Connect your API Gateway endpoints to the Lambda functions we created in the previous step.
                </p>
              </div>
            </div>

            <ImageContainer src="./placeholder.svg" alt="Lambda function creation" selectedImage={setSelectedImage} />

        </ProjectSection>
    )
}