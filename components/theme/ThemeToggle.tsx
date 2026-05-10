'use client'

import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-9 w-9" /> // Placeholder matching size
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/5 dark:border-white/10 bg-[#EAEAEA] dark:bg-[#1A1A1A] text-zinc-500 dark:text-zinc-400 transition-all hover:text-zinc-900 dark:text-zinc-100 hover:border-text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-base"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="material-symbols-outlined text-[18px]">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
