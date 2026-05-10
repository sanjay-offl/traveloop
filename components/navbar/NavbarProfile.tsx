'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export function NavbarProfile() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 py-1.5 pl-1.5 pr-3 text-left transition-all duration-300 hover:border-text-secondary/30 hover:bg-black/10 dark:hover:bg-white/10 hover:shadow-glow-sm"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)' }}
          aria-hidden
        >
          JL
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Jordan Lee</span>
          <span className="block truncate text-xs text-zinc-600 dark:text-zinc-400">Traveler</span>
        </span>
        <span
          className={`material-symbols-outlined shrink-0 text-lg text-zinc-400 dark:text-zinc-500 transition-transform duration-200 sm:text-xl ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          expand_more
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-[60] mt-2 w-56 rounded-2xl border border-black/5 dark:border-white/10 bg-[#EAEAEA] dark:bg-[#1A1A1A] py-2 shadow-2xl shadow-black/10 dark:shadow-black/40 backdrop-blur-xl"
        >
          <Link
            role="menuitem"
            href="/login"
            className="block px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-600 dark:text-blue-400"
            onClick={() => setOpen(false)}
          >
            Account &amp; settings
          </Link>
          <Link
            role="menuitem"
            href="#destinations"
            className="block px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-600 dark:text-blue-400"
            onClick={() => setOpen(false)}
          >
            Saved trips
          </Link>
          <div className="my-1 h-px bg-border-subtle" />
          <Link
            role="menuitem"
            href="/"
            className="block px-4 py-2.5 text-sm text-zinc-400 dark:text-zinc-500 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:text-zinc-100"
            onClick={() => setOpen(false)}
          >
            Sign out
          </Link>
        </div>
      ) : null}
    </div>
  )
}
