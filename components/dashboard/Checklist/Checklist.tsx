'use client'

import { useChecklist } from '../../../hooks/useChecklist'
import { useTrips } from '../../../hooks/useTrips'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { packingItemSchema, type PackingItemInput } from '../../../lib/validations'

export function Checklist() {
  const { trips, loading: tripsLoading } = useTrips()
  // Use first non-archived trip, or fall back to mock trip id
  const activeTrip = trips.find(t => t.status !== 'archived') || trips[0] || null
  const { items, loading, toggleItem, addItem } = useChecklist(activeTrip?.id || 'mock-trip-001')

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<PackingItemInput>({
    resolver: zodResolver(packingItemSchema) as any,
    defaultValues: { category: 'other' },
  })

  const doneCount = items.filter(t => t.is_packed).length
  const total     = items.length
  const pct       = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  const onSubmit = async (data: PackingItemInput) => {
    const err = await addItem(data)
    if (!err) reset()
  }

  if (tripsLoading) {
    return (
      <section className="mb-8">
        <div className="card-premium h-40 animate-pulse bg-black/5 dark:bg-white/5" />
      </section>
    )
  }

  const tripName = activeTrip?.title || 'Current trip'

  return (
    <section id="checklist" className="mb-8 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Packing list</h2>
          <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-[160px]">{tripName}</p>
        </div>
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {doneCount}/{total}
        </span>
      </div>
      <div className="card-premium p-5">
        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-500 mb-1.5">
            <span>Progress</span>
            <span className="font-medium text-blue-600 dark:text-blue-400">{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Add item form */}
        <form onSubmit={handleSubmit(onSubmit as any)} className="mb-4">
          <div className="relative">
            <input
              type="text"
              {...register('item_name')}
              placeholder="Add item…"
              className="form-input text-sm py-2 pl-3 pr-10 w-full"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
            </button>
          </div>
        </form>

        {/* Items list */}
        <ul className="space-y-1 max-h-56 overflow-y-auto sidebar-scroll">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="h-8 w-full bg-black/5 dark:bg-white/5 animate-pulse rounded-md my-1" />
            ))
          ) : (
            items.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleItem(item.id, item.is_packed)}
                  className="flex items-center gap-3 w-full text-left group py-2 px-2 rounded-lg hover:bg-black/3 dark:hover:bg-white/3 transition-colors"
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs transition-all ${
                    item.is_packed ? 'border-blue-600 bg-blue-600 text-white' : 'border-black/15 dark:border-white/15 text-transparent'
                  }`}>✓</span>
                  <span className={`text-sm transition-colors flex-1 ${
                    item.is_packed ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'
                  }`}>
                    {item.item_name}
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wide shrink-0">
                    {item.category}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  )
}
