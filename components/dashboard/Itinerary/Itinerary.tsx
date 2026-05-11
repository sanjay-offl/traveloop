'use client'

import { useState } from 'react'
import { useActivities } from '../../../hooks/useActivities'
import { useTrips } from '../../../hooks/useTrips'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '../../ui/Toast'

const activitySchema = z.object({
  destination: z.string().min(2, 'Destination name required'),
  activity: z.string().min(3, 'Activity description required'),
  date: z.string().min(1, 'Date required'),
})

type ActivityInput = z.infer<typeof activitySchema>

export function Itinerary() {
  const { trips } = useTrips()
  const activeTrip = trips.find(t => t.status !== 'archived') || trips[0]
  const tripId = activeTrip?.id || 'mock-trip'

  const { stops: tripStops, activities } = useActivities(tripId)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
  })

  // Get unique destinations from trip stops
  const destinations = tripStops.map(stop => ({
    id: stop.id,
    name: stop.city_name,
    country: stop.country,
    date: stop.arrival_date,
  }))

  // Map activities with their stop information
  const activitiesWithDestination = activities.map(activity => {
    const stop = tripStops.find(s => s.id === activity.stop_id)
    return {
      ...activity,
      destination: stop?.city_name || 'Unknown',
      country: stop?.country || '',
      date: activity.start_time || stop?.arrival_date || '',
    }
  })

  const onSubmit = async (data: ActivityInput) => {
    // In a real app, this would save to the backend
    toast('Activity added! 🎉', 'success')
    reset()
    setShowForm(false)
  }

  return (
    <section id="itinerary" className="mb-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Itinerary</h2>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-xs px-3 py-1.5 rounded-lg"
        >
          {showForm ? 'Cancel' : '+ Add Activity'}
        </button>
      </div>

      {/* Add Activity Form */}
      {showForm && (
        <div className="card-premium p-5 mb-4 fade-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paris"
                  {...register('destination')}
                  className={`form-input text-sm ${errors.destination ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.destination && (
                  <p className="text-xs text-red-500 mt-1">{String(errors.destination.message)}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  {...register('date')}
                  className={`form-input text-sm ${errors.date ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.date && <p className="text-xs text-red-500 mt-1">{String(errors.date.message)}</p>}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Activity
              </label>
              <textarea
                placeholder="What are you doing? (e.g. Visit Eiffel Tower, lunch at café)"
                {...register('activity')}
                className={`form-input text-sm h-20 resize-none ${errors.activity ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {errors.activity && <p className="text-xs text-red-500 mt-1">{String(errors.activity.message)}</p>}
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-4 py-2">
                {isSubmitting ? 'Adding…' : 'Add Activity'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Destinations Section */}
      <div className="card-premium p-6 mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Destinations</h3>
        {destinations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🗺️</div>
            <p className="empty-state-description">No destinations added to this trip yet.</p>
            <button onClick={() => setShowForm(true)} className="btn-primary text-xs px-4 py-2">
              Add First Destination
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {destinations.map(dest => (
              <span
                key={dest.id}
                className="badge badge-blue rounded-full px-3 py-1.5 text-xs font-medium"
              >
                📍 {dest.name}, {dest.country}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Activities Timeline */}
      <div className="card-premium p-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Activities Timeline</h3>
        {activitiesWithDestination.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <p className="empty-state-description">No activities planned yet.</p>
            <button onClick={() => setShowForm(true)} className="btn-primary text-xs px-4 py-2">
              Plan Your First Activity
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activitiesWithDestination.map((activity, idx) => (
              <div key={activity.id} className="relative pl-8 pb-4">
                <div className="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-[var(--bg-card)] dark:border-[#111111]" />
                {idx < activitiesWithDestination.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900" />
                )}
                <div>
                  {activity.date && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(activity.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-1">
                    {activity.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    📍 {activity.destination}, {activity.country}
                  </p>
                  {activity.notes && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 italic">
                      {activity.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Itinerary
