'use client'

import Link from 'next/link'

type DashboardHeaderProps = {
  onOpenNav: () => void
}

export function DashboardHeader({ onOpenNav }: DashboardHeaderProps) {
  return (
    <header
      className="header sticky top-0 z-20 border-b px-4 py-3 backdrop-blur-xl sm:px-6"
      style={{ borderColor: 'var(--card-border)', background: 'rgba(1,3,2,0.85)' }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border text-[var(--cyan)] lg:hidden"
          style={{ borderColor: 'var(--card-border)' }}
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="order-3 min-w-[200px] flex-1 basis-full sm:order-none sm:basis-auto lg:max-w-[220px]">
          <p className="text-sm font-medium text-white">Welcome back, Arjun</p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Here&apos;s what&apos;s happening with your trips
          </p>
        </div>
        <div className="relative hidden min-w-0 flex-1 md:block">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35">
            search
          </span>
          <input
            type="search"
            placeholder="Search trips, cities, bookings…"
            className="w-full max-w-md rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[rgba(82,227,232,0.4)]"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--card-border)',
              color: 'var(--text)',
            }}
          />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard#notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
            style={{ border: '1px solid var(--card-border)', color: 'var(--muted)' }}
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="notif-dot absolute right-1.5 top-1.5" />
          </Link>
          <Link
            href="/dashboard#profile"
            className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-3 transition-colors"
            style={{ border: '1px solid var(--card-border)', background: 'var(--card)' }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, rgba(82,227,232,0.95), rgba(82,227,232,0.45))',
                color: '#010302',
              }}
            >
              AS
            </span>
            <span className="hidden text-sm font-medium text-white sm:inline">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
