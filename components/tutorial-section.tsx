"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronRight, Clock, CheckCircle, Monitor, Server, Database, Rocket, Globe } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const tutorialSections = [
  {
    id: "overview",
    title: "Architecture Overview",
    description: "Understanding the 3-tier architecture pattern and AWS services we'll use",
    duration: "15 min",
    icon: Monitor,
    progress: 0,
    subsections: [
      {
        id: "architecture-intro",
        title: "Architecture Introduction",
        content:
          "Learn about the fundamental concepts of 3-tier architecture and how it separates presentation, application, and data layers for better scalability and maintainability.",
      },
      {
        id: "benefits",
        title: "Benefits & Use Cases",
        content:
          "Discover the advantages of 3-tier architecture including improved security, scalability, and separation of concerns. Perfect for web applications, e-commerce platforms, and enterprise systems.",
      },
      {
        id: "prerequisites",
        title: "Prerequisites",
        content:
          "Before we begin, ensure you have an AWS account, basic understanding of cloud concepts, and familiarity with web application architecture.",
      },
    ],
  },
  {
    id: "presentation-tier",
    title: "Presentation Tier Setup",
    description: "Configure CloudFront, S3, and load balancers for the frontend",
    duration: "45 min",
    icon: Globe,
    progress: 0,
    subsections: [
      {
        id: "cloudfront-setup",
        title: "CloudFront Setup",
        content:
          "Set up Amazon CloudFront distribution to deliver your content globally with low latency. Configure caching behaviors and origin settings for optimal performance.",
      },
      {
        id: "s3-hosting",
        title: "S3 Static Hosting",
        content:
          "Create and configure an S3 bucket for static website hosting. Upload your frontend assets and configure bucket policies for public access.",
      },
      {
        id: "domain-configuration",
        title: "Domain Configuration",
        content:
          "Configure custom domain names using Route 53 and set up SSL certificates with AWS Certificate Manager for secure HTTPS connections.",
      },
    ],
  },
  {
    id: "application-tier",
    title: "Application Tier Configuration",
    description: "Deploy EC2 instances, Auto Scaling, and application logic",
    duration: "60 min",
    icon: Server,
    progress: 0,
    subsections: [
      {
        id: "ec2-instances",
        title: "EC2 Instances",
        content:
          "Launch EC2 instances in private subnets to host your application servers. Configure instance types, AMIs, and user data scripts for automated setup.",
      },
      {
        id: "load-balancer",
        title: "Application Load Balancer",
        content:
          "Set up an Application Load Balancer to distribute traffic across multiple EC2 instances. Configure health checks and target groups for high availability.",
      },
      {
        id: "auto-scaling",
        title: "Auto Scaling Groups",
        content:
          "Create Auto Scaling Groups to automatically adjust the number of EC2 instances based on demand. Configure scaling policies and CloudWatch alarms.",
      },
      {
        id: "security-groups",
        title: "Security Groups",
        content:
          "Configure security groups to control inbound and outbound traffic to your EC2 instances. Implement the principle of least privilege for network access.",
      },
    ],
  },
  {
    id: "data-tier",
    title: "Data Tier Implementation",
    description: "Set up RDS, configure security, and establish database connections",
    duration: "50 min",
    icon: Database,
    progress: 0,
    subsections: [
      {
        id: "rds-setup",
        title: "RDS Database Setup",
        content:
          "Create an Amazon RDS instance in private subnets. Choose the appropriate database engine, instance class, and storage configuration for your needs.",
      },
      {
        id: "database-security",
        title: "Database Security",
        content:
          "Implement database security best practices including encryption at rest and in transit, parameter groups, and network isolation using VPC security groups.",
      },
      {
        id: "backup-strategy",
        title: "Backup Strategy",
        content:
          "Configure automated backups, point-in-time recovery, and read replicas for disaster recovery and improved read performance.",
      },
    ],
  },
  {
    id: "deployment",
    title: "Final Deployment & Testing",
    description: "Complete the deployment and perform end-to-end testing",
    duration: "30 min",
    icon: Rocket,
    progress: 0,
    subsections: [
      {
        id: "step-by-step",
        title: "Step-by-Step Guide",
        content:
          "Follow the complete deployment checklist to ensure all components are properly configured and connected. Verify network connectivity and service integration.",
      },
      {
        id: "testing",
        title: "Testing & Validation",
        content:
          "Perform comprehensive testing including load testing, security validation, and end-to-end functionality verification to ensure your architecture is production-ready.",
      },
      {
        id: "monitoring",
        title: "Monitoring Setup",
        content:
          "Set up CloudWatch monitoring, alarms, and logging to track the health and performance of your 3-tier architecture. Configure notifications for critical events.",
      },
    ],
  },
]

export function TutorialSection() {
  const [openSections, setOpenSections] = useState<string[]>([])
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({})

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => (prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]))
  }

  const updateProgress = (sectionId: string, subsectionIndex: number) => {
    const section = tutorialSections.find((s) => s.id === sectionId)
    if (section) {
      const progress = ((subsectionIndex + 1) / section.subsections.length) * 100
      setSectionProgress((prev) => ({ ...prev, [sectionId]: progress }))
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">3-Tier Architecture Walkthrough</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow this comprehensive guide to build a production-ready 3-tier architecture on AWS. Each section
            includes detailed steps and screenshots.
          </p>
        </div>

        <div className="grid gap-6">
          {tutorialSections.map((section) => {
            const IconComponent = section.icon
            return (
              <Card key={section.id} className="overflow-hidden" id={section.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base mb-4">{section.description}</CardDescription>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {section.duration}
                        </div>
                      </div>

                      {sectionProgress[section.id] > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round(sectionProgress[section.id])}%
                            </span>
                          </div>
                          <Progress value={sectionProgress[section.id]} className="h-2" />
                        </div>
                      )}
                    </div>

                    <Collapsible
                      open={openSections.includes(section.id)}
                      onOpenChange={() => toggleSection(section.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {openSections.includes(section.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </Collapsible>
                  </div>
                </CardHeader>

                <Collapsible open={openSections.includes(section.id)} onOpenChange={() => toggleSection(section.id)}>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {section.subsections.map((subsection, index) => (
                          <div key={subsection.id} id={subsection.id} className="border-l-2 border-primary/20 pl-4">
                            <div
                              className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                              onClick={() => updateProgress(section.id, index)}
                            >
                              <div className="flex-shrink-0 mt-1">
                                {sectionProgress[section.id] > (index / section.subsections.length) * 100 ? (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold mb-2">{subsection.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{subsection.content}</p>
                                <div className="mt-3 text-xs text-muted-foreground bg-background/50 px-3 py-1 rounded-md inline-block">
                                  📸 Screenshots and detailed steps will be added here
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-border">
                        <Button className="w-full sm:w-auto">View Detailed Guide</Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
