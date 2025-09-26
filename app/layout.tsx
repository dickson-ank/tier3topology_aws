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
  description: "3-Tier Web Application on AWS",
    generator: 'Dickson Ankamah',
    applicationName: '3-Tier Web Application on AWS',
    keywords: ['Documentation', 'Template', 'Next.js', 'React', 'Tailwind CSS'],
    authors: [{ name: 'Dickson Ankamah'}],
    creator: 'Dickson Ankamah',
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
