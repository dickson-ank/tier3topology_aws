"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, MessageCircle, ExternalLink } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about the 3-tier architecture? Need help with your AWS implementation? Let's connect and
            discuss your cloud journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Email Contact */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>Send me a direct message</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For detailed technical questions or collaboration opportunities
              </p>
              <Button asChild className="w-full">
                <a href="mailto:your.email@example.com" className="flex items-center justify-center gap-2">
                  Send Email
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* LinkedIn Contact */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Linkedin className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>LinkedIn</CardTitle>
              <CardDescription>Connect professionally</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Let's connect and discuss cloud architecture and career opportunities
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Connect on LinkedIn
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>Quick chat and support</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For quick questions or immediate assistance with AWS implementations
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Chat on WhatsApp
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-secondary/50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">About This Tutorial</h3>
              <p className="text-muted-foreground">
                This comprehensive guide showcases practical AWS skills through hands-on implementation. Feel free to
                reach out if you'd like to discuss cloud architecture, share feedback, or explore collaboration
                opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
