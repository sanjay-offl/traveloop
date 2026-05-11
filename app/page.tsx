'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '../components/theme/ThemeToggle'
import { TravelloopLogo } from '../components/ui/TravelloopLogo'
import { createClient } from '../utils/supabase/client'

export default function AuthPage() {
  const router = useRouter()

  // Check if already signed in — redirect to dashboard
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace('/dashboard')
    })
  }, [router])

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full opacity-[0.05] dark:opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent)', filter: 'blur(60px)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full opacity-[0.04] dark:opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #818CF8, transparent)', filter: 'blur(60px)' }}
        aria-hidden
      />

      {/* Theme toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="section-card px-8 py-12 sm:px-10 sm:py-14">
          <div className="text-center mb-10">
            {/* Logo */}
            <div className="mx-auto mb-6 flex justify-center">
              <TravelloopLogo size={48} showText={false} />
            </div>
            <h1 className="text-[var(--text-primary)] text-4xl font-extrabold tracking-tight mb-2 font-sans">
              Traveloop
            </h1>
            <p className="text-[var(--accent-primary)] text-base font-accent font-medium">Smart Travel Planning</p>
            <p className="text-[var(--text-secondary)] mt-3 text-sm leading-relaxed">
              Organize trips, manage destinations, and share itineraries — all in one place.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/login"
              className="btn-primary w-full block text-center py-3.5 text-base rounded-xl"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="btn-glass w-full block text-center py-3.5 text-base"
            >
              Create Account — Free
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              First time here? Create a free account to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}