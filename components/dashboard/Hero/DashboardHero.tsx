'use client'

import { useAuthProfile } from '../../../hooks/useAuthProfile'
import Link from 'next/link'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function DashboardHero() {
  const { displayName, loading } = useAuthProfile()

  const greeting = getGreeting()
  const name = loading ? '' : displayName.split(' ')[0]

  return (
    <section id="hero" className="section-card relative mb-8 overflow-hidden px-6 py-10 sm:px-10">
      {/* Subtle background accent */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.06] dark:opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }}
        aria-hidden
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between relative z-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 font-accent font-semibold">
            {greeting}{name ? `, ${name}` : ''}
          </p>
          <h1 className="text-zinc-900 dark:text-zinc-100 font-sans text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Your trips, budget &amp; calendar — in one calm place.
          </h1>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Plan multi-city routes, track spend, and stay on top of tasks without switching tabs.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard#trips"
            className="btn-primary px-5 py-2.5 text-sm rounded-xl"
          >
            Continue planning
          </Link>
          <Link
            href="/dashboard#explore"
            className="btn-glass px-5 py-2.5 text-sm"
          >
            Explore ideas
          </Link>
        </div>
      </div>
    </section>
  )
}
