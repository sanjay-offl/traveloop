'use client'

const destinations = [
  { name: 'Santorini', country: 'Greece', rating: 4.9, cost: '$1,200', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&q=70', tag: 'Trending' },
  { name: 'Kyoto', country: 'Japan', rating: 4.8, cost: '$1,800', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=70', tag: 'Cultural' },
  { name: 'Patagonia', country: 'Argentina', rating: 5.0, cost: '$2,400', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=70', tag: 'Adventure' },
  { name: 'Amalfi', country: 'Italy', rating: 4.7, cost: '$1,550', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&q=70', tag: 'Romantic' },
]

const tagColors: Record<string, { text: string; bg: string }> = {
  Trending: { text: '#60A5FA', bg: 'rgba(59,130,246,0.15)' },
  Cultural: { text: '#A78BFA', bg: 'rgba(139,92,246,0.15)' },
  Adventure: { text: '#4ADE80', bg: 'rgba(74,222,128,0.15)' },
  Romantic: { text: '#F87171', bg: 'rgba(248,113,113,0.15)' },
}

export function Explore() {
  return (
    <section id="explore" className="mb-8 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Explore Destinations</h2>
        <button className="btn-ghost text-xs px-3 py-1.5">Browse all</button>
      </div>
      <div className="card-premium p-5">
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-4 font-accent">Handpicked for you</p>

        <div className="grid grid-cols-2 gap-3">
          {destinations.map((dest) => {
            const tc = tagColors[dest.tag]
            return (
              <div
                key={dest.name}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ height: 160 }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay — always dark for text readability */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.20) 55%, transparent 100%)' }}
                />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold font-accent backdrop-blur-md"
                    style={{ background: tc.bg, color: tc.text }}
                  >
                    {dest.tag}
                  </span>
                </div>

                {/* Info — always white text since we're over a dark overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">{dest.name}</div>
                      <div className="text-xs text-white/70">{dest.country}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-yellow-300">★ {dest.rating}</div>
                      <div className="text-xs text-white/90 font-medium">{dest.cost}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Explore