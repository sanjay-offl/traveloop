'use client'

import Link from 'next/link'

type DashboardHeaderProps = {
  onOpenNav: () => void
}

export function DashboardHeader({ onOpenNav }: DashboardHeaderProps) {
  return (
<<<<<<< HEAD
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#0B1220]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-brand-accent lg:hidden transition-colors hover:bg-white/[0.04]"
=======
    <header
      className="header sticky top-0 z-20 border-b px-4 py-3 backdrop-blur-xl sm:px-6"
      style={{ borderColor: 'var(--card-border)', background: 'rgba(1,3,2,0.85)' }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border text-[var(--cyan)] lg:hidden"
          style={{ borderColor: 'var(--card-border)' }}
>>>>>>> origin/main
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
<<<<<<< HEAD
        <div className="relative hidden min-w-0 flex-1 sm:block">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
=======
        <div className="order-3 min-w-[200px] flex-1 basis-full sm:order-none sm:basis-auto lg:max-w-[220px]">
          <p className="text-sm font-medium text-white">Welcome back, Arjun</p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Here&apos;s what&apos;s happening with your trips
          </p>
        </div>
        <div className="relative hidden min-w-0 flex-1 md:block">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35">
>>>>>>> origin/main
            search
          </span>
          <input
            type="search"
            placeholder="Search trips, cities, bookings…"
<<<<<<< HEAD
            className="w-full max-w-md rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-brand-accent/50 focus:outline-none focus:ring-1 focus:ring-brand-accent/30 backdrop-blur-sm transition-all"
=======
            className="w-full max-w-md rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[rgba(82,227,232,0.4)]"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--card-border)',
              color: 'var(--text)',
            }}
>>>>>>> origin/main
          />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard#notifications"
<<<<<<< HEAD
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 transition-all hover:border-brand-accent/25 hover:text-brand-accent hover:shadow-glow-sm"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-accent shadow-glow-sm" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] py-1.5 pl-1.5 pr-3 transition-all hover:border-white/15 hover:shadow-glow-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)' }}>
              JL
=======
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
>>>>>>> origin/main
            </span>
            <span className="hidden text-sm font-medium text-white sm:inline">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
