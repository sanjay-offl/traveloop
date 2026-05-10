'use client'
import { useEffect, useState } from 'react'

const stats = [
  {
    label: 'Total Trips',
    value: 14,
    suffix: '',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    color: 'var(--cyan)',
    bg: 'rgba(82,227,232,0.08)',
    change: '+2 this year',
    trend: 'up',
  },
  {
    label: 'Countries Visited',
    value: 28,
    suffix: '',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: '#86EFAC',
    bg: 'rgba(134,239,172,0.08)',
    change: '+3 this year',
    trend: 'up',
  },
  {
    label: 'Upcoming Trips',
    value: 3,
    suffix: '',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    color: '#C084FC',
    bg: 'rgba(192,132,252,0.08)',
    change: 'Next in 12 days',
    trend: 'neutral',
  },
  {
    label: 'Budget Spent',
    value: 4840,
    suffix: '$',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    color: '#FCD34D',
    bg: 'rgba(252,211,77,0.08)',
    change: 'of $8,000 budget',
    trend: 'warn',
  },
]

function AnimatedNumber({ target, prefix = '' }: { target: number; prefix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / 40
    const t = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(t) }
      else setVal(Math.round(start))
    }, 30)
    return () => clearInterval(t)
  }, [target])
  return <span>{prefix}{val.toLocaleString()}</span>
}

export default function Stats() {
  return (
    <div id="stats" className="grid-4 scroll-mt-24">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="card p-5 fade-up"
          style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: stat.bg, color: stat.color }}
            >
              {stat.icon}
            </div>
            <span className="text-xs" style={{ color: stat.trend === 'up' ? '#86EFAC' : stat.trend === 'warn' ? '#FCD34D' : 'var(--muted)' }}>
              {stat.trend === 'up' ? '↑' : stat.trend === 'warn' ? '●' : '→'}
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
            <AnimatedNumber target={stat.value} prefix={stat.suffix} />
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--text)' }}>{stat.label}</div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>{stat.change}</div>
        </div>
      ))}
    </div>
  )
}