import Link from 'next/link'

export function DashboardHero() {
  return (
    <section id="hero" className="section-card mb-8 overflow-hidden px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-cyan">Good afternoon</p>
          <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Your trips, budget, and calendar in one calm place.
          </h1>
          <p className="text-sm leading-relaxed text-white/60 sm:text-base">
            Plan multi-city routes, track spend, and stay on top of tasks without switching tabs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard#trips"
            className="rounded-full bg-brand-cyan px-5 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-cyan/90"
          >
            Continue planning
          </Link>
          <Link
            href="/dashboard#explore"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-brand-cyan/40 hover:text-brand-cyan"
          >
            Explore ideas
          </Link>
        </div>
      </div>
    </section>
  )
}
