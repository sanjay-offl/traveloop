const rows = [
  { action: 'Updated Tokyo lodging', when: '2h ago', icon: 'hotel' },
  { action: 'Shared itinerary with Aria', when: 'Yesterday', icon: 'share' },
  { action: 'Added budget line · Rail pass', when: '2d ago', icon: 'train' },
  { action: 'Completed checklist · Visas', when: '3d ago', icon: 'task_alt' },
] as const

export function Activity() {
  return (
    <section id="activity" className="mb-8 scroll-mt-24">
      <h2 className="mb-4 font-display text-lg font-semibold text-white">Recent activity</h2>
      <ul className="section-card divide-y divide-white/10 rounded-2xl border border-white/10">
        {rows.map((row) => (
          <li key={row.action} className="flex items-center gap-4 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-brand-cyan">
              <span className="material-symbols-outlined text-xl">{row.icon}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{row.action}</p>
              <p className="text-xs text-white/45">{row.when}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
