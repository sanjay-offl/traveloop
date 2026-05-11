'use client'

import { useState, useMemo } from 'react'
import { useBudget } from '../../../hooks/useBudget'
import { useTrips } from '../../../hooks/useTrips'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { expenseSchema, type ExpenseInput } from '../../../lib/validations'
import type { ExpenseType } from '../../../lib/types'
import { useToast } from '../../ui/Toast'

// Enterprise schema expense types (lowercase)
const CAT_COLORS: Record<ExpenseType, string> = {
  'flights':       '#2563EB',
  'accommodation': '#3B82F6',
  'food':          '#93C5FD',
  'activities':    '#6366F1',
  'transport':     '#A78BFA',
  'shopping':      '#F59E0B',
  'other':         '#C4B5FD',
}

type Currency = 'INR' | 'USD' | 'EUR'

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
}

const EXCHANGE_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
}

function DonutChart({ categories }: { categories: { name: string, amount: number, color: string, pct: number }[] }) {
  const SIZE = 120
  const R = 44
  const CIRC = 2 * Math.PI * R
  let offset = 0

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
      <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="currentColor" className="text-black/5 dark:text-white/5" strokeWidth="12" />
      {categories.map((cat) => {
        const dash = (cat.pct / 100) * CIRC
        const gap = CIRC - dash
        const startOffset = CIRC - (offset * CIRC) / 100
        offset += cat.pct
        return (
          <circle 
            key={cat.name} 
            cx={SIZE / 2} 
            cy={SIZE / 2} 
            r={R} 
            fill="none" 
            stroke={cat.color} 
            strokeWidth="12" 
            strokeDasharray={`${dash} ${gap}`} 
            strokeDashoffset={startOffset} 
            strokeLinecap="round" 
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'all 1s ease' }} 
          />
        )
      })}
    </svg>
  )
}

export function BudgetOverview() {
  const { trips, loading: tripsLoading } = useTrips()
  const [currency, setCurrency] = useState<Currency>('INR')
  const { toast } = useToast()
  
  // Just use the first active trip for the dashboard overview
  const activeTrip = trips.find(t => t.status !== 'archived')
  
  const { budget, expenses, loading: expensesLoading, addExpense, totalSpent, byType } = useBudget(activeTrip?.id || null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ExpenseInput>({
    resolver: zodResolver(expenseSchema) as any,
    defaultValues: { type: 'food' }
  })

  const formatValue = (val: number) => {
    const converted = val * EXCHANGE_RATES[currency]
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'INR' ? 0 : 2,
    }).format(converted)
  }

  if (tripsLoading || expensesLoading) {
    return <section className="mb-8"><div className="card-premium h-64 animate-pulse bg-black/5 dark:bg-white/5" /></section>
  }

  const tripTitle = activeTrip?.title || 'Goa Beach Escape'
  const totalBudget = activeTrip?.total_budget || 18000
  const pctUsed = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0

  const cats = (Object.keys(CAT_COLORS) as ExpenseType[]).map(catName => {
    const amt = byType[catName] || 0
    return { name: catName, amount: amt, color: CAT_COLORS[catName], pct: totalSpent > 0 ? (amt / totalSpent) * 100 : 0 }
  }).filter(c => c.amount > 0).sort((a, b) => b.amount - a.amount)

  const onSubmit = async (data: ExpenseInput) => {
    const err = await addExpense({ description: data.description, amount: data.amount, type: data.type })
    if (!err) {
      toast('Expense added!', 'success')
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
        <div className="flex items-center gap-2">
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="text-[10px] font-bold bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-md px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-600/50"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-ghost text-xs px-3 py-1.5">
            {showForm ? 'Cancel' : 'Add Expense'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card-premium p-4 mb-4 fade-up">
            <form onSubmit={handleSubmit(onSubmit as any)} className="flex flex-col gap-3">
              <div className="flex gap-3">
                <input type="text" placeholder="Description" {...register('description')} className={`form-input text-sm py-2 flex-1 ${errors.description ? 'border-red-500' : ''}`} disabled={isSubmitting} />
                <input type="number" step="0.01" placeholder="Amount" {...register('amount', { valueAsNumber: true })} className={`form-input text-sm py-2 w-28 ${errors.amount ? 'border-red-500' : ''}`} disabled={isSubmitting} />
              </div>
              <div className="flex gap-3">
                <select {...register('type')} className="form-input text-sm py-2 flex-1" disabled={isSubmitting}>
                  {(Object.keys(CAT_COLORS) as ExpenseType[]).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button type="submit" disabled={isSubmitting} className="btn-primary text-sm py-2 px-6 rounded-lg">{isSubmitting ? '...' : 'Add'}</button>
              </div>
            </form>
        </div>
      )}

      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 truncate pr-4">{tripTitle}</p>
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold border shrink-0 ${pctUsed > 90 ? 'bg-red-500/10 text-red-600 border-red-500/20' : 'bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-600/20 dark:border-blue-500/20'}`}>
            {pctUsed}% used
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 mb-8 lg:flex-row lg:items-start lg:gap-8">
          <div className="relative flex-shrink-0">
            <DonutChart categories={cats} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {formatValue(totalSpent)}
              </span>
              <span className="text-[10px] text-zinc-500">spent</span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-zinc-500 uppercase tracking-wider font-bold">
                <span>Spent</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-extrabold">{formatValue(totalSpent)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 bg-blue-600 dark:bg-blue-500" style={{ width: `${pctUsed}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-zinc-500 uppercase tracking-wider font-bold">
                <span>Remaining</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-extrabold">{formatValue(Math.max(0, totalBudget - totalSpent))}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 bg-zinc-200 dark:bg-zinc-700" style={{ width: `${Math.max(0, 100 - pctUsed)}%` }} />
              </div>
            </div>

            <div className="flex justify-between text-[11px] pt-3 border-t border-black/5 dark:border-white/10 text-zinc-500 font-bold uppercase tracking-wider">
              <span>Total budget</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-extrabold">{formatValue(totalBudget)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          {cats.length === 0 && <p className="text-xs text-center text-zinc-500 py-2">No expenses recorded yet.</p>}
          {cats.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex-1 capitalize">{cat.name}</span>
              <div className="w-16 h-1 rounded-full bg-black/5 dark:bg-white/8 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
              </div>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 w-24 text-right tabular-nums">{formatValue(cat.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BudgetOverview
