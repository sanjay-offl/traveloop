'use client'

const events = [
  { date: 'Jun 14', label: 'Flight to Rome', color: '#38BDF8', icon: '✈' },
  { date: 'Jun 15', label: 'Hotel check-in: Colosseum View', color: '#8B5CF6', icon: '🏨' },
  { date: 'Jun 17', label: 'Vatican City tour', color: '#86EFAC', icon: '🏛' },
  { date: 'Jun 19', label: 'Amalfi Coast drive', color: '#FCD34D', icon: '🚗' },
  { date: 'Jun 22', label: 'Ferry to Positano', color: '#F87171', icon: '⛵' },
  { date: 'Jun 24', label: 'Return flight home', color: '#38BDF8', icon: '✈' },
]

const miniCalDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const miniCalNums = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
]
const tripDays = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

export function Calendar() {
  return (
    <section id="calendar" className="mb-8 scroll-mt-24">
      <h2 className="text-zinc-900 dark:text-zinc-100 mb-4 text-lg font-extrabold tracking-tight">Travel Calendar</h2>
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-accent">June 2025 — Rome trip</p>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors hover:bg-white/[0.05] text-zinc-600 dark:text-zinc-400">‹</button>
            <span className="text-xs px-2 text-zinc-900 dark:text-zinc-100">Jun</span>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors hover:bg-white/[0.05] text-zinc-600 dark:text-zinc-400">›</button>
          </div>
        </div>

        {/* Mini calendar */}
        <div className="mb-5">
          <div className="grid grid-cols-7 mb-1">
            {miniCalDays.map((d, i) => (
              <div key={i} className="text-center text-zinc-600 dark:text-zinc-400 py-1" style={{ fontSize: 10 }}>{d}</div>
            ))}
          </div>
          {miniCalNums.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const inTrip = day && tripDays.includes(day)
                const isFirst = day === 14
                const isLast = day === 24
                return (
                  <div
                    key={di}
                    className="flex items-center justify-center h-7 text-xs cursor-pointer transition-colors"
                    style={{
                      fontSize: 11,
                      color: !day ? 'transparent' : inTrip ? (isFirst || isLast ? '#0B1220' : '#38BDF8') : 'rgba(255,255,255,0.35)',
                      background: inTrip
                        ? isFirst || isLast
                          ? 'linear-gradient(135deg, #2563EB, #38BDF8)'
                          : 'rgba(56,189,248,0.10)'
                        : 'transparent',
                      borderRadius: isFirst ? '8px 0 0 8px' : isLast ? '0 8px 8px 0' : inTrip ? 0 : 6,
                      fontWeight: isFirst || isLast ? 600 : 400,
                    }}
                  >
                    {day || ''}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="text-xs mb-3 uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-accent" style={{ fontSize: 10 }}>Activities timeline</div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #38BDF8, transparent)', opacity: 0.25 }} />
            <div className="flex flex-col gap-3">
              {events.map((ev, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  <div className="timeline-dot mt-0.5 -ml-[3px]" style={{ background: ev.color, boxShadow: `0 0 8px ${ev.color}44` }} />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm">{ev.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{ev.label}</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">{ev.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calendar