export function Hero() {
  return (
    <section className="section-card relative mb-6 grid gap-8 overflow-hidden px-6 py-16 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-20">
      {/* Ambient glow */}
      <div className="glow-orb w-[400px] h-[400px] -top-32 -left-32 bg-brand-primary/15" />
      <div className="glow-orb w-[300px] h-[300px] bottom-0 right-0 bg-brand-purple/10" />

      <div className="relative z-10 grid gap-6">
        <p className="m-0 text-xs uppercase tracking-[0.18em] text-brand-accent font-accent font-semibold">Crafted for journeys</p>
        <h1 className="heading-gradient m-0 max-w-3xl font-sans text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          Build travel experiences that feel cinematic.
        </h1>
        <p className="m-0 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
          Traveloop is a smart and user friendly multi city travel planning platform that helps you organize trips, manage destinations, schedule activities, track budgets, and share itineraries through a clean and responsive interface.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#experiences"
            className="btn-primary-gradient"
          >
            Explore trips
          </a>
          <a
            href="#stories"
            className="btn-glass"
          >
            View stories
          </a>
        </div>
      </div>

      <div className="relative z-10 min-h-[320px] rounded-3xl border border-white/[0.08] p-6" style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.08), rgba(56,189,248,0.04))' }}>
        <div className="absolute right-6 top-8 w-44 card-premium p-4 shadow-xl animate-float">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-accent">Live route</p>
          <p className="mt-3 text-2xl font-bold text-white">12 stops</p>
          <p className="mt-2 text-sm text-white/50">A ready-made itinerary layout for your next trip.</p>
        </div>
        <div className="absolute bottom-8 left-6 w-52 card-premium p-4 shadow-xl animate-float [animation-delay:1s]">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-accent font-accent">Budget</p>
          <p className="mt-3 text-2xl font-bold text-white">$2,450</p>
          <p className="mt-2 text-sm text-white/50">Track spend without leaving the planner.</p>
        </div>
      </div>
    </section>
  )
}
