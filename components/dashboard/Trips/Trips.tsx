const trips = [
  { name: 'Tokyo → Kyoto spring', dates: 'Apr 12 – Apr 24', progress: 72, status: 'Planning', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&q=80' },
  { name: 'Lisbon long weekend', dates: 'Jun 6 – Jun 9', progress: 40, status: 'Draft', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&q=80' },
  { name: 'Patagonia trek', dates: 'Nov 2 – Nov 18', progress: 18, status: 'Research', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&q=80' },
] as const

export function Trips() {
  return (
    <section id="trips" className="mb-8 scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-xl font-bold tracking-tight">Your trips</h2>
        <button
          type="button"
          className="rounded-full border border-black/5 dark:border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 transition-all hover:bg-black/5 dark:hover:bg-white/5 font-accent"
        >
          New trip
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.name}
            className="card-premium flex flex-col overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="h-32 w-full relative overflow-hidden">
              <img src={trip.image} alt={trip.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-4 rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white font-accent">
                {trip.status}
              </span>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <p className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-1">{trip.name}</p>
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                {trip.dates}
              </div>
              
              <div className="mt-auto">
                <div className="mb-2 flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span>Itinerary Progress</span>
                  <span className="text-blue-600 dark:text-blue-400">{trip.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-1000 bg-blue-600 dark:bg-blue-500"
                    style={{ width: `${trip.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
