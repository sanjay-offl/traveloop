const tasks = [
  { label: 'Passport & visas', done: true },
  { label: 'Adaptor & chargers', done: true },
  { label: 'Layered clothing', done: true },
  { label: 'Medications & first aid', done: false },
  { label: 'Copies of bookings (offline)', done: false },
  { label: 'Snacks & water bottle', done: false },
] as const

export function Checklist() {
  const packed = tasks.filter((t) => t.done).length
  const total = tasks.length
  const remaining = total - packed
  const pct = Math.round((packed / total) * 100)

  return (
    <section id="checklist" className="scroll-mt-24">
      <h3 className="mb-4 text-base font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
        Packing checklist
      </h3>
      <div className="card p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {packed}/{total}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              items packed · {remaining} remaining
            </p>
          </div>
          <span className="badge badge-cyan">{pct}% ready</span>
        </div>
        <div className="progress mb-5">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.label}
              className={`check-item ${t.done ? 'done' : ''}`}
            >
              <span className={`checkbox ${t.done ? 'checked' : ''}`}>{t.done ? '✓' : ''}</span>
              <span className={`text-sm ${t.done ? 'text-white/50 line-through' : 'text-white/90'}`}>{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
