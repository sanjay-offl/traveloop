import Link from 'next/link'

export function DashboardHero() {
  return (
    <section id="hero" className="section-card relative mb-8 overflow-hidden px-6 py-10 sm:px-10">
      
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between relative z-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 font-accent font-semibold">Good afternoon</p>
          <h1 className="text-zinc-900 dark:text-zinc-100 font-sans text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Your trips, budget, and calendar in one calm place.
          </h1>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
            Plan multi-city routes, track spend, and stay on top of tasks without switching tabs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard#trips"
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:scale-105 transition-transform px-5 py-2.5 text-sm"
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
