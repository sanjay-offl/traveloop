'use client'

import { useTrips } from '../../../hooks/useTrips'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tripSchema, type TripInput } from '../../../lib/validations'
import { useToast } from '../../ui/Toast'

export function Trips() {
  const { trips, loading, error, createTrip } = useTrips()
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      visibility: 'private'
    }
  })

  const activeTrips = trips.filter(t => t.status !== 'archived')

  const onSubmit = async (data: any) => {
    const { success, error } = await createTrip({ ...data, status: 'planning' } as any)
    if (success) {
      toast('Trip created successfully!', 'success')
      reset()
      setShowForm(false)
    } else {
      toast(error || 'Failed to create trip', 'error')
    }
  }

  return (
    <section id="trips" className="mb-8 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Active Trips</h2>
        <button 
          type="button" 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-xs px-3 py-1.5 rounded-lg"
        >
          {showForm ? 'Cancel' : 'New Trip'}
        </button>
      </div>

      {showForm && (
        <div className="card-premium p-5 mb-4 fade-up">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
               <div>
                  <input type="text" placeholder="Trip Name (e.g. Summer in Italy)" {...register('title')} className={`form-input text-sm ${errors.title ? 'border-red-500' : ''}`} disabled={isSubmitting} />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
               </div>
               <div>
                  <input type="number" placeholder="Budget ($)" {...register('total_budget')} className={`form-input text-sm ${errors.total_budget ? 'border-red-500' : ''}`} disabled={isSubmitting} />
                  {errors.total_budget && <p className="text-xs text-red-500 mt-1">{errors.total_budget.message}</p>}
               </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
               <div>
                  <input type="date" {...register('start_date')} className="form-input text-sm" disabled={isSubmitting} />
               </div>
               <div>
                  <input type="date" {...register('end_date')} className={`form-input text-sm ${errors.end_date ? 'border-red-500' : ''}`} disabled={isSubmitting} />
                  {errors.end_date && <p className="text-xs text-red-500 mt-1">{errors.end_date.message}</p>}
               </div>
            </div>
            <div>
               <textarea placeholder="Description (optional)" {...register('description')} className="form-input text-sm resize-none h-20" disabled={isSubmitting} />
            </div>
            
            <div className="flex justify-end mt-1">
              <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-4 py-2">
                {isSubmitting ? 'Creating...' : 'Create Trip'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-premium p-5 h-32 animate-pulse flex flex-col justify-between">
              <div className="w-2/3 h-5 bg-black/10 dark:bg-white/10 rounded-md" />
              <div className="w-1/3 h-4 bg-black/10 dark:bg-white/10 rounded-md" />
            </div>
          ))
        ) : error ? (
          <div className="col-span-full card-premium p-5 text-red-500 text-sm">Failed to load trips.</div>
        ) : activeTrips.length === 0 ? (
          <div className="col-span-full card-premium p-8 text-center flex flex-col items-center justify-center">
             <div className="w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
             </div>
             <p className="text-zinc-900 dark:text-zinc-100 font-semibold mb-1">No active trips</p>
             <p className="text-zinc-500 text-sm">Create your first trip to get started.</p>
          </div>
        ) : (
          activeTrips.map(trip => {
             const start = trip.start_date ? new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
             const end = trip.end_date ? new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
             const dateStr = start && end ? `${start} - ${end}` : start || end || 'No dates set'

             return (
               <div key={trip.id} className="card-premium p-5 group cursor-pointer hover:border-blue-600/30">
                 <div className="flex items-start justify-between mb-3">
                   <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                     {trip.title}
                   </h3>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                     trip.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                     trip.status === 'planning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                     'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400'
                   }`}>
                     {trip.status}
                   </span>
                 </div>
                 <p className="text-sm text-zinc-500 flex items-center gap-1.5 mb-1.5">
                   <span className="material-symbols-outlined text-base">calendar_today</span>
                   {dateStr}
                 </p>
                 <div className="flex gap-1 flex-wrap mt-3">
                   {trip.trip_stops?.map(s => (
                     <span key={s.id} className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 rounded-md text-zinc-600 dark:text-zinc-400">{s.city_name}</span>
                   ))}
                 </div>
               </div>
             )
          })
        )}
      </div>
    </section>
  )
}
