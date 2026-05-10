'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const mainNav = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { label: 'My Trips', href: '/dashboard#trips', icon: 'luggage' },
  { label: 'Create Trip', href: '/dashboard#create-trip', icon: 'add_circle' },
  { label: 'Budget', href: '/dashboard#budget', icon: 'account_balance_wallet' },
  { label: 'Explore', href: '/dashboard#explore', icon: 'travel_explore' },
] as const

const secondaryNav = [
  { label: 'Profile', href: '/dashboard#profile', icon: 'person' },
  { label: 'Settings', href: '/dashboard#settings', icon: 'settings' },
] as const

export type DashboardSidebarProps = {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <aside
<<<<<<< HEAD
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[0.06] bg-[#0B1220]/95 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
=======
        className={`fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-white/5 transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
>>>>>>> origin/main
        }`}
        style={{ background: '#060D08' }}
      >
<<<<<<< HEAD
        <div className="flex h-16 items-center gap-2 border-b border-white/[0.06] px-5">
          <Link href="/dashboard" className="font-sans text-lg font-bold tracking-tight" onClick={onMobileClose}>
            <span className="heading-gradient">Traveloop</span>
          </Link>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 font-accent" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(56,189,248,0.10))' }}>
            Dashboard
          </span>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Dashboard">
          {nav.map((item) => (
=======
        <div className="flex items-center gap-3 border-b border-white/5 px-6 py-6">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'var(--cyan)', boxShadow: '0 0 16px rgba(82,227,232,0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="#010302" />
            </svg>
          </div>
          <div>
>>>>>>> origin/main
            <Link
              href="/dashboard"
              className="text-base font-medium text-white"
              style={{ fontFamily: 'var(--font-display)' }}
              onClick={onMobileClose}
<<<<<<< HEAD
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition-all hover:bg-white/[0.05] hover:text-white hover:shadow-glow-sm"
=======
>>>>>>> origin/main
            >
              Traveloop
            </Link>
            <div className="text-xs" style={{ color: 'var(--muted)', marginTop: 1 }}>
              Travel dashboard
            </div>
          </div>
        </div>

        <nav className="sidebar-scroll flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6" aria-label="Main">
          <div className="mb-4 px-2 text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Navigation
          </div>
          {mainNav.map((item) => {
            const isDashboard = item.href === '/dashboard'
            const active = isDashboard && pathname === '/dashboard'
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onMobileClose}
                className={`nav-link ${active ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined text-[20px] text-[inherit]">{item.icon}</span>
                <span className="flex-1 text-[13px] font-medium">{item.label}</span>
              </Link>
            )
          })}

          <div className="my-4 h-px bg-white/5" />

          <div className="mb-3 px-2 text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Account
          </div>
          {secondaryNav.map((item) => (
            <Link key={item.label} href={item.href} onClick={onMobileClose} className="nav-link">
              <span className="material-symbols-outlined text-[20px] text-[inherit]">{item.icon}</span>
              <span className="text-[13px]">{item.label}</span>
            </Link>
          ))}
        </nav>
<<<<<<< HEAD
        <div className="border-t border-white/[0.06] p-3">
          <Link
            href="/home"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Back to site
          </Link>
=======

        <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              style={{ background: 'var(--cyan)', color: '#010302' }}
            >
              A
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-white">Arjun Sharma</div>
              <div className="truncate text-xs" style={{ color: 'var(--muted)' }}>
                Pro member
              </div>
            </div>
            <div
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ background: '#86EFAC', boxShadow: '0 0 6px rgba(134,239,172,0.5)' }}
            />
          </div>
>>>>>>> origin/main
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-label="Close menu"
          onClick={onMobileClose}
        />
      ) : null}
    </>
  )
}
