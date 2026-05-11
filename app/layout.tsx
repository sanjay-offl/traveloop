import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme/ThemeProvider'
import { ToastProvider } from '../components/ui/Toast'

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
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: ['/logo.svg'],
  },
  openGraph: {
    title: 'Traveloop — Smart Multi-City Travel Planning',
    description: 'Plan trips, track budgets, and share itineraries — all in one premium travel OS.',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Traveloop' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Traveloop',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = `${inter.variable} ${poppins.variable}`

  return (
    <html lang="en" className={`${fontVars} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('traveloop-theme');
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  var isDark = stored === 'dark' || (stored !== 'light' && darkQuery.matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-[var(--bg-base)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
