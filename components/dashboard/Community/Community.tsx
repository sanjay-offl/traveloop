const sharedTrips = [
  {
    route: 'Lisbon → Porto → Douro',
    author: 'Elena M.',
    days: 9,
    saves: 128,
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=70',
  },
  {
    route: 'Hanoi street food loop',
    author: 'Minh T.',
    days: 5,
    saves: 342,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=70',
  },
  {
    route: 'Reykjavík south coast',
    author: 'Jon K.',
    days: 4,
    saves: 89,
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&q=70',
  },
] as const

export function Community() {
  return (
<<<<<<< HEAD
    <section id="community" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Community</h2>
      <div className="space-y-3">
        {threads.map((thread) => (
          <button
            key={thread.title}
            type="button"
            className="card-premium flex w-full items-center justify-between gap-4 p-4 text-left"
          >
            <div>
              <p className="font-medium text-white">{thread.title}</p>
              <p className="text-xs text-white/40">by {thread.author}</p>
            </div>
            <span className="shrink-0 rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-white/50 font-accent">
              {thread.replies} replies
            </span>
          </button>
=======
    <section id="community" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-base font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Shared community trips
          </h3>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>
            Popular routes you can duplicate into your planner
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sharedTrips.map((trip) => (
          <article
            key={trip.route}
            className="card group overflow-hidden p-0"
          >
            <div className="relative h-32 overflow-hidden">
              <img src={trip.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010302] to-transparent opacity-90" />
              <span className="badge badge-cyan absolute left-3 top-3 text-[10px]">Popular route</span>
            </div>
            <div className="p-4">
              <p className="font-medium text-white">{trip.route}</p>
              <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>
                by {trip.author} · {trip.days} days · {trip.saves} saves
              </p>
              <button
                type="button"
                className="btn-ghost mt-4 w-full py-2 text-xs font-semibold"
                style={{ color: 'var(--cyan)' }}
              >
                Copy trip to planner
              </button>
            </div>
          </article>
>>>>>>> origin/main
        ))}
      </div>
    </section>
  )
}
