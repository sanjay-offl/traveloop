import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Traveloop — Smart Multi-City Travel Planning',
  description:
    'Traveloop is a smart and user friendly multi city travel planning platform that helps users organize trips, manage destinations, schedule activities, track budgets, and share itineraries through a clean and responsive interface.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = `${inter.variable} ${poppins.variable}`

  return (
    <html lang="en" className={`${fontVars} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-[#0B1220] font-sans text-white antialiased selection:bg-[#38BDF8] selection:text-[#0B1220]">
        {children}
      </body>
    </html>
  )
}
