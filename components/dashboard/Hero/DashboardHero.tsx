import Link from 'next/link'

export function DashboardHero() {
  return (
    <section
      id="hero"
      className="relative mb-8 overflow-hidden rounded-2xl border border-white/10"
      style={{ borderColor: 'var(--card-border)' }}
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(1,3,2,0.92) 0%, rgba(1,3,2,0.75) 45%, rgba(1,3,2,0.55) 100%)',
          }}
        />
      </div>

      <div className="relative px-6 py-12 sm:px-10 sm:py-14">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--cyan)' }}>
          Your next adventure starts here
        </p>
        <h1
          className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.5rem]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Go where the map whispers your name — plan boldly, travel lightly.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          Shape itineraries, watch your budget breathe, and keep every flight, stay, and hike in one timeline.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard#create-trip"
            className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm"
          >
            Create trip
          </Link>
          <Link href="/dashboard#explore" className="btn-ghost inline-flex items-center justify-center px-6 py-3 text-sm">
            Explore destinations
          </Link>
        </div>
      </div>
    </section>
  )
}
