import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { DashboardShell } from '../../components/dashboard/DashboardShell'
import GeminiChatbot from '../../components/chatbot/GeminiChatbot'

export const metadata: Metadata = {
  title: 'Dashboard — Traveloop',
  description: 'Manage trips, budget, calendar, and tasks in your Traveloop dashboard.',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell>
      {children}
      <GeminiChatbot />
    </DashboardShell>
  )
}
