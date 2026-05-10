'use client'

const destinations = [
  {
    name: 'Santorini',
    country: 'Greece',
    price: '$1,200',
    rating: '4.9',
    duration: '7 days',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
    tag: 'Trending',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    price: '$1,800',
    rating: '4.8',
    duration: '10 days',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    tag: 'Popular',
  },
  {
    name: 'Patagonia',
    country: 'Argentina',
    price: '$2,400',
    rating: '5.0',
    duration: '14 days',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    tag: 'Adventure',
  },
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    price: '$1,550',
    rating: '4.7',
    duration: '8 days',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80',
    tag: 'Romantic',
  },
]

export default function PopularDestinations() {
  return (
    <section className="py-28 px-6" id="destinations">
      <div className="max-w-7xl mx-auto">
        <div
          className="mb-16 flex flex-col justify-between reveal md:flex-row md:items-end"
          style={{ animationDelay: '0.06s' }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-blue-600 dark:bg-blue-500" />
              <span className="font-accent text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">Handpicked For You</span>
            </div>
            <h2 className="text-zinc-900 dark:text-zinc-100 text-5xl font-extrabold leading-tight tracking-tight lg:text-6xl">
              Popular
              <br />
              Destinations
            </h2>
          </div>
          <a
            href="/explore"
            className="group mt-8 flex items-center gap-3 font-accent text-sm text-zinc-600 dark:text-zinc-400 transition-colors hover:text-blue-600 dark:text-blue-400 md:mt-0"
          >
            <span className="uppercase tracking-widest text-xs">View all</span>
            <div className="w-8 h-8 rounded-full border border-black/5 dark:border-white/10 group-hover:border-accent-primary flex items-center justify-center transition-all group-hover:shadow-glow-sm">
              <span className="text-xs">→</span>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest, i) => (
            <div
              key={dest.name}
              className={`dest-card group cursor-pointer reveal ${i === 1 ? 'sm:translate-y-8' : ''}`}
              style={{ height: 480, animationDelay: `${0.1 + i * 0.09}s` }}
            >
              <img src={dest.image} alt={dest.name} />

              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full border border-accent-primary/25 bg-blue-600 dark:bg-blue-500/10 px-3 py-1 font-accent text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 backdrop-blur-md">
                  {dest.tag}
                </span>
              </div>

              <div className="card-content">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{dest.name}</h3>
                    <p className="mt-0.5 text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400">{dest.country}</p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">★ {dest.rating}</span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-4">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">{dest.duration}</span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    from <span className="text-blue-600 dark:text-blue-400">{dest.price}</span>
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