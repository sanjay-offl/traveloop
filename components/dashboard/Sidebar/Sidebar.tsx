'use client'

import Link from 'next/link'

const nav = [
  { href: '/dashboard#hero', label: 'Overview', icon: 'dashboard' },
  { href: '/dashboard#stats', label: 'Stats', icon: 'analytics' },
  { href: '/dashboard#trips', label: 'Trips', icon: 'luggage' },
  { href: '/dashboard#budget', label: 'Budget', icon: 'account_balance_wallet' },
  { href: '/dashboard#calendar', label: 'Calendar', icon: 'calendar_month' },
  { href: '/dashboard#explore', label: 'Explore', icon: 'travel_explore' },
  { href: '/dashboard#activity', label: 'Activity', icon: 'bolt' },
  { href: '/dashboard#checklist', label: 'Checklist', icon: 'checklist' },
  { href: '/dashboard#community', label: 'Community', icon: 'groups' },
  { href: '/dashboard#notifications', label: 'Alerts', icon: 'notifications' },
] as const

type SidebarProps = {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[0.06] bg-[#0B1220]/95 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
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
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition-all hover:bg-white/[0.05] hover:text-white hover:shadow-glow-sm"
            >
              <span className="material-symbols-outlined text-xl text-[inherit]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/[0.06] p-3">
          <Link
            href="/home"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Back to site
          </Link>
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
