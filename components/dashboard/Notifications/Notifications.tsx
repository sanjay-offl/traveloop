const alerts = [
  { title: 'Price drop on NRT–KIX', body: 'Save ~$38 if you book this week.', unread: true },
  { title: 'Check-in opens in 24h', body: 'Flight JL041 · reminder set.', unread: true },
  { title: 'Budget threshold', body: 'Flights are at 90% of category cap.', unread: false },
] as const

export function Notifications() {
  return (
    <section id="notifications" className="mb-8 scroll-mt-24">
      <h2 className="mb-4 font-display text-lg font-semibold text-white">Notifications</h2>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.title}
            className={`section-card rounded-2xl border p-4 ${
              a.unread ? 'border-brand-cyan/35 bg-brand-cyan/[0.06]' : 'border-white/10'
            }`}
          >
            <div className="flex gap-3">
              {a.unread ? (
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-cyan" aria-hidden />
              ) : (
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/20" aria-hidden />
              )}
              <div>
                <p className="font-medium text-white">{a.title}</p>
                <p className="mt-1 text-sm text-white/55">{a.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
