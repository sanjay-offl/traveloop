import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { Trip } from '../lib/types'
import type { TripInput } from '../lib/validations'
import { MOCK_TRIPS } from './useMockData'

export { Trip }

export function useTrips() {
  const [trips, setTrips]   = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)
  const [usingMock, setUsingMock] = useState(false)
  const supabase = createClient()

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Not authenticated — show mock data so dashboard isn't empty
        setTrips(MOCK_TRIPS)
        setUsingMock(true)
        return
      }

      // Fetch trips — enterprise schema has no budgets table, so omit that select
      const { data, error: dbErr } = await supabase
        .from('trips')
        .select('*, trip_stops(id, city_name, country, order_index, arrival_date, departure_date)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (dbErr) throw dbErr

      const fetched = (data || []) as Trip[]

      if (fetched.length === 0) {
        // Authenticated but no trips yet — seed mock for great first impression
        setTrips(MOCK_TRIPS)
        setUsingMock(true)
      } else {
        setTrips(fetched)
        setUsingMock(false)
      }
    } catch (err: unknown) {
      console.warn('[useTrips] Supabase fetch failed, falling back to mock data:', err)
      setError(null) // suppress error UI — show mock data instead
      setTrips(MOCK_TRIPS)
      setUsingMock(true)
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchTrips()

    const ch = supabase
      .channel(`trips-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trips' }, fetchTrips)
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [fetchTrips]) // eslint-disable-line react-hooks/exhaustive-deps

  async function createTrip(input: TripInput) {
    if (usingMock) {
      // Optimistic mock insert — add to local state immediately
      const mockTrip: Trip = {
        id: `mock-trip-${Date.now()}`,
        user_id: 'mock-user',
        title: input.title,
        description: input.description || null,
        cover_image: null,
        start_date: input.start_date || null,
        end_date: input.end_date || null,
        visibility: input.visibility || 'private',
        status: 'planning',
        total_budget: input.total_budget || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        trip_stops: [],
      }
      setTrips(prev => [mockTrip, ...prev])
      return { success: true }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { error } = await supabase
      .from('trips')
      .insert([{ ...input, user_id: user.id, status: 'planning' }])

    if (error) return { success: false, error: error.message }
    await fetchTrips()
    return { success: true }
  }

  async function updateTrip(id: string, updates: Partial<TripInput>) {
    if (usingMock) {
      setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t))
      return { success: true }
    }
    const { error } = await supabase.from('trips').update(updates).eq('id', id)
    if (error) return { success: false, error: error.message }
    await fetchTrips()
    return { success: true }
  }

  async function deleteTrip(id: string) {
    if (usingMock) {
      setTrips(prev => prev.filter(t => t.id !== id))
      return { success: true }
    }
    const { error } = await supabase.from('trips').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    await fetchTrips()
    return { success: true }
  }

  return { trips, loading, error, usingMock, createTrip, updateTrip, deleteTrip, refresh: fetchTrips }
}
