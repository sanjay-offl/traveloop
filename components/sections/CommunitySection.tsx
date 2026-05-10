'use client'

const communityTrips = [
  {
    user: { name: 'Aria Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80' },
    destination: 'Southeast Asia Loop',
    duration: '21 days',
    countries: 5,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    likes: 284,
  },
  {
    user: { name: 'Marco Rossi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80' },
    destination: 'Scandinavian Road Trip',
    duration: '14 days',
    countries: 3,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
    likes: 197,
  },
  {
    user: { name: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80' },
    destination: 'Morocco Desert Journey',
    duration: '10 days',
    countries: 1,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80',
    likes: 431,
  },
]

const marqueeItems = [
  'Santorini 🇬🇷', 'Bali 🇮🇩', 'Iceland 🇮🇸', 'Morocco 🇲🇦',
  'Japan 🇯🇵', 'Peru 🇵🇪', 'Portugal 🇵🇹', 'Thailand 🇹🇭',
  'New Zealand 🇳🇿', 'Colombia 🇨🇴', 'Croatia 🇭🇷', 'Vietnam 🇻🇳',
]

export default function CommunitySection() {
  return (
    <section className="py-28 bg-brand-black overflow-hidden" id="community">
      <div className="mb-20 py-4 border-y border-white/5 overflow-hidden">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex-shrink-0 font-ui text-sm uppercase tracking-widest text-white/35">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div
          className="mb-16 flex flex-col justify-between reveal md:flex-row md:items-end"
          style={{ animationDelay: '0.06s' }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-brand-cyan" />
              <span className="font-ui text-xs uppercase tracking-widest text-brand-cyan">Community Picks</span>
            </div>
            <h2 className="font-serif text-5xl font-bold text-white lg:text-6xl">
              Shared by
              <br />
              <span className="italic text-white/45">Fellow Explorers</span>
            </h2>
          </div>
          <a
            href="/community"
            className="group mt-8 flex items-center gap-3 font-ui text-sm text-white/50 transition-colors hover:text-brand-cyan md:mt-0"
          >
            <span className="uppercase tracking-widest text-xs">See all trips</span>
            <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-brand-cyan flex items-center justify-center transition-colors">
              <span className="text-xs">→</span>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {communityTrips.map((trip, i) => (
            <div
              key={trip.destination}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] reveal transition-transform duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${0.1 + i * 0.09}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div
                  className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{ background: 'rgba(1,3,2,0.72)', backdropFilter: 'blur(8px)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#52E3E8">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-white text-xs font-semibold">{trip.likes}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={trip.user.avatar} alt={trip.user.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-xs text-white/45">{trip.user.name}</span>
                </div>

                <h3 className="mb-3 font-serif text-lg font-bold text-white">{trip.destination}</h3>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52E3E8" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {trip.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52E3E8" strokeWidth="2">
                      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                    {trip.countries} {trip.countries === 1 ? 'country' : 'countries'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}