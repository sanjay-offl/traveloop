const trips = [
  { name: 'Tokyo → Kyoto spring', dates: 'Apr 12 – Apr 24', progress: 72, status: 'Planning' },
  { name: 'Lisbon long weekend', dates: 'Jun 6 – Jun 9', progress: 40, status: 'Draft' },
  { name: 'Patagonia trek', dates: 'Nov 2 – Nov 18', progress: 18, status: 'Research' },
] as const

export function Trips() {
  return (
    <section id="trips" className="mb-8 scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-white">Your trips</h2>
        <button
          type="button"
          className="rounded-full border border-brand-cyan/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-cyan transition-colors hover:bg-brand-cyan/10"
        >
          New trip
        </button>
      </div>
      <div className="space-y-3">
        {trips.map((trip) => (
          <div
            key={trip.name}
            className="section-card flex flex-col gap-3 rounded-2xl border border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-white">{trip.name}</p>
              <p className="text-sm text-white/50">{trip.dates}</p>
              <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/55">
                {trip.status}
              </span>
            </div>
            <div className="w-full sm:max-w-xs">
              <div className="mb-1 flex justify-between text-xs text-white/45">
                <span>Itinerary</span>
                <span>{trip.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-cyan transition-all"
                  style={{ width: `${trip.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
