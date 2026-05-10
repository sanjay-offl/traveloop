import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'

export type BudgetCategory = 'Flights' | 'Hotels' | 'Food & Dining' | 'Activities' | 'Transport' | 'Other'

export interface Expense {
  id: string
  budget_id: string
  title: string
  amount: number
  category: BudgetCategory
  date: string
  created_at: string
}

export interface Budget {
  id: string
  trip_id: string
  total_budget: number
}

export function useBudget(tripId: string | null = null) {
  const [budget, setBudget] = useState<Budget | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchBudgetAndExpenses = useCallback(async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Find the trip
      let currentTripId = tripId
      if (!currentTripId) {
        const { data: trip } = await supabase.from('trips').select('id').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle()
        currentTripId = trip?.id || null
      }
      
      if (!currentTripId) {
        setBudget(null)
        setExpenses([])
        return
      }

      // Fetch or auto-create budget
      let { data: bData } = await supabase.from('budgets').select('*').eq('trip_id', currentTripId).maybeSingle()
      if (!bData) {
        const { data: newB } = await supabase.from('budgets').insert([{ trip_id: currentTripId, total_budget: 5000 }]).select().single()
        bData = newB
      }
      
      setBudget(bData)

      if (bData) {
        const { data: eData } = await supabase.from('expenses').select('*').eq('budget_id', bData.id).order('created_at', { ascending: true })
        setExpenses(eData || [])
      }

    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBudgetAndExpenses()

    const channel1 = supabase.channel(`public:expenses-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, () => fetchBudgetAndExpenses())
      .subscribe()

    const channel2 = supabase.channel(`public:budgets-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'budgets' }, () => fetchBudgetAndExpenses())
      .subscribe()

    return () => {
      supabase.removeChannel(channel1)
      supabase.removeChannel(channel2)
    }
  }, [fetchBudgetAndExpenses, tripId])

  async function updateTotalBudget(amount: number) {
    if (!budget) return
    const { error } = await supabase.from('budgets').update({ total_budget: amount }).eq('id', budget.id)
    if (!error) fetchBudgetAndExpenses()
  }

  async function addExpense(input: any) {
    if (!budget) return
    const { error } = await supabase.from('expenses').insert([{
      budget_id: budget.id,
      ...input
    }])
    if (!error) fetchBudgetAndExpenses()
    return error
  }

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const byType = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount)
    return acc
  }, {} as Record<string, number>)

  return { budget, expenses, loading, updateTotalBudget, addExpense, totalSpent, byType }
}
