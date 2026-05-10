'use client'

const categories = [
<<<<<<< HEAD
  { name: 'Flights', amount: 1840, color: '#38BDF8', pct: 38 },
  { name: 'Hotels', amount: 1200, color: '#8B5CF6', pct: 25 },
=======
  { name: 'Flights', amount: 1840, color: '#52E3E8', pct: 38 },
  { name: 'Hotels', amount: 1200, color: '#C084FC', pct: 25 },
>>>>>>> origin/main
  { name: 'Food & Dining', amount: 720, color: '#FCD34D', pct: 15 },
  { name: 'Activities', amount: 560, color: '#86EFAC', pct: 12 },
  { name: 'Transport', amount: 280, color: '#F87171', pct: 6 },
  { name: 'Other', amount: 240, color: '#94A3B8', pct: 4 },
<<<<<<< HEAD
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
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Budget Overview</h2>
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-white/40 font-accent">All trips combined</p>
          <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-400 font-accent">
            {pctUsed}% used
          </span>
        </div>

        {/* Donut + summary */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative flex-shrink-0">
            <DonutChart />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-white">${(total / 1000).toFixed(1)}k</span>
              <span className="text-xs text-white/40">spent</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-xs mb-1 text-white/40">
              <span>Spent</span>
              <span className="text-white font-medium">${total.toLocaleString()}</span>
            </div>
            <div className="progress mb-3">
              <div className="progress-fill" style={{ width: `${pctUsed}%`, background: 'linear-gradient(90deg, #2563EB, #38BDF8)' }} />
            </div>

            <div className="flex justify-between text-xs mb-1 text-white/40">
              <span>Remaining</span>
              <span className="font-medium text-green-400">${(totalBudget - total).toLocaleString()}</span>
            </div>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${100 - pctUsed}%`, background: '#86EFAC' }} />
            </div>

            <div className="flex justify-between text-xs mt-3 text-white/40">
              <span>Total budget</span>
              <span className="text-white">${totalBudget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
              <span className="text-xs flex-1 text-white/40">{cat.name}</span>
              <div className="progress w-20">
                <div className="progress-fill" style={{ width: `${cat.pct}%`, background: cat.color }} />
              </div>
              <span className="text-xs text-white w-12 text-right">${cat.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Daily avg */}
        <div className="mt-5 pt-4 flex items-center justify-between border-t border-white/[0.06]">
          <span className="text-xs text-white/40">Daily avg spending</span>
          <span className="text-sm font-medium text-brand-accent">$121 / day</span>
        </div>
      </div>
    </section>
  )
}

export default Budget
=======
] as const

const totalBudget = 8000

function DonutRing({ pct }: { pct: number }) {
  const used = Math.min(100, Math.max(0, pct))
  return (
    <div
      className="relative h-[120px] w-[120px] shrink-0 rounded-full p-2"
      style={{
        background: `conic-gradient(var(--cyan) ${used * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
      }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center rounded-full"
        style={{ background: 'var(--bg)' }}
      >
        <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
          {used}%
        </span>
        <span className="text-[10px]" style={{ color: 'var(--muted)' }}>
          used
        </span>
      </div>
    </div>
  )
}

export default function BudgetOverview() {
  const total = categories.reduce((s, c) => s + c.amount, 0)
  const pctUsed = Math.round((total / totalBudget) * 100)
  const remaining = totalBudget - total

  return (
    <div id="budget" className="card scroll-mt-24 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Budget overview
          </h3>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>
            Expense breakdown · daily pace · balance
          </p>
        </div>
        <span className="badge badge-amber">{pctUsed}% used</span>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-6">
        <DonutRing pct={pctUsed} />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
            <span>Total spent</span>
            <span className="font-medium text-white">${total.toLocaleString()}</span>
          </div>
          <div className="progress mb-3">
            <div className="progress-fill" style={{ width: `${pctUsed}%` }} />
          </div>
          <div className="mb-1 flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
            <span>Remaining balance</span>
            <span className="font-medium" style={{ color: '#86EFAC' }}>
              ${remaining.toLocaleString()}
            </span>
          </div>
          <div className="progress">
            <div className="progress-fill" style={{ width: `${100 - pctUsed}%`, background: '#86EFAC' }} />
          </div>
          <div className="mt-3 flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
            <span>Annual budget cap</span>
            <span className="text-white">${totalBudget.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: cat.color }} />
            <span className="flex-1 text-xs" style={{ color: 'var(--muted)' }}>
              {cat.name}
            </span>
            <div className="progress w-20">
              <div className="progress-fill" style={{ width: `${cat.pct}%`, background: cat.color }} />
            </div>
            <span className="w-12 text-right text-xs text-white">${cat.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div
        className="mt-5 flex items-center justify-between border-t pt-4"
        style={{ borderColor: 'var(--card-border)' }}
      >
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          Daily spending (avg)
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--cyan)' }}>
          $121 / day
        </span>
      </div>
    </div>
  )
}
>>>>>>> origin/main
