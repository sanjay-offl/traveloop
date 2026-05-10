'use client'

const categories = [
  { name: 'Flights', amount: 1840, color: '#2563EB', pct: 38 },
  { name: 'Hotels', amount: 1200, color: '#3B82F6', pct: 25 },
  { name: 'Food & Dining', amount: 720, color: '#93C5FD', pct: 15 },
  { name: 'Activities', amount: 560, color: '#525252', pct: 12 },
  { name: 'Transport', amount: 280, color: '#A1A1AA', pct: 6 },
  { name: 'Other', amount: 240, color: '#E4E4E7', pct: 4 },
]

const total = 4840
const totalBudget = 8000

function DonutChart() {
  const SIZE = 120
  const R = 44
  const CIRC = 2 * Math.PI * R
  let offset = 0

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="14" />
      {categories.map((cat) => {
        const dash = (cat.pct / 100) * CIRC
        const gap = CIRC - dash
        const startOffset = CIRC - (offset * CIRC) / 100
        offset += cat.pct
        return (
          <circle
            key={cat.name}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={cat.color}
            strokeWidth="14"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={startOffset}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'all 1s ease' }}
          />
        )
      })}
    </svg>
  )
}

export function Budget() {
  const pctUsed = Math.round((total / totalBudget) * 100)

  return (
    <section id="budget" className="mb-8 scroll-mt-24">
      <h2 className="text-zinc-900 dark:text-zinc-100 mb-4 text-lg font-extrabold tracking-tight">Budget Overview</h2>
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">All trips combined</p>
          <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-600/20">
            {pctUsed}% used
          </span>
        </div>

        {/* Donut + summary */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative flex-shrink-0">
            <DonutChart />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">${(total / 1000).toFixed(1)}k</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">spent</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-sm mb-2 text-zinc-500 dark:text-zinc-400">
              <span>Spent</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">${total.toLocaleString()}</span>
            </div>
            <div className="progress mb-4 h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 bg-blue-600 dark:bg-blue-500" style={{ width: `${pctUsed}%` }} />
            </div>

            <div className="flex justify-between text-sm mb-2 text-zinc-500 dark:text-zinc-400">
              <span>Remaining</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">${(totalBudget - total).toLocaleString()}</span>
            </div>
            <div className="progress h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 bg-zinc-300 dark:bg-zinc-700" style={{ width: `${100 - pctUsed}%` }} />
            </div>

            <div className="flex justify-between text-sm mt-4 pt-4 border-t border-black/5 dark:border-white/10 text-zinc-500 dark:text-zinc-400">
              <span>Total budget</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">${totalBudget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="flex flex-col gap-4 mt-6">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ background: cat.color }} />
              <span className="text-sm font-medium flex-1 text-zinc-500 dark:text-zinc-400">{cat.name}</span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 w-16 text-right">${cat.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Daily avg */}
        <div className="mt-6 pt-5 flex items-center justify-between border-t border-black/5 dark:border-white/10">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Daily avg spending</span>
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">$121 / day</span>
        </div>
      </div>
    </section>
  )
}

export default Budget
