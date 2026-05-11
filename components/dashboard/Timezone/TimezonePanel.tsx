'use client'

import React, { useState, useEffect } from 'react'

/**
 * TimezonePanel
 * Shows India time and destination time with real-time updates.
 */
export function TimezonePanel({ destinationTimezone = 'Europe/London', destinationName = 'London' }: { destinationTimezone?: string, destinationName?: string }) {
  const [indiaTime, setIndiaTime] = useState<string>('')
  const [destTime, setDestTime] = useState<string>('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      
      // India Time
      setIndiaTime(now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }))

      // Destination Time
      try {
        setDestTime(now.toLocaleTimeString('en-US', {
          timeZone: destinationTimezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }))
      } catch (e) {
        setDestTime('--:--:--')
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [destinationTimezone])

  return (
    <div className="section-card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">schedule</span>
        <h3 className="text-zinc-900 dark:text-zinc-100 text-sm font-bold tracking-tight">World Clock</h3>
      </div>
      
      <div className="space-y-5">
        {/* India Time */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">India (IST)</p>
            <p className="text-xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
              {indiaTime || '00:00:00'}
            </p>
          </div>
          <div className="h-8 w-1 bg-blue-600/20 rounded-full" />
        </div>

        {/* Destination Time */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{destinationName}</p>
            <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {destTime || '00:00:00'}
            </p>
          </div>
          <div className="h-8 w-1 bg-emerald-500/20 rounded-full" />
        </div>
      </div>
      
      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-5 pt-3 border-t border-black/5 dark:border-white/5">
        Automatically synced with system time
      </p>
    </div>
  )
}
