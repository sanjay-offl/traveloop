'use client'

import Link from 'next/link'
import { ThemeToggle } from '../../theme/ThemeToggle'

type DashboardHeaderProps = {
  onOpenNav: () => void
}

export function DashboardHeader({ onOpenNav }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#111111]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 dark:border-white/10 text-blue-600 dark:text-blue-400 lg:hidden transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative hidden min-w-0 flex-1 sm:block">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
            search
          </span>
          <input
            type="search"
            placeholder="Search trips, cities, bookings…"
            className="w-full max-w-md rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:text-zinc-500 focus:border-blue-600/50 dark:focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-600/30 dark:focus:ring-blue-400/30 backdrop-blur-sm transition-all"
          />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard#notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 dark:border-white/10 text-zinc-500 dark:text-zinc-400 transition-all hover:border-blue-600/25 dark:hover:border-blue-400/25 hover:text-blue-600 dark:text-blue-400 hover:shadow-glow-sm"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500 shadow-glow-sm" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 py-1.5 pl-1.5 pr-3 transition-all hover:border-text-secondary/30 hover:shadow-glow-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-zinc-900 dark:text-zinc-100" style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)' }}>
              JL
            </span>
            <span className="hidden text-sm font-medium text-zinc-900 dark:text-zinc-100 sm:inline">Account</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
