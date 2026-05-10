'use client'

export default function CTASection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden" id="cta">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80"
          alt="World map"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-brand-black" />
      </div>

      <div className="glow-orb w-[400px] h-[400px] top-0 left-1/4 bg-brand-primary/12" />
      <div className="glow-orb w-[300px] h-[300px] bottom-0 right-1/4 bg-brand-purple/10" />

      <div className="relative z-10 mx-auto max-w-4xl text-center reveal" style={{ animationDelay: '0.08s' }}>
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-brand-accent" />
          <span className="font-accent text-xs uppercase tracking-widest text-brand-accent font-semibold">Start Your Adventure</span>
          <div className="h-px w-8 bg-brand-accent" />
        </div>

        <h2 className="heading-gradient mb-6 text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl">
          Start Planning Your
          <br />
          Dream Journey
          <br />
          Today
        </h2>

        <p className="mx-auto mb-12 max-w-xl font-sans text-base leading-relaxed text-white/45">
          Join 50,000+ travelers who use Traveloop to plan smarter, travel better, and experience more. Free forever, no
          credit card required.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/register"
            className="btn-primary-gradient px-10 py-5 text-sm font-semibold uppercase tracking-widest group"
          >
            Create Free Account
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/explore"
            className="btn-glass px-10 py-5 text-sm font-semibold uppercase tracking-widest"
          >
            Browse Destinations
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: '🔒', text: 'No Credit Card' },
            { icon: '⚡', text: 'Setup in 2 min' },
            { icon: '🌍', text: '120+ Countries' },
            { icon: '💬', text: '24/7 Support' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2">
              <span className="text-lg">{badge.icon}</span>
              <span className="font-accent text-xs uppercase tracking-widest text-white/35">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}