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
        className={`fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-white/5 transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ background: '#060D08' }}
      >
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
            <Link
              href="/dashboard"
              className="text-base font-medium text-white"
              style={{ fontFamily: 'var(--font-display)' }}
              onClick={onMobileClose}
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
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          aria-label="Close menu"
          onClick={onMobileClose}
        />
      ) : null}
    </>
  )
}
