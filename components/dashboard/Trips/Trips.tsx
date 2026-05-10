'use client'

const trips = [
  {
    id: 1,
    name: 'Rome & Amalfi Coast',
    country: 'Italy',
    dates: 'Jun 14 – Jun 24',
    budget: '$2,400',
    spent: 1560,
    total: 2400,
    progress: 65,
    status: 'upcoming',
    tag: 'In 12 days',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=70',
    days: 10,
  },
  {
    id: 2,
    name: 'Tokyo & Kyoto',
    country: 'Japan',
    dates: 'Aug 3 – Aug 16',
    budget: '$3,200',
    spent: 400,
    total: 3200,
    progress: 12,
    status: 'planning',
    tag: 'Planning',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=70',
    days: 13,
  },
  {
    id: 3,
    name: 'Bali Retreat',
    country: 'Indonesia',
    dates: 'Sep 18 – Sep 28',
    budget: '$1,800',
    spent: 0,
    total: 1800,
    progress: 5,
    status: 'idea',
    tag: 'Idea',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=70',
    days: 10,
  },
]

const statusColors = {
  upcoming: { text: '#52E3E8', bg: 'rgba(82,227,232,0.1)', border: 'rgba(82,227,232,0.2)' },
  planning: { text: '#C084FC', bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.2)' },
  idea:     { text: '#FCD34D', bg: 'rgba(252,211,77,0.1)', border: 'rgba(252,211,77,0.2)' },
} as const

type TripStatus = keyof typeof statusColors

export default function Trips() {
  return (
    <div id="trips" className="card scroll-mt-24 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-medium text-white" style={{ fontFamily: 'Fraunces, serif' }}>Upcoming Trips</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>3 trips in the pipeline</p>
        </div>
        <button className="btn-ghost px-4 py-2 text-xs" style={{ color: 'var(--text)' }}>View all</button>
      </div>

      {/* Trip list */}
      <div className="flex flex-col gap-4">
        {trips.map((trip) => {
          const sc = statusColors[trip.status as TripStatus]
          return (
            <div
              key={trip.id}
              className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-[rgba(82,227,232,0.2)]"
            >
              {/* Thumb */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white truncate">{trip.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, fontSize: 10 }}
                  >
                    {trip.tag}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs mb-2" style={{ color: 'var(--muted)' }}>
                  <span>📍 {trip.country}</span>
                  <span>📅 {trip.dates}</span>
                  <span>⏱ {trip.days}d</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="progress flex-1" style={{ height: 3 }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${trip.progress}%`,
                        background: sc.text,
                      }}
                    />
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>
                    {trip.progress}% planned
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-white">{trip.budget}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>budget</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create trip CTA */}
      <button
        id="create-trip"
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors"
        style={{ border: '1px dashed rgba(82,227,232,0.2)', color: 'var(--cyan)', background: 'rgba(82,227,232,0.03)' }}
      >
        + Create trip
      </button>
    </div>
  )
}