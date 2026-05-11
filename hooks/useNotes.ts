import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { TripNote } from '../lib/types'
import type { TripNoteInput } from '../lib/validations'
import { MOCK_NOTES } from './useMockData'

export function useNotes(tripId: string | null) {
  const [notes, setNotes]     = useState<TripNote[]>([])
  const [loading, setLoading] = useState(true)
  const [usingMock, setUsingMock] = useState(false)
  const supabase = createClient()

  const fetch = useCallback(async () => {
    if (!tripId || tripId.startsWith('mock-')) {
      setNotes(MOCK_NOTES.filter(n => n.trip_id === (tripId || 'mock-trip-001')))
      setUsingMock(true)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const { data } = await supabase
        .from('trip_notes')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: false })

      if (!data || data.length === 0) {
        setNotes(MOCK_NOTES)
        setUsingMock(true)
      } else {
        setNotes(data as TripNote[])
        setUsingMock(false)
      }
    } catch (e) {
      console.warn('[useNotes] fetch error, using mock:', e)
      setNotes(MOCK_NOTES)
      setUsingMock(true)
    } finally {
      setLoading(false)
    }
  }, [tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch()

    if (!tripId || tripId.startsWith('mock-')) return

    const ch = supabase
      .channel(`notes-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trip_notes' }, fetch)
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [fetch]) // eslint-disable-line react-hooks/exhaustive-deps

  async function addNote(input: TripNoteInput, stopId?: string) {
    if (usingMock) {
      const newNote: TripNote = {
        id: `mock-note-${Date.now()}`,
        trip_id: tripId || 'mock-trip-001',
        stop_id: stopId || null,
        note: input.note,
        created_at: new Date().toISOString(),
      }
      setNotes(prev => [newNote, ...prev])
      return null
    }

    if (!tripId) return new Error('No trip selected')
    const { error } = await supabase.from('trip_notes').insert([{ ...input, trip_id: tripId, stop_id: stopId }])
    if (!error) fetch()
    return error
  }

  async function deleteNote(id: string) {
    if (usingMock || id.startsWith('mock-')) {
      setNotes(prev => prev.filter(n => n.id !== id))
      return
    }
    const { error } = await supabase.from('trip_notes').delete().eq('id', id)
    if (!error) fetch()
  }

  return { notes, loading, usingMock, addNote, deleteNote }
}
