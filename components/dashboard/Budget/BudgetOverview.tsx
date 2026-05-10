'use client'

const categories = [
  { name: 'Flights', amount: 1840, color: '#52E3E8', pct: 38 },
  { name: 'Hotels', amount: 1200, color: '#C084FC', pct: 25 },
  { name: 'Food & Dining', amount: 720, color: '#FCD34D', pct: 15 },
  { name: 'Activities', amount: 560, color: '#86EFAC', pct: 12 },
  { name: 'Transport', amount: 280, color: '#F87171', pct: 6 },
  { name: 'Other', amount: 240, color: '#94A3B8', pct: 4 },
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
