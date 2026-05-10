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

<<<<<<< HEAD
export function Calendar() {
  return (
    <section id="calendar" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Travel Calendar</h2>
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-white/40 font-accent">June 2025 — Rome trip</p>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors hover:bg-white/[0.05] text-white/40">‹</button>
            <span className="text-xs px-2 text-white">Jun</span>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors hover:bg-white/[0.05] text-white/40">›</button>
=======
export default function Calendar() {
  return (
    <div id="calendar" className="card scroll-mt-24 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-medium text-white" style={{ fontFamily: 'Fraunces, serif' }}>Travel Calendar</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            Upcoming dates · activities timeline · reminders
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors hover:bg-white/5" style={{ color: 'var(--muted)' }}>‹</button>
          <span className="text-xs px-2" style={{ color: 'var(--text)' }}>Jun</span>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors hover:bg-white/5" style={{ color: 'var(--muted)' }}>›</button>
        </div>
      </div>

      {/* Mini calendar */}
      <div className="mb-5">
        <div className="grid grid-cols-7 mb-1">
          {miniCalDays.map((d, i) => (
            <div key={i} className="text-center text-xs py-1" style={{ color: 'var(--muted)', fontSize: 10 }}>{d}</div>
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
                    color: !day ? 'transparent' : inTrip ? (isFirst || isLast ? '#010302' : 'var(--cyan)') : 'var(--muted)',
                    background: inTrip
                      ? isFirst || isLast
                        ? 'var(--cyan)'
                        : 'rgba(82,227,232,0.12)'
                      : 'transparent',
                    borderRadius: isFirst ? '8px 0 0 8px' : isLast ? '0 8px 8px 0' : inTrip ? 0 : 6,
                    fontWeight: isFirst || isLast ? 600 : 400,
                  }}
                >
                  {day || ''}
                </div>
              )
            })}
>>>>>>> origin/main
          </div>
        </div>

        {/* Mini calendar */}
        <div className="mb-5">
          <div className="grid grid-cols-7 mb-1">
            {miniCalDays.map((d, i) => (
              <div key={i} className="text-center text-white/35 py-1" style={{ fontSize: 10 }}>{d}</div>
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
          <div className="text-xs mb-3 uppercase tracking-widest text-white/35 font-accent" style={{ fontSize: 10 }}>Activities timeline</div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #38BDF8, transparent)', opacity: 0.25 }} />
            <div className="flex flex-col gap-3">
              {events.map((ev, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  <div className="timeline-dot mt-0.5 -ml-[3px]" style={{ background: ev.color, boxShadow: `0 0 8px ${ev.color}44` }} />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm">{ev.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white">{ev.label}</div>
                      <div className="text-xs text-white/35">{ev.date}</div>
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