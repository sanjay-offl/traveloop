export function Hero() {
  return (
    <section className="section-card relative mb-6 grid gap-8 overflow-hidden px-6 py-16 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-20">
      {/* Ambient glow */}
      
      

      <div className="relative z-10 grid gap-6">
        <p className="m-0 text-xs uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 font-accent font-semibold">Crafted for journeys</p>
        <h1 className="text-zinc-900 dark:text-zinc-100 m-0 max-w-3xl font-sans text-6xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          Build travel experiences that feel cinematic.
        </h1>
        <p className="m-0 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
          Traveloop is a smart and user friendly multi city travel planning platform that helps you organize trips, manage destinations, schedule activities, track budgets, and share itineraries through a clean and responsive interface.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#experiences"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold rounded-xl hover:scale-105 transition-all"
          >
            Explore trips
          </a>
          <a
            href="#stories"
            className="bg-black text-white dark:bg-white dark:text-black border border-black/5 dark:border-white/10 px-6 py-3 text-sm font-semibold rounded-xl hover:scale-105 transition-all"
          >
            View stories
          </a>
        </div>
      </div>

      <div className="relative z-10 min-h-[320px] rounded-3xl border border-black/5 dark:border-white/10 p-6 bg-white dark:bg-[#111111]">
        <div className="absolute right-6 top-8 w-44 card-premium p-4 shadow-xl animate-float">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-accent">Live route</p>
          <div className="my-3 border-t border-black/5 dark:border-white/10" />
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">A ready-made itinerary layout for your next trip.</p>
        </div>
        <div className="absolute bottom-8 left-6 w-52 card-premium p-4 shadow-xl animate-float [animation-delay:1s]">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 font-accent">Budget</p>
          <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">$2,450</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Track spend without leaving the planner.</p>
        </div>
      </div>
    </section>
  )
}
