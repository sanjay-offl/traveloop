'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthProfile } from '../../../hooks/useAuthProfile'
import { createClient } from '../../../utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const nav = [
  { href: '/dashboard', label: 'Overview', icon: 'dashboard' },
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
  const pathname = usePathname()
  const { displayName, initials, isAuthenticated } = useAuthProfile()
  const [signingOut, setSigningOut] = useState(false)
  const router = useRouter()

  async function handleSignOut() {
    if (signingOut) return
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    setSigningOut(false)
    onMobileClose()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      <aside
        className={`fixed top-4 bottom-4 left-4 z-40 flex w-[17rem] flex-col rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#111111] shadow-xl shadow-black/5 dark:shadow-black/30 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-black/5 dark:border-white/10 px-5">
          <Link href="/dashboard" className="font-sans text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100" onClick={onMobileClose}>
            Traveloop
          </Link>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-600/8 dark:bg-blue-400/10 border border-blue-600/15 dark:border-blue-400/20 font-accent">
            Dashboard
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3 sidebar-scroll" aria-label="Dashboard navigation">
          {nav.map((item) => {
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : false
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/8 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-600/12 dark:border-blue-500/15'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <span className={`material-symbols-outlined text-xl flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 border-t border-black/5 dark:border-white/10 p-3 space-y-1">
          <Link
            href="/home"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500 dark:text-zinc-500 transition-all hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-800 dark:hover:text-zinc-300"
            onClick={onMobileClose}
          >
            <span className="material-symbols-outlined text-xl flex-shrink-0">arrow_back</span>
            Back to site
          </Link>

          {/* User mini-card */}
          {isAuthenticated && (
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-black/3 dark:bg-white/3 border border-black/5 dark:border-white/8">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)' }}
              >
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{displayName}</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-500">Traveler</p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                title="Sign out"
                className="text-zinc-400 dark:text-zinc-500 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-label="Close menu"
          onClick={onMobileClose}
        />
      )}
    </>
  )
}
