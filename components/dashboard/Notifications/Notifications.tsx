const alerts = [
  {
    kind: 'flight' as const,
    title: 'Flight reminder · JL041',
    body: 'Check-in opens in 24 hours. Seat 12A confirmed.',
    unread: true,
  },
  {
    kind: 'budget' as const,
    title: 'Budget alert · Flights',
    body: 'You’ve used 90% of your flight budget for the Rome trip.',
    unread: true,
  },
  {
    kind: 'trip' as const,
    title: 'Trip update',
    body: 'Aria commented on your shared “Tokyo spring” itinerary.',
    unread: false,
  },
] as const

const kindIcon = {
  flight: 'flight',
  budget: 'account_balance_wallet',
  trip: 'map',
} as const

export function Notifications() {
  return (
<<<<<<< HEAD
    <section id="notifications" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Notifications</h2>
=======
    <section id="notifications" className="scroll-mt-24">
      <h3 className="mb-4 text-base font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
        Notifications
      </h3>
>>>>>>> origin/main
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.title}
<<<<<<< HEAD
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
=======
            className="card flex gap-3 p-4"
            style={{
              borderColor: a.unread ? 'rgba(82,227,232,0.35)' : 'var(--card-border)',
              background: a.unread ? 'rgba(82,227,232,0.06)' : undefined,
            }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: 'rgba(82,227,232,0.12)', color: 'var(--cyan)' }}
            >
              <span className="material-symbols-outlined text-xl">{kindIcon[a.kind]}</span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {a.unread ? <span className="notif-dot" /> : null}
                <p className="font-medium text-white">{a.title}</p>
>>>>>>> origin/main
              </div>
              <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                {a.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
