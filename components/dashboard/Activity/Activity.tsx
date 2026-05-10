const rows = [
  { action: 'Added Kyoto & Nara to your Japan trip', when: '1h ago', icon: 'location_on' },
  { action: 'Updated Rome budget · +$240 activities', when: '4h ago', icon: 'payments' },
  { action: 'Shared “Amalfi week” with Priya', when: 'Yesterday', icon: 'ios_share' },
  { action: 'Completed task · Travel insurance', when: '2d ago', icon: 'task_alt' },
] as const

export function Activity() {
  return (
<<<<<<< HEAD
    <section id="activity" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Recent activity</h2>
      <ul className="card-premium divide-y divide-white/[0.06]">
        {rows.map((row) => (
          <li key={row.action} className="flex items-center gap-4 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-brand-accent" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(56,189,248,0.08))' }}>
=======
    <section id="activity" className="scroll-mt-24">
      <h3 className="mb-4 text-base font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
        Recent activity
      </h3>
      <ul className="card overflow-hidden p-0">
        {rows.map((row, i) => (
          <li
            key={row.action}
            className="flex items-center gap-4 px-5 py-4"
            style={{ borderTop: i ? '1px solid var(--card-border)' : undefined }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: 'rgba(82,227,232,0.1)', color: 'var(--cyan)' }}
            >
>>>>>>> origin/main
              <span className="material-symbols-outlined text-xl">{row.icon}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{row.action}</p>
<<<<<<< HEAD
              <p className="text-xs text-white/40">{row.when}</p>
=======
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                {row.when}
              </p>
>>>>>>> origin/main
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
