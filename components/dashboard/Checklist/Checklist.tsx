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
      <h2 className="mb-4 font-display text-lg font-semibold text-white">Trip checklist</h2>
      <div className="section-card rounded-2xl border border-white/10 p-5">
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li key={t.label} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm ${
                  t.done
                    ? 'border-brand-cyan bg-brand-cyan/20 text-brand-cyan'
                    : 'border-white/20 text-transparent'
                }`}
              >
                ✓
              </span>
              <span className={t.done ? 'text-white/45 line-through' : 'text-white/85'}>{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
