import type { Metadata, Viewport } from "next"
import { Nunito, Nunito_Sans } from "next/font/google"

import "./globals.css"

const _nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
})

const _nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito-sans",
})

export const metadata: Metadata = {
  title: "English Llama Quest — Learn English",
  description:
    "Fun gamified English learning app for Russian speakers. From A1 to C2 with quizzes, lessons, idioms, and a llama mascot!",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#141118" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${_nunito.variable} ${_nunitoSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
