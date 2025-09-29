import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})
    
export const metadata: Metadata = {
  title: "3-Tier Web Application on AWS",
  description: "Setting up 3-Tier Web Application on AWS",
    generator: 'Dickson Ankamah',
    applicationName: '3-Tier Web Application on AWS',
    keywords: ['how to', 'security group','3 tier project','walkthrough', 'ec2', 'autoscaling', 'web application'],
    authors: [{ name: 'Dickson Ankamah'}],
    creator: 'Dickson Ankamah'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${montserrat.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
