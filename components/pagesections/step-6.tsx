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
               We will verify that the App server can communicate with the database, as well 
               with the Web Sever.
               We will also test if the Web server is serving the web application properly. <br />
               We will test if only permitted access is allowed to all the Instances. <br /> <br />
               We will need a terminal for this step. I will be using WSL terminal on Windows.
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
              that's the reason I named it webapp-index.html but you must rename it to index.html <br /> <br />
              Run this command: <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">
                  mv webapp-index.html index.html
                </span>
              </span>
            </Paragraph>
            <ImageContainer src="./rename-to-index.png" 
            alt="Renaming the html file to index.html" selectedImage={setSelectedImage}/>

            <div className="space-y-6 mt-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty mb-4">
                  Make sure your key pair file has the right permissions set. <br /> <br />
                  Run this to do so: <br /></p>
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                  <div className="text-muted-foreground mb-1">
                    chmod 400 YOUR-KEY-PAIR.pem
                  </div>
                </div>
                  <span className="text-xs sm:text-sm text-muted-foreground text-pretty mb-4">Now run the following command to upload the html file to the web server instance. <br /></span>
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

            <Paragraph>
              Follow same procedure to upload the key pair pem file to the Bastion Host instance. <br />
              To use it to connect to the App server instance from the Bastion Host. <br />
              Run the command: <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">
                  scp -i YOUR-KEY-PAIR.pem YOUR-KEY-PAIR.pem ec2-user@YOUR-BASTION-HOST-PUBLIC-IP:~/
                </span>
              </span>
            </Paragraph>
            <ImageContainer src="./upload-keypair-to-bastion.png" 
            alt="Upload the key pair pem file to the Bastion Host" selectedImage={setSelectedImage}/>
            <Paragraph>
              Let's ssh into the Web server and copy the html file to 
              /var/www/html/ so that it can serve the webpage <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">
                  ssh -i YOUR-KEY-PAIR.pem ec2-user@YOUR-WEB-SERVER-PUBLIC-IP
                </span>
              </span> <br />
              You can see the index.html file in the home directory by running "ls"<br />
            </Paragraph>
            <ImageContainer src="./ssh-into-web-server.png" 
            alt="SSH into the web server instance" selectedImage={setSelectedImage}/>
            <div className="bg-muted p-3 text-sm sm:text-sm">
              This command to copies the file: <br />
              <div className="text-muted-foreground font-mono mb-1 p-3 sm:p-3 rounded text-sm sm:text-sm">
                sudo cp index.html /var/www/html/
              </div>
            </div>
            <Paragraph>
              <br />
              Now open a browser and run <span className="text-primary">http://YOUR-WEB-SERVER-PUBLIC-IP/</span> and you see this page below <br />
              Note that if you run https insted of http it might not work<br />
            </Paragraph>
            <ImageContainer src="./webpage-served-by-web-server.png" 
            alt="Webpage served by the web server" selectedImage={setSelectedImage}/>

            <Paragraph>
              Now let's test if the App server can communicate with the Database <br />
              Exit the web server instance by running "exit" command <br />
              And then ssh into the Bastion Host instance <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">ssh -i YOUR-KEY-PAIR.pem ec2-user@YOUR-BASTION-HOST-PUBLIC-IP</span>
              </span> <br />
              Now we are in the Bastion Host instance <br />
              "ls" to see if the key pair file we uploaded is there <br />
              </Paragraph>
            <ImageContainer src="./ssh-into-bastion-host.png" 
            alt="SSH into the Bastion Host instance" selectedImage={setSelectedImage}/> 

            <Paragraph>
              From here we will ssh into the App server instance <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">ssh -i YOUR-KEY-PAIR.pem ec2-user@YOUR-APP-SERVER-PRIVATE-IP</span>
              </span> <br />
              Now we are in the App server instance <br />
              </Paragraph>
            <ImageContainer src="./ssh-into-app-server.png" 
            alt="SSH into the App server instance from the Bastion Host" selectedImage={setSelectedImage}/>

            <Paragraph>
              Run this command to test if the App server can communicate with the Database server <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">mysql -h YOUR-DATABASE-ENDPOINT -u MASTER-USERNAME -p DATABASE-NAME</span>
              </span> <br />
              Go to the RDS Dashboard and copy the Database Endpoint value if you didn't note it somewhere earlier<br />
             Enter the master password for the database at the prompt<br />
              If you see the MariaDB prompt it means the App server can communicate with the Database server <br />
            </Paragraph>
            <ImageContainer src="./app-server-mysql-prompt.png" 
            alt="MySQL prompt on the App server" selectedImage={setSelectedImage}/>

            <Paragraph>
              You can run further tests on your own to verify if the security groups are working as intended <br />
              For example try to ssh into the App server instance from your local machine <br />
              It should not work because the security group of the App server only allows ssh access from the Bastion Host <br />
              You can ping the Web Server's private IP from the App Server to check if the ICMP rule works fine <br />
            </Paragraph>
            <h4 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold text-foreground mb-4 text-balance">
               Voila! Congratulations! That was easy, wasn't it?</h4>
            That's all about it, we've been able to successfully complete the design
            <ImageContainer src="./tier3topology.png" alt="Topology Diagram" selectedImage={setSelectedImage} />
        </ProjectSection>
    )
}






























               
 