'use client'

export default function CTASection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden" id="cta">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80"
          alt="World map"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-brand-black" />
      </div>

      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #52E3E8, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #52E3E8, transparent 70%)' }} />

      <div className="relative z-10 mx-auto max-w-4xl text-center reveal" style={{ animationDelay: '0.08s' }}>
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-brand-cyan" />
          <span className="font-ui text-xs uppercase tracking-widest text-brand-cyan">Start Your Adventure</span>
          <div className="h-px w-8 bg-brand-cyan" />
        </div>

        <h2 className="mb-6 font-serif text-5xl font-bold leading-tight text-white lg:text-7xl">
          Start Planning Your
          <br />
          <span className="text-glow italic text-brand-cyan">Dream Journey</span>
          <br />
          Today
        </h2>

        <p className="mx-auto mb-12 max-w-xl font-ui text-base leading-relaxed text-white/55">
          Join 50,000+ travelers who use Traveloop to plan smarter, travel better, and experience more. Free forever, no
          credit card required.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/register"
            className="group flex items-center gap-3 rounded-full bg-brand-cyan px-10 py-5 font-ui text-sm font-semibold uppercase tracking-widest text-brand-black transition-all duration-300 hover:bg-white"
          >
            Create Free Account
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/explore"
            className="group flex items-center gap-3 rounded-full border border-white/15 px-10 py-5 font-ui text-sm font-semibold uppercase tracking-widest text-white/75 transition-all duration-300 hover:border-white hover:text-white"
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
              <span className="font-ui text-xs uppercase tracking-widest text-white/40">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}