'use client'

import Link from 'next/link'
import { ThemeToggle } from '../../theme/ThemeToggle'
import { useAuthProfile } from '../../../hooks/useAuthProfile'
import { createClient } from '../../../utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { TravelloopLogo } from '../../ui/TravelloopLogo'

type DashboardHeaderProps = {
  onOpenNav: () => void
}

export function DashboardHeader({ onOpenNav }: DashboardHeaderProps) {
  const { displayName, initials, isAuthenticated, loading } = useAuthProfile()
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  async function handleSignOut() {
    if (signingOut) return
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    setOpen(false)
    setSigningOut(false)
    router.push('/login')
    router.refresh()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 lg:hidden"
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Mobile logo — only shown when sidebar is hidden */}
        <TravelloopLogo size={24} showText={false} className="lg:hidden" />

        {/* Search */}
        <div className="relative hidden min-w-0 flex-1 sm:block">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-xl">
            search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips, cities, bookings…"
            className="w-full max-w-md rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-blue-600/50 dark:focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-600/30 dark:focus:ring-blue-400/30 transition-all"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Notifications bell */}
          <Link
            href="/dashboard#notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 transition-all hover:border-blue-600/25 dark:hover:border-blue-400/25 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          </Link>

          {/* Account dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 py-1.5 pl-1.5 pr-3 transition-all hover:bg-black/10 dark:hover:bg-white/10"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)' }}
              >
                {loading ? '…' : initials}
              </span>
              <span className="hidden text-sm font-medium text-zinc-900 dark:text-zinc-100 sm:block max-w-[120px] truncate">
                {loading ? 'Loading…' : displayName}
              </span>
              <span className={`material-symbols-outlined shrink-0 text-lg text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A] py-1.5 shadow-xl shadow-black/10 dark:shadow-black/40"
              >
                <div className="px-4 py-2.5 border-b border-black/5 dark:border-white/10">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{displayName}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">Traveler</p>
                </div>
                <Link role="menuitem" href="/dashboard" className="block px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setOpen(false)}>
                  <span className="material-symbols-outlined text-base align-middle mr-2">dashboard</span>Dashboard
                </Link>
                <Link role="menuitem" href="/dashboard#profile" className="block px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setOpen(false)}>
                  <span className="material-symbols-outlined text-base align-middle mr-2">manage_accounts</span>Edit profile
                </Link>
                <div className="my-1 h-px bg-black/5 dark:bg-white/10" />
                {isAuthenticated ? (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-base align-middle mr-2">logout</span>
                    {signingOut ? 'Signing out…' : 'Sign out'}
                  </button>
                ) : (
                  <Link role="menuitem" href="/login" className="block px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
