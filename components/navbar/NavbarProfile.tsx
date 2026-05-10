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
        className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-3 text-left transition-colors hover:border-white/20 hover:bg-white/[0.09]"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan/90 to-brand-cyan/40 text-sm font-semibold text-brand-black"
          aria-hidden
        >
          JL
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-medium text-white">Jordan Lee</span>
          <span className="block truncate text-xs text-white/45">Traveler</span>
        </span>
        <span
          className={`material-symbols-outlined shrink-0 text-lg text-white/50 transition-transform duration-200 sm:text-xl ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          expand_more
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-[60] mt-2 w-56 rounded-2xl border border-white/10 bg-brand-black/95 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <Link
            role="menuitem"
            href="/login"
            className="block px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-brand-cyan"
            onClick={() => setOpen(false)}
          >
            Account &amp; settings
          </Link>
          <Link
            role="menuitem"
            href="#destinations"
            className="block px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-brand-cyan"
            onClick={() => setOpen(false)}
          >
            Saved trips
          </Link>
          <div className="my-1 h-px bg-white/10" />
          <Link
            role="menuitem"
            href="/"
            className="block px-4 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
            onClick={() => setOpen(false)}
          >
            Sign out
          </Link>
        </div>
      ) : null}
    </div>
  )
}
