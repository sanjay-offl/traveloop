import Link from 'next/link'

export function DashboardHero() {
  return (
<<<<<<< HEAD
    <section id="hero" className="section-card relative mb-8 overflow-hidden px-6 py-10 sm:px-10">
      <div className="glow-orb w-[350px] h-[350px] -top-32 -right-32 bg-brand-primary/10" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between relative z-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-accent font-accent font-semibold">Good afternoon</p>
          <h1 className="heading-gradient font-sans text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Your trips, budget, and calendar in one calm place.
          </h1>
          <p className="text-sm leading-relaxed text-white/50 sm:text-base">
            Plan multi-city routes, track spend, and stay on top of tasks without switching tabs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard#trips"
            className="btn-primary-gradient px-5 py-2.5 text-sm"
=======
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
>>>>>>> origin/main
          >
            Create trip
          </Link>
<<<<<<< HEAD
          <Link
            href="/dashboard#explore"
            className="btn-glass px-5 py-2.5 text-sm"
          >
            Explore ideas
=======
          <Link href="/dashboard#explore" className="btn-ghost inline-flex items-center justify-center px-6 py-3 text-sm">
            Explore destinations
>>>>>>> origin/main
          </Link>
        </div>
      </div>
    </section>
  )
}
