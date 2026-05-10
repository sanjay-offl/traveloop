const rows = [
  { action: 'Updated Tokyo lodging', when: '2h ago', icon: 'hotel' },
  { action: 'Shared itinerary with Aria', when: 'Yesterday', icon: 'share' },
  { action: 'Added budget line · Rail pass', when: '2d ago', icon: 'train' },
  { action: 'Completed checklist · Visas', when: '3d ago', icon: 'task_alt' },
] as const

export function Activity() {
  return (
    <section id="activity" className="mb-8 scroll-mt-24">
      <h2 className="text-zinc-900 dark:text-zinc-100 mb-4 text-lg font-extrabold tracking-tight">Recent activity</h2>
      <ul className="card-premium divide-y divide-white/[0.06]">
        {rows.map((row) => (
          <li key={row.action} className="flex items-center gap-4 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-blue-600 dark:text-blue-400" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(56,189,248,0.08))' }}>
              <span className="material-symbols-outlined text-xl">{row.icon}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{row.action}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{row.when}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
