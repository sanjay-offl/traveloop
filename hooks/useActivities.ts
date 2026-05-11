import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { Activity, TripStop } from '../lib/types'
import type { ActivityInput, TripStopInput } from '../lib/validations'

export function useActivities(tripId: string | null) {
  const [stops, setStops]           = useState<TripStop[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading]       = useState(true)
  const supabase = createClient()

  const fetchAll = useCallback(async () => {
    if (!tripId || tripId.startsWith('mock-')) {
      // Mock trip — use embedded stops from the mock data
      setStops([])
      setActivities([])
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const { data: sData } = await supabase
        .from('trip_stops')
        .select('*')
        .eq('trip_id', tripId)
        .order('order_index', { ascending: true })

      setStops(sData || [])

      if (sData && sData.length > 0) {
        const stopIds = sData.map(s => s.id)
        const { data: aData } = await supabase
          .from('activities')
          .select('*')
          .in('stop_id', stopIds)
          .order('start_time', { ascending: true })
        setActivities(aData || [])
      } else {
        setActivities([])
      }
    } catch (e) {
      console.warn('[useActivities] fetch error:', e)
      setStops([])
      setActivities([])
    } finally {
      setLoading(false)
    }
  }, [tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAll()

    if (!tripId || tripId.startsWith('mock-')) return

    const ch1 = supabase.channel(`stops-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trip_stops' }, fetchAll).subscribe()
    const ch2 = supabase.channel(`activities-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activities' }, fetchAll).subscribe()

    return () => { supabase.removeChannel(ch1); supabase.removeChannel(ch2) }
  }, [fetchAll]) // eslint-disable-line react-hooks/exhaustive-deps

  async function addStop(input: TripStopInput & { order_index: number }) {
    if (!tripId || tripId.startsWith('mock-')) return
    const { error } = await supabase.from('trip_stops').insert([{ ...input, trip_id: tripId }])
    if (!error) fetchAll()
    return error
  }

  async function addActivity(stopId: string, input: ActivityInput) {
    if (stopId.startsWith('mock-')) return
    const { error } = await supabase.from('activities').insert([{ ...input, stop_id: stopId }])
    if (!error) fetchAll()
    return error
  }

  return { stops, activities, loading, addStop, addActivity }
}
