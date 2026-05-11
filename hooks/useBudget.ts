import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { Expense } from '../lib/types'
import { MOCK_EXPENSES, MOCK_TRIPS } from './useMockData'

export type { Expense }

export function useBudget(tripId: string | null = null) {
  const [expenses, setExpenses]   = useState<Expense[]>([])
  const [totalBudget, setTotalBudget] = useState(0)
  const [loading, setLoading]     = useState(true)
  const [usingMock, setUsingMock] = useState(false)
  const supabase = createClient()

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Not authenticated — show mock expenses
        const mockTrip = MOCK_TRIPS.find(t => t.id === (tripId || 'mock-trip-001')) || MOCK_TRIPS[0]
        setExpenses(MOCK_EXPENSES.filter(e => e.trip_id === mockTrip.id))
        setTotalBudget(mockTrip.total_budget)
        setUsingMock(true)
        return
      }

      // Enterprise schema: expenses link directly to trip_id (no budgets table)
      let currentTripId = tripId
      if (!currentTripId) {
        const { data: trip } = await supabase
          .from('trips')
          .select('id, total_budget')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        currentTripId = trip?.id || null
        if (trip?.total_budget) setTotalBudget(Number(trip.total_budget))
      } else {
        const { data: trip } = await supabase
          .from('trips')
          .select('total_budget')
          .eq('id', currentTripId)
          .maybeSingle()
        if (trip?.total_budget) setTotalBudget(Number(trip.total_budget))
      }

      if (!currentTripId) {
        setExpenses(MOCK_EXPENSES)
        setTotalBudget(MOCK_TRIPS[0].total_budget)
        setUsingMock(true)
        return
      }

      const { data: eData, error: eErr } = await supabase
        .from('expenses')
        .select('*')
        .eq('trip_id', currentTripId)
        .order('created_at', { ascending: true })

      if (eErr) throw eErr

      if (!eData || eData.length === 0) {
        // Trip exists but no expenses yet — show mock expenses for demo
        setExpenses(MOCK_EXPENSES)
        setUsingMock(true)
      } else {
        setExpenses(eData as Expense[])
        setUsingMock(false)
      }
    } catch (e) {
      console.warn('[useBudget] Supabase fetch failed, falling back to mock data:', e)
      setExpenses(MOCK_EXPENSES)
      setTotalBudget(MOCK_TRIPS[0].total_budget)
      setUsingMock(true)
    } finally {
      setLoading(false)
    }
  }, [tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchExpenses()

    const ch = supabase
      .channel(`expenses-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, fetchExpenses)
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [fetchExpenses]) // eslint-disable-line react-hooks/exhaustive-deps

  async function addExpense(input: { description: string; amount: number; type: string; date?: string }, expTripId?: string) {
    if (usingMock) {
      const newExp: Expense = {
        id: `mock-exp-${Date.now()}`,
        trip_id: expTripId || tripId || 'mock-trip-001',
        type: input.type as Expense['type'],
        amount: input.amount,
        description: input.description,
        date: input.date || new Date().toISOString().slice(0, 10),
        created_at: new Date().toISOString(),
      }
      setExpenses(prev => [...prev, newExp])
      return null
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return new Error('Not authenticated')

    let currentTripId = expTripId || tripId
    if (!currentTripId) {
      const { data: trip } = await supabase
        .from('trips')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      currentTripId = trip?.id || null
    }

    if (!currentTripId) return new Error('No trip found')

    const { error } = await supabase.from('expenses').insert([{
      ...input,
      trip_id: currentTripId,
    }])
    if (!error) fetchExpenses()
    return error
  }

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const byType = expenses.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + Number(e.amount)
    return acc
  }, {} as Record<string, number>)

  return {
    expenses,
    totalBudget,
    loading,
    usingMock,
    addExpense,
    totalSpent,
    byType,
    // Legacy compat: budget object shape
    budget: totalBudget ? { id: 'virtual', trip_id: tripId || '', total_budget: totalBudget } : null,
  }
}
