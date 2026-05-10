'use client'

import { useTrips } from '../../../hooks/useTrips'
import { useBudget } from '../../../hooks/useBudget'
import { useActivities } from '../../../hooks/useActivities'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import { useMemo } from 'react'

const trendColors = {
  up: 'text-emerald-600 dark:text-emerald-400',
  good: 'text-emerald-600 dark:text-emerald-400',
  warn: 'text-amber-600 dark:text-amber-400',
  neutral: 'text-zinc-500 dark:text-zinc-500',
}

const trendIcons = {
  up: 'trending_up',
  good: 'check_circle',
  warn: 'warning',
  neutral: 'remove',
}

export function Stats() {
  const { trips, loading: tripsLoading } = useTrips()
  const activeTrip = trips.find(t => t.status !== 'archived')
  
  const { budget, expenses, loading: budgetLoading } = useBudget(activeTrip?.id || null)
  const { activities, loading: activitiesLoading } = useActivities(activeTrip?.id || null)

  const loading = tripsLoading || budgetLoading || activitiesLoading

  const activeTripsCount = trips.filter(t => t.status === 'active').length
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const remainingBudget = budget ? Math.max(0, budget.total_budget - totalSpent) : 0
  const upcomingTasks = activities.length

  const chartData = useMemo(() => {
    // Generate dummy sparkline data based on expenses for visual effect
    const data = []
    let val = 100
    for(let i=0; i<10; i++) {
      val = val + (Math.random() * 40 - 20)
      data.push({ value: Math.max(0, val) })
    }
    return data
  }, [expenses])

  if (loading) {
    return (
      <section id="stats" className="mb-8 scroll-mt-24">
        <h2 className="text-zinc-900 dark:text-zinc-100 mb-4 text-lg font-extrabold tracking-tight">At a glance</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-premium h-32 animate-pulse bg-black/5 dark:bg-white/5" />
          ))}
        </div>
      </section>
    )
  }

  const items = [
    { label: 'Active trips', value: activeTripsCount.toString(), delta: `${trips.length} total planned`, icon: 'map', trend: 'neutral' },
    { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, delta: `$${remainingBudget.toLocaleString()} left`, icon: 'payments', trend: 'good' },
    { label: 'Planned Activities', value: upcomingTasks.toString(), delta: 'Ready to go', icon: 'assignment', trend: 'up' },
    { label: 'Destinations', value: new Set(trips.flatMap(t=>t.trip_stops || []).map(s => s.city_name)).size.toString(), delta: 'Lifetime unique', icon: 'public', trend: 'neutral' },
  ] as const

  return (
    <section id="stats" className="mb-8 scroll-mt-24">
      <h2 className="text-zinc-900 dark:text-zinc-100 mb-4 text-lg font-extrabold tracking-tight">At a glance</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="card-premium p-5 flex flex-col gap-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between z-10 relative">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-blue-600 dark:text-blue-400"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(59,130,246,0.08))' }}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </span>
              <span className={`flex items-center gap-1 text-xs font-medium ${trendColors[item.trend]}`}>
                <span className="material-symbols-outlined text-sm">{trendIcons[item.trend]}</span>
              </span>
            </div>
            <div className="z-10 relative">
              <p className="font-sans text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">{item.value}</p>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-accent">{item.label}</p>
            </div>
            <p className={`text-xs font-medium ${trendColors[item.trend]} z-10 relative`}>{item.delta}</p>
            
            {/* Background Sparkline Chart for visual flair */}
            {i === 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={chartData}>
                     <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={false} isAnimationActive={true} />
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
