import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DM_Sans, Manrope, Playfair_Display, Space_Grotesk } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
})

export const metadata: Metadata = {
  title: 'Traveloop — Smart Multi-City Travel Planning',
  description:
    'Traveloop is a smart and user friendly multi city travel planning platform that helps users organize trips, manage destinations, schedule activities, track budgets, and share itineraries through a clean and responsive interface.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = `${manrope.variable} ${spaceGrotesk.variable} ${playfair.variable} ${dmSans.variable}`

  return (
    <html lang="en" className={`${fontVars} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-brand-black font-body text-white antialiased selection:bg-brand-cyan selection:text-brand-black">
        {children}
      </body>
    </html>
  )
}
