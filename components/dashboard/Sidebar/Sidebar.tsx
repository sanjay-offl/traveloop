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
        className={`fixed top-4 bottom-4 left-4 z-40 flex w-64 flex-col rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#111111] shadow-xl transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-black/5 dark:border-white/10 px-5">
          <Link href="/dashboard" className="font-sans text-lg font-bold tracking-tight" onClick={onMobileClose}>
            <span className="text-zinc-900 dark:text-zinc-100">Traveloop</span>
          </Link>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-accent" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(56,189,248,0.10))' }}>
            Dashboard
          </span>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Dashboard">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-all hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:text-zinc-100"
            >
              <span className="material-symbols-outlined text-xl text-[inherit]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-black/5 dark:border-white/10 p-3">
          <Link
            href="/home"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 transition-all hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:text-zinc-100"
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
