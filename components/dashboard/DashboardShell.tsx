'use client'

import { useState } from 'react'

import { DashboardHeader } from './Header/DashboardHeader'
import { Sidebar } from './Sidebar/Sidebar'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen text-white" style={{ background: 'var(--bg)' }}>
      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <DashboardHeader onOpenNav={() => setMobileNavOpen(true)} />
        <main className="main flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
