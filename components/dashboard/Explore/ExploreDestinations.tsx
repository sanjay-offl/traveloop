'use client'

const destinations = [
  { name: 'Santorini', country: 'Greece', rating: 4.9, cost: '$1,200', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&q=70', tag: 'Trending' },
  { name: 'Kyoto', country: 'Japan', rating: 4.8, cost: '$1,800', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=70', tag: 'Cultural' },
  { name: 'Patagonia', country: 'Argentina', rating: 5.0, cost: '$2,400', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=70', tag: 'Adventure' },
  { name: 'Amalfi', country: 'Italy', rating: 4.7, cost: '$1,550', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&q=70', tag: 'Romantic' },
]

const tagColors: Record<string, { text: string; bg: string }> = {
  Trending: { text: '#38BDF8', bg: 'rgba(56,189,248,0.12)' },
  Cultural: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  Adventure: { text: '#86EFAC', bg: 'rgba(134,239,172,0.12)' },
  Romantic: { text: '#F87171', bg: 'rgba(248,113,113,0.12)' },
}

export function Explore() {
  return (
    <section id="explore" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Explore Destinations</h2>
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-white/40 font-accent">Handpicked for you</p>
          <button className="btn-glass px-4 py-2 text-xs font-accent">Browse all</button>
        </div>

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
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,18,32,0.9) 0%, transparent 60%)' }} />

                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium font-accent backdrop-blur-md"
                    style={{ background: tc.bg, color: tc.text, fontSize: 10 }}
                  >
                    {dest.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">{dest.name}</div>
                      <div className="text-xs text-white/40">{dest.country}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-brand-accent">★ {dest.rating}</div>
                      <div className="text-xs text-white font-medium">{dest.cost}</div>
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