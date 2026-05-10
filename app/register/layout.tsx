import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Create account — Traveloop',
  description: 'Join Traveloop and start planning your trips.',
}

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children
}
