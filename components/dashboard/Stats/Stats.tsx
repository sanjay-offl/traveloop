const items = [
  { label: 'Active trips', value: '3', delta: '+1 this month', icon: 'map' },
  { label: 'Spend (30d)', value: '$2,847', delta: 'Under budget', icon: 'payments' },
  { label: 'Tasks due', value: '7', delta: '2 high priority', icon: 'assignment' },
  { label: 'Countries', value: '12', delta: 'Lifetime', icon: 'public' },
] as const

export function Stats() {
  return (
    <section id="stats" className="mb-8 scroll-mt-24">
      <h2 className="mb-4 font-display text-lg font-semibold text-white">At a glance</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="section-card flex gap-4 rounded-2xl border border-white/10 p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan">
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/45">{item.label}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-0.5 text-xs text-white/50">{item.delta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
