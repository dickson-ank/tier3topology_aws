import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";

interface Step4Props {
    setSelectedImage: (src: string) => void
}

export function Step4({setSelectedImage}: Step4Props){
    return(
        <ProjectSection id="step-4" title="Step 4: Deploy & Test Your Architecture" onImageClick={setSelectedImage}>
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              The final step involves deploying our serverless architecture and running comprehensive tests to ensure
              everything works as expected. We'll also set up monitoring and logging.
            </p>

            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Deployment Commands</h3>
                <div className="space-y-4">
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># Deploy Lambda function</div>
                    <div>
                      aws lambda update-function-code --function-name myFunction --zip-file fileb://function.zip
                    </div>
                  </div>
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                    <div className="text-muted-foreground mb-1"># Deploy API Gateway</div>
                    <div>aws apigateway create-deployment --rest-api-id abc123 --stage-name prod</div>
                  </div>
                </div>
              </div>

              {/* Before and after, placing images side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <ImageContainer src="./placeholder.svg" alt="Before Deployment" selectedImage={setSelectedImage} />
                <ImageContainer src="./placeholder.svg" alt="After-deployment" selectedImage={setSelectedImage} />
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