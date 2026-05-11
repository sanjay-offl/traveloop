'use client'

import { useTrips } from '../../../hooks/useTrips'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tripSchema, type TripInput } from '../../../lib/validations'
import { useToast } from '../../ui/Toast'

const STATUS_STYLES: Record<string, string> = {
  active:    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  planning:  'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  completed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  archived:  'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400',
}

export function Trips() {
  const { trips, loading, createTrip, usingMock } = useTrips()
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TripInput>({
    resolver: zodResolver(tripSchema) as any,
    defaultValues: { visibility: 'private' },
  })

  const activeTrips = trips.filter(t => t.status !== 'archived')

  const onSubmit = async (data: TripInput) => {
    const result = await createTrip({ ...data, status: 'planning' } as TripInput & { status: string })
    if (result.success) {
      toast('Trip created successfully!', 'success')
      reset()
      setShowForm(false)
    } else {
      toast(result.error || 'Failed to create trip', 'error')
    }
  }

  return (
    <section id="trips" className="mb-8 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Active Trips</h2>
          {usingMock && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20">
              Demo data
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-xs px-3 py-1.5 rounded-lg"
        >
          {showForm ? 'Cancel' : '+ New Trip'}
        </button>
      </div>

      {showForm && (
        <div className="card-premium p-5 mb-4 fade-up">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Trip Name (e.g. Summer in Italy)"
                  {...register('title')}
                  className={`form-input text-sm ${errors.title ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{String(errors.title.message)}</p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Budget (₹ or $)"
                  {...register('total_budget')}
                  className={`form-input text-sm ${errors.total_budget ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.total_budget && (
                  <p className="text-xs text-red-500 mt-1">{String(errors.total_budget.message)}</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <input type="date" {...register('start_date')} className="form-input text-sm" disabled={isSubmitting} />
              </div>
              <div>
                <input
                  type="date"
                  {...register('end_date')}
                  className={`form-input text-sm ${errors.end_date ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.end_date && (
                  <p className="text-xs text-red-500 mt-1">{String(errors.end_date.message)}</p>
                )}
              </div>
            </div>
            <div>
              <textarea
                placeholder="Description (optional)"
                {...register('description')}
                className="form-input text-sm resize-none h-20"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-end mt-1">
              <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-4 py-2">
                {isSubmitting ? 'Creating…' : 'Create Trip'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-premium p-5 h-36 animate-pulse flex flex-col justify-between">
              <div className="w-2/3 h-5 bg-black/10 dark:bg-white/10 rounded-md" />
              <div className="w-1/3 h-4 bg-black/10 dark:bg-white/10 rounded-md" />
            </div>
          ))
        ) : (
          activeTrips.map((trip: any) => {
            const start = trip.start_date
              ? new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : ''
            const end = trip.end_date
              ? new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : ''
            const dateStr = start && end ? `${start} — ${end}` : start || end || 'Dates TBD'

            return (
              <div key={trip.id} className="card-premium p-5 group cursor-pointer hover:border-blue-600/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug pr-2">
                    {trip.title}
                  </h3>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${STATUS_STYLES[trip.status] || STATUS_STYLES.planning}`}>
                    {trip.status}
                  </span>
                </div>

                <p className="text-sm text-zinc-500 flex items-center gap-1.5 mb-1.5">
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                  {dateStr}
                </p>

                {trip.total_budget > 0 && (
                  <p className="text-sm text-zinc-500 flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                    Budget: ₹{trip.total_budget.toLocaleString()}
                  </p>
                )}

                {(trip.trip_stops ?? []).length > 0 && (
                  <div className="flex gap-1 flex-wrap mt-3">
                    {(trip.trip_stops ?? []).map((s: any) => (
                      <span key={s.id} className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 rounded-md text-zinc-600 dark:text-zinc-400">
                        {s.city_name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
