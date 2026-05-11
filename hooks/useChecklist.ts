import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { PackingItem } from '../lib/types'
import type { PackingItemInput } from '../lib/validations'
import { MOCK_PACKING_ITEMS } from './useMockData'

export function useChecklist(tripId: string | null) {
  const [items, setItems]   = useState<PackingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [usingMock, setUsingMock] = useState(false)
  const supabase = createClient()

  const fetch = useCallback(async () => {
    // Mock trip — immediately show mock packing items
    if (!tripId || tripId.startsWith('mock-')) {
      setItems(MOCK_PACKING_ITEMS)
      setUsingMock(true)
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const { data } = await supabase
        .from('packing_items')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: true })

      if (!data || data.length === 0) {
        setItems(MOCK_PACKING_ITEMS)
        setUsingMock(true)
      } else {
        setItems(data as PackingItem[])
        setUsingMock(false)
      }
    } catch (e) {
      console.warn('[useChecklist] fetch error, using mock:', e)
      setItems(MOCK_PACKING_ITEMS)
      setUsingMock(true)
    } finally {
      setLoading(false)
    }
  }, [tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch()

    if (!tripId || tripId.startsWith('mock-')) return

    const ch = supabase
      .channel(`packing-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'packing_items' }, fetch)
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [fetch]) // eslint-disable-line react-hooks/exhaustive-deps

  async function addItem(input: PackingItemInput) {
    if (usingMock) {
      const newItem: PackingItem = {
        id: `mock-pack-${Date.now()}`,
        trip_id: tripId || 'mock-trip-001',
        item_name: input.item_name,
        category: input.category,
        is_packed: false,
        created_at: new Date().toISOString(),
      }
      setItems(prev => [...prev, newItem])
      return null
    }

    if (!tripId) return
    const { error } = await supabase.from('packing_items').insert([{ ...input, trip_id: tripId }])
    if (!error) fetch()
    return error
  }

  async function toggleItem(id: string, current: boolean) {
    // Optimistic update — works for both real and mock items
    setItems(p => p.map(i => i.id === id ? { ...i, is_packed: !current } : i))

    if (usingMock || id.startsWith('mock-')) return

    const { error } = await supabase.from('packing_items').update({ is_packed: !current }).eq('id', id)
    if (error) setItems(p => p.map(i => i.id === id ? { ...i, is_packed: current } : i))
  }

  async function deleteItem(id: string) {
    if (usingMock || id.startsWith('mock-')) {
      setItems(prev => prev.filter(i => i.id !== id))
      return
    }
    const { error } = await supabase.from('packing_items').delete().eq('id', id)
    if (!error) fetch()
  }

  return { items, loading, usingMock, addItem, toggleItem, deleteItem }
}
