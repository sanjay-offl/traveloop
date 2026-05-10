const alerts = [
  { title: 'Price drop on NRT–KIX', body: 'Save ~$38 if you book this week.', unread: true },
  { title: 'Check-in opens in 24h', body: 'Flight JL041 · reminder set.', unread: true },
  { title: 'Budget threshold', body: 'Flights are at 90% of category cap.', unread: false },
] as const

export function Notifications() {
  return (
    <section id="notifications" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Notifications</h2>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.title}
            className={`card-premium p-4 ${
              a.unread ? 'border-brand-accent/25 bg-brand-accent/[0.04]' : ''
            }`}
          >
            <div className="flex gap-3">
              {a.unread ? (
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-accent shadow-glow-sm" aria-hidden />
              ) : (
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/15" aria-hidden />
              )}
              <div>
                <p className="font-medium text-white">{a.title}</p>
                <p className="mt-1 text-sm text-white/45">{a.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
