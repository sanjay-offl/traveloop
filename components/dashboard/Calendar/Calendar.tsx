'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const ReactCalendar = dynamic(() => import('react-calendar'), { ssr: false })

export function Calendar() {
  const [date, setDate] = useState<Date | null>(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <section className="mb-8"><div className="card-premium h-64 animate-pulse bg-black/5 dark:bg-white/5" /></section>

  const handleDateChange = (value: Date | [Date, Date] | null, event?: any) => {
    if (value instanceof Date) {
      setDate(value)
    } else if (Array.isArray(value)) {
      setDate(value[0])
    } else {
      setDate(null)
    }
  }

  return (
    <section id="calendar" className="mb-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Calendar</h2>
        <div className="flex items-center gap-2">
          <button className="btn-ghost text-xs px-3 py-1.5" onClick={() => setDate(new Date())}>Today</button>
        </div>
      </div>

      <div className="card-premium p-6">
        <div className="react-calendar-wrapper bg-[var(--bg-soft)] dark:bg-[#050505] rounded-2xl p-6">
          <ReactCalendar
            onChange={(handleDateChange as any)}
            value={date}
            calendarType="ISO 8601"
            showNeighboringMonth={false}
            className="react-calendar custom-calendar"
          />
        </div>
        
        <div className="mt-6 pt-6 border-t border-[var(--border-card)]">
          <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
            📅 Selected Date
          </p>
          {date && (
            <>
              <p className="text-sm text-[var(--text-primary)] font-medium">
                {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                No activities planned for this date
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Calendar
