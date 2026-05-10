'use client'

import { useState } from 'react'
import { useBudget } from '../../../hooks/useBudget'
import { useTrips } from '../../../hooks/useTrips'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { expenseSchema, type ExpenseInput } from '../../../lib/validations'
import type { ExpenseType } from '../../../lib/types'
import { useToast } from '../../ui/Toast'

const CAT_COLORS: Record<ExpenseType, string> = {
  'Flights': '#2563EB',
  'Hotels': '#3B82F6',
  'Food & Dining': '#93C5FD',
  'Activities': '#6366F1',
  'Transport': '#A78BFA',
  'Other': '#C4B5FD',
}

function DonutChart({ categories }: { categories: { name: string, amount: number, color: string, pct: number }[] }) {
  const SIZE = 120
  const R = 44
  const CIRC = 2 * Math.PI * R
  let offset = 0

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
      <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="currentColor" className="text-black/6 dark:text-white/8" strokeWidth="14" />
      {categories.map((cat) => {
        const dash = (cat.pct / 100) * CIRC
        const gap = CIRC - dash
        const startOffset = CIRC - (offset * CIRC) / 100
        offset += cat.pct
        return (
          <circle key={cat.name} cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={cat.color} strokeWidth="14" strokeDasharray={`${dash} ${gap}`} strokeDashoffset={startOffset} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'all 1s ease' }} />
        )
      })}
    </svg>
  )
}

export function BudgetOverview() {
  const { trips, loading: tripsLoading } = useTrips()
  // Just use the first active trip for the dashboard overview
  const activeTrip = trips.find(t => t.status !== 'archived')
  
  const { budget, expenses, loading: expensesLoading, addExpense, totalSpent, byType } = useBudget(activeTrip?.id || null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<any>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { category: 'Food & Dining' }
  })

  if (tripsLoading || expensesLoading) {
     return <section className="mb-8"><div className="card-premium h-64 animate-pulse bg-black/5 dark:bg-white/5" /></section>
  }

  if (!activeTrip) {
     return <section className="mb-8"><div className="card-premium p-6 text-center text-zinc-500 text-sm">Create a trip to start tracking your budget.</div></section>
  }

  const totalBudget = activeTrip.total_budget
  const pctUsed = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0

  const cats = (Object.keys(CAT_COLORS) as ExpenseType[]).map(catName => {
     const amt = byType[catName] || 0
     return { name: catName, amount: amt, color: CAT_COLORS[catName], pct: totalSpent > 0 ? (amt / totalSpent) * 100 : 0 }
  }).filter(c => c.amount > 0).sort((a, b) => b.amount - a.amount)

  const onSubmit = async (data: ExpenseInput) => {
     const err = await addExpense(data)
     if (!err) {
       toast('Expense added', 'success')
       reset()
       setShowForm(false)
     } else {
       toast('Failed to add expense', 'error')
     }
  }

  return (
    <section id="budget" className="mb-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Budget Overview</h2>
        <button type="button" onClick={() => setShowForm(!showForm)} className="btn-ghost text-xs px-3 py-1.5">
          {showForm ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      {showForm && (
        <div className="card-premium p-4 mb-4 fade-up">
            <form onSubmit={handleSubmit(onSubmit as any)} className="flex flex-col sm:flex-row gap-3">
             <div className="flex-1">
               <input type="text" placeholder="Expense description" {...register('title')} className={`form-input text-sm py-2 w-full ${errors.title ? 'border-red-500' : ''}`} disabled={isSubmitting} />
             </div>
             <div className="w-32">
               <input type="number" step="0.01" placeholder="Amount ($)" {...register('amount', { valueAsNumber: true })} className={`form-input text-sm py-2 w-full ${errors.amount ? 'border-red-500' : ''}`} disabled={isSubmitting} />
             </div>
             <div className="w-40">
               <select {...register('category')} className="form-input text-sm py-2 w-full" disabled={isSubmitting}>
                  {(Object.keys(CAT_COLORS) as ExpenseType[]).map(c => <option key={c} value={c}>{c}</option>)}
               </select>
             </div>
             <button type="submit" disabled={isSubmitting} className="btn-primary text-sm py-2 px-4 rounded-lg">{isSubmitting ? '...' : 'Add'}</button>
           </form>
        </div>
      )}

      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{activeTrip.title}</p>
          <span className={`rounded-full px-3 py-1 text-xs font-bold border ${pctUsed > 90 ? 'bg-red-500/10 text-red-600 border-red-500/20' : 'bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-600/20 dark:border-blue-500/20'}`}>
            {pctUsed}% used
          </span>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="relative flex-shrink-0">
            <DonutChart categories={cats} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">${totalSpent > 1000 ? (totalSpent / 1000).toFixed(1) + 'k' : totalSpent}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-500">spent</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1.5 text-zinc-600 dark:text-zinc-400">
                <span>Spent</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">${totalSpent.toLocaleString()}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 bg-blue-600 dark:bg-blue-500" style={{ width: `${pctUsed}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 text-zinc-600 dark:text-zinc-400">
                <span>Remaining</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">${Math.max(0, totalBudget - totalSpent).toLocaleString()}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 bg-zinc-200 dark:bg-zinc-700" style={{ width: `${Math.max(0, 100 - pctUsed)}%` }} />
              </div>
            </div>

            <div className="flex justify-between text-xs pt-2 border-t border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
              <span>Total budget</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">${totalBudget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {cats.length === 0 && <p className="text-xs text-center text-zinc-500">No expenses recorded yet.</p>}
          {cats.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 flex-1 capitalize">{cat.name}</span>
              <div className="w-20 h-1 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${cat.pct * 2}%`, background: cat.color }} />
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 w-16 text-right tabular-nums">${cat.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BudgetOverview
