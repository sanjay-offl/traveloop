const items = [
  { label: 'Active trips', value: '3', delta: '+1 this month', icon: 'map' },
  { label: 'Spend (30d)', value: '$2,847', delta: 'Under budget', icon: 'payments' },
  { label: 'Tasks due', value: '7', delta: '2 high priority', icon: 'assignment' },
  { label: 'Countries', value: '12', delta: 'Lifetime', icon: 'public' },
] as const

export function Stats() {
  return (
    <section id="stats" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">At a glance</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="card-premium flex gap-4 p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-brand-accent" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(56,189,248,0.10))' }}>
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40 font-accent">{item.label}</p>
              <p className="mt-1 font-sans text-2xl font-bold text-white">{item.value}</p>
              <p className="mt-0.5 text-xs text-white/45">{item.delta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
