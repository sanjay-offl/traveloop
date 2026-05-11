'use client'

import { useState } from 'react'
import { useNotes } from '../../../hooks/useNotes'
import { useTrips } from '../../../hooks/useTrips'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tripNoteSchema, type TripNoteInput } from '../../../lib/validations'
import { useToast } from '../../ui/Toast'

export function Activity() {
  const { trips, loading: tripsLoading } = useTrips()
  // Always use a trip — fall back to mock
  const activeTrip = trips.find(t => t.status !== 'archived') || trips[0] || null
  const tripId = activeTrip?.id || 'mock-trip-001'

  const { notes, loading, addNote, deleteNote } = useNotes(tripId)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TripNoteInput>({
    resolver: zodResolver(tripNoteSchema),
  })

  if (tripsLoading) {
    return (
      <section className="mb-8">
        <div className="card-premium h-40 animate-pulse bg-black/5 dark:bg-white/5" />
      </section>
    )
  }

  const onSubmit = async (data: TripNoteInput) => {
    const err = await addNote(data)
    if (!err) {
      toast('Entry saved!', 'success')
      reset()
      setShowForm(false)
    } else {
      toast('Failed to save entry', 'error')
    }
  }

  return (
    <section id="notes" className="mb-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Travel Journal</h2>
          {activeTrip && (
            <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-[160px]">{activeTrip.title}</p>
          )}
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)} className="btn-ghost text-xs px-3 py-1.5">
          {showForm ? 'Cancel' : '+ Add Entry'}
        </button>
      </div>

      <div className="card-premium p-6">
        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6 fade-up">
            <textarea
              placeholder="What happened today? Any memorable moments?"
              {...register('note')}
              className={`form-input text-sm py-3 h-24 resize-none ${errors.note ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {errors.note && <p className="text-xs text-red-500 mt-1">{String(errors.note.message)}</p>}
            <div className="flex justify-end mt-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary py-2 px-6 text-sm rounded-lg">
                {isSubmitting ? 'Saving…' : 'Save Entry'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-16 w-full bg-black/5 dark:bg-white/5 animate-pulse rounded-lg" />
            ))
          ) : notes.length === 0 && !showForm ? (
            <div className="text-center py-6">
              <span className="material-symbols-outlined text-3xl text-zinc-300 dark:text-zinc-600 mb-2 block">book</span>
              <p className="text-sm text-zinc-500">Your journal is empty. Add your first travel memory!</p>
            </div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="relative group pl-5">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-amber-500" />
                <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">{note.note}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[11px] text-zinc-400">{new Date(note.created_at).toLocaleString()}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Activity
