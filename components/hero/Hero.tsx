export function Hero() {
  return (
    <section className="section-card mb-6 grid gap-8 overflow-hidden px-6 py-16 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-20">
      <div className="grid gap-6">
        <p className="m-0 text-xs uppercase tracking-[0.18em] text-brand-cyan">Crafted for journeys</p>
        <h1 className="m-0 max-w-3xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
          Build travel experiences that feel cinematic.
        </h1>
        <p className="m-0 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
          Traveloop is a smart and user friendly multi city travel planning platform that helps you organize trips, manage destinations, schedule activities, track budgets, and share itineraries through a clean and responsive interface.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#experiences"
            className="rounded-full bg-brand-cyan px-5 py-3 font-semibold text-brand-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore trips
          </a>
          <a
            href="#stories"
            className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white/90 transition-colors duration-300 hover:border-white hover:text-white"
          >
            View stories
          </a>
        </div>
      </div>

      <div className="relative min-h-[320px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(82,227,232,0.12),rgba(255,255,255,0.04))] p-6">
        <div className="absolute right-6 top-8 w-44 rounded-3xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur-xl animate-float">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Live route</p>
          <p className="mt-3 text-2xl font-semibold text-white">12 stops</p>
          <p className="mt-2 text-sm text-white/60">A ready-made itinerary layout for your next trip.</p>
        </div>
        <div className="absolute bottom-8 left-6 w-52 rounded-3xl border border-white/10 bg-white/8 p-4 shadow-xl backdrop-blur-xl animate-float [animation-delay:1s]">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-cyan">Budget</p>
          <p className="mt-3 text-2xl font-semibold text-white">$2,450</p>
          <p className="mt-2 text-sm text-white/60">Track spend without leaving the planner.</p>
        </div>
      </div>
    </section>
  )
}
