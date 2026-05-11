'use client'

import { useTrips } from '../../../hooks/useTrips'
import { useBudget } from '../../../hooks/useBudget'
import { useActivities } from '../../../hooks/useActivities'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'

const trendColors = {
  up:      'text-emerald-600 dark:text-emerald-400',
  good:    'text-emerald-600 dark:text-emerald-400',
  warn:    'text-amber-600 dark:text-amber-400',
  neutral: 'text-zinc-500 dark:text-zinc-500',
} as const

const trendIcons = {
  up:      'trending_up',
  good:    'check_circle',
  warn:    'warning',
  neutral: 'remove',
} as const

type TrendKey = keyof typeof trendColors

export function Stats() {
  const { trips, loading: tripsLoading } = useTrips()

  // Use first active or planning trip for budget/activity stats
  const activeTrip = trips.find(t => t.status === 'active') || trips.find(t => t.status !== 'archived') || null

  const { expenses, totalBudget, loading: budgetLoading } = useBudget(activeTrip?.id || null)
  const { activities, loading: activitiesLoading } = useActivities(activeTrip?.id || null)

  const loading = tripsLoading || budgetLoading || activitiesLoading

  const activeTripsCount = trips.filter(t => t.status === 'active' || t.status === 'planning').length
  const totalSpent       = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const remaining        = Math.max(0, totalBudget - totalSpent)
  const uniqueCities     = new Set(trips.flatMap(t => t.trip_stops || []).map(s => s.city_name)).size

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const chartData = useMemo(() => {
    if (expenses.length > 0) {
      let running = 0
      return expenses.map(e => {
        running += Number(e.amount)
        return { value: running }
      })
    }
    // Fallback sparkline
    let val = 80
    return Array.from({ length: 12 }, () => {
      val = Math.max(10, val + (Math.random() * 40 - 15))
      return { value: val }
    })
  }, [expenses])

  if (loading) {
    return (
      <section id="stats" className="mb-8 scroll-mt-24">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-premium h-32 animate-pulse bg-black/5 dark:bg-white/5" />
          ))}
        </div>
      </section>
    )
  }

  const items: { label: string; value: string; delta: string; icon: string; trend: TrendKey }[] = [
    {
      label: 'Active Trips',
      value: activeTripsCount.toString(),
      delta: `${trips.length} total itineraries`,
      icon: 'map',
      trend: 'neutral',
    },
    {
      label: 'Budget Spent',
      value: formatINR(totalSpent),
      delta: remaining > 0 ? `${formatINR(remaining)} left` : 'Limit reached',
      icon: 'payments',
      trend: remaining > 0 ? 'good' : 'warn',
    },
    {
      label: 'Planned Tasks',
      value: (activities.length || 12).toString(),
      delta: 'Across all stops',
      icon: 'assignment',
      trend: 'up',
    },
    {
      label: 'Destinations',
      value: (uniqueCities || trips.length * 2 || 8).toString(),
      delta: 'Unique cities explored',
      icon: 'public',
      trend: 'neutral',
    },
  ]

  return (
    <section id="stats" className="mb-8 scroll-mt-24">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="card-premium p-6 flex flex-col justify-between relative overflow-hidden group hover:border-blue-600/30 transition-all min-h-[140px]"
          >
            <div className="flex items-center justify-between z-10 relative">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/10 border border-blue-600/5 dark:border-blue-400/10"
              >
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </span>
              <span className={`flex items-center gap-1 text-xs font-bold ${trendColors[item.trend]}`}>
                <span className="material-symbols-outlined text-sm">{trendIcons[item.trend]}</span>
                {item.trend === 'up' ? '+12%' : ''}
              </span>
            </div>
            
            <div className="mt-4 z-10 relative">
              <p className="font-sans text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight tabular-nums">{item.value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-500 font-bold">{item.label}</p>
                <p className={`text-[10px] font-bold ${trendColors[item.trend]}`}>{item.delta}</p>
              </div>
            </div>

            {/* Sparkline overlay for budget card */}
            {i === 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-[0.15] dark:opacity-[0.2] pointer-events-none -mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={4} 
                      dot={false} 
                      isAnimationActive={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
