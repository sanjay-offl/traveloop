import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { Trip } from '../lib/types'
import type { TripInput } from '../lib/validations'

export { Trip }

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('trips')
        .select('*, trip_stops(id, city_name, country, order_index), budgets(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTrips((data || []) as Trip[])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTrips()
    const ch = supabase
      .channel(`trips-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trips' }, fetchTrips)
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [fetchTrips])

  async function createTrip(input: TripInput) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { error } = await supabase.from('trips').insert([{ ...input, user_id: user.id }])
    if (error) return { success: false, error: error.message }
    await fetchTrips()
    return { success: true }
  }

  async function updateTrip(id: string, updates: Partial<TripInput>) {
    const { error } = await supabase.from('trips').update(updates).eq('id', id)
    if (error) return { success: false, error: error.message }
    await fetchTrips()
    return { success: true }
  }

  async function deleteTrip(id: string) {
    const { error } = await supabase.from('trips').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    await fetchTrips()
    return { success: true }
  }

  return { trips, loading, error, createTrip, updateTrip, deleteTrip, refresh: fetchTrips }
}
