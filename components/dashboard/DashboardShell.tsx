'use client'

import { useState } from 'react'

import { DashboardHeader } from './Header/DashboardHeader'
import { Sidebar } from './Sidebar/Sidebar'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F1F1F1] dark:bg-[#050505] text-zinc-900 dark:text-zinc-100">
      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-[18rem]">
        <DashboardHeader onOpenNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
