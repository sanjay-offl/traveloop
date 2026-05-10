'use client'

import Link from 'next/link'

type DashboardHeaderProps = {
  onOpenNav: () => void
}

export function DashboardHeader({ onOpenNav }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-brand-black/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-brand-cyan lg:hidden"
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative hidden min-w-0 flex-1 sm:block">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35">
            search
          </span>
          <input
            type="search"
            placeholder="Search trips, cities, bookings…"
            className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.06] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 focus:border-brand-cyan/50 focus:outline-none focus:ring-1 focus:ring-brand-cyan/40"
          />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard#notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/70 transition-colors hover:border-brand-cyan/30 hover:text-brand-cyan"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-cyan" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-3 transition-colors hover:border-white/20"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan/90 to-brand-cyan/40 text-xs font-bold text-brand-black">
              JL
            </span>
            <span className="hidden text-sm font-medium text-white sm:inline">Account</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
