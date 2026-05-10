import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Log in — Traveloop',
  description: 'Sign in to your Traveloop dashboard.',
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children
}
