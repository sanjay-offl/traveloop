import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { TripNote } from '../lib/types'
import type { TripNoteInput } from '../lib/validations'

export function useNotes(tripId: string | null) {
  const [notes, setNotes] = useState<TripNote[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetch = useCallback(async () => {
    if (!tripId) { setNotes([]); setLoading(false); return }
    setLoading(true)
    const { data } = await supabase
      .from('trip_notes')
      .select('*')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: false })
    setNotes(data || [])
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    fetch()
    const ch = supabase
      .channel(`notes-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trip_notes' }, fetch)
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [fetch])

  async function addNote(input: TripNoteInput, stopId?: string) {
    if (!tripId) return
    const { error } = await supabase.from('trip_notes').insert([{ ...input, trip_id: tripId, stop_id: stopId }])
    if (!error) fetch()
    return error
  }

  async function deleteNote(id: string) {
    const { error } = await supabase.from('trip_notes').delete().eq('id', id)
    if (!error) fetch()
  }

  return { notes, loading, addNote, deleteNote }
}
