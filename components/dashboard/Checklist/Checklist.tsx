const tasks = [
  { label: 'Passport valid 6+ months', done: true },
  { label: 'Travel insurance quote', done: true },
  { label: 'eSIM or pocket Wi‑Fi', done: false },
  { label: 'ATM notify bank', done: false },
  { label: 'Download offline maps', done: false },
] as const

export function Checklist() {
  return (
    <section id="checklist" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Trip checklist</h2>
      <div className="card-premium p-5">
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li key={t.label} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm transition-all ${
                  t.done
                    ? 'border-brand-accent bg-brand-accent/15 text-brand-accent'
                    : 'border-white/15 text-transparent'
                }`}
              >
                ✓
              </span>
              <span className={t.done ? 'text-white/40 line-through' : 'text-white/80'}>{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
