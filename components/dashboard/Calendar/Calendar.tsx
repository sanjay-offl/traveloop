'use client'

import { useState } from 'react'
import { useActivities } from '../../../hooks/useActivities'
import { useTrips } from '../../../hooks/useTrips'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { activitySchema, type ActivityInput } from '../../../lib/validations'
import { useToast } from '../../ui/Toast'

export function Calendar() {
  const { trips } = useTrips()
  const activeTrip = trips.find(t => t.status !== 'archived')
  
  const { stops, activities, loading, addActivity } = useActivities(activeTrip?.id || null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<any>({
    resolver: zodResolver(activitySchema.extend({ stop_id: activitySchema.shape.title.optional() as any })), // Quick hack for combined form
  })

  if (loading) return <section className="mb-8"><div className="card-premium h-64 animate-pulse bg-black/5 dark:bg-white/5" /></section>
  if (!activeTrip) return null

  const onSubmit = async (data: ActivityInput & { stop_id: string }) => {
    if (!data.stop_id) { toast('Please select a trip stop', 'error'); return }
    const { stop_id, ...activityData } = data
    const err = await addActivity(stop_id, activityData)
    if (!err) {
      toast('Activity added!', 'success')
      reset()
      setShowForm(false)
    }
  }

  return (
    <section id="calendar" className="mb-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Itinerary</h2>
        <button type="button" onClick={() => setShowForm(!showForm)} className="btn-ghost text-xs px-3 py-1.5" disabled={stops.length === 0}>
          {showForm ? 'Cancel' : 'Add Activity'}
        </button>
      </div>

      <div className="card-premium p-6">
        {stops.length === 0 && (
          <p className="text-sm text-zinc-500 mb-4">No destinations added to this trip yet.</p>
        )}

        {showForm && stops.length > 0 && (
          <form onSubmit={handleSubmit(onSubmit as any)} className="mb-6 fade-up bg-black/3 dark:bg-white/3 p-4 rounded-xl">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input type="text" placeholder="Activity name" {...register('title')} className={`form-input text-sm py-2 ${errors.title ? 'border-red-500' : ''}`} disabled={isSubmitting} />
              <select {...register('stop_id')} className="form-input text-sm py-2" disabled={isSubmitting}>
                <option value="">Select Destination...</option>
                {stops.map(s => <option key={s.id} value={s.id}>{s.city_name}</option>)}
              </select>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className="btn-primary py-2 px-4 text-sm rounded-lg">Add</button>
            </div>
          </form>
        )}

        {/* Timeline */}
        <div className="relative">
          <div className="text-[10px] mb-4 uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-accent font-medium">Activities timeline</div>
          <div className="relative pl-5">
            <div className="absolute left-1.5 top-2 bottom-0 w-px bg-gradient-to-b from-blue-600/40 via-blue-600/20 to-transparent" />
            
            {activities.length === 0 ? (
               <p className="text-xs text-zinc-500 mt-2">No activities planned yet.</p>
            ) : (
               <div className="flex flex-col gap-4">
                 {activities.map((ev) => {
                   const stop = stops.find(s => s.id === ev.stop_id)
                   return (
                     <div key={ev.id} className="flex items-start gap-4 relative group">
                       <div className="timeline-dot mt-1.5 -ml-[23px] flex-shrink-0 z-10" style={{ background: ev.color, boxShadow: `0 0 6px ${ev.color}88` }} />
                       <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex-shrink-0">
                         <span className="material-symbols-outlined text-[18px]" style={{ color: ev.color }}>{ev.icon}</span>
                       </div>
                       <div className="flex-1 min-w-0 pt-0.5">
                         <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">{ev.title}</div>
                         <div className="text-[11px] text-zinc-500 mt-0.5">
                           {stop?.city_name} {ev.start_time ? `• ${ev.start_time}` : ''} {ev.cost > 0 ? `• $${ev.cost}` : ''}
                         </div>
                       </div>
                     </div>
                   )
                 })}
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calendar