import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { PackingItem } from '../lib/types'
import type { PackingItemInput } from '../lib/validations'

export function useChecklist(tripId: string | null) {
  const [items, setItems] = useState<PackingItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetch = useCallback(async () => {
    if (!tripId) { setItems([]); setLoading(false); return }
    setLoading(true)
    const { data } = await supabase
      .from('packing_items')
      .select('*')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    fetch()
    const ch = supabase
      .channel(`packing-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'packing_items' }, fetch)
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [fetch])

  async function addItem(input: PackingItemInput) {
    if (!tripId) return
    const { error } = await supabase.from('packing_items').insert([{ ...input, trip_id: tripId }])
    if (!error) fetch()
    return error
  }

  async function toggleItem(id: string, current: boolean) {
    // Optimistic
    setItems(p => p.map(i => i.id === id ? { ...i, is_packed: !current } : i))
    const { error } = await supabase.from('packing_items').update({ is_packed: !current }).eq('id', id)
    if (error) setItems(p => p.map(i => i.id === id ? { ...i, is_packed: current } : i))
  }

  async function deleteItem(id: string) {
    const { error } = await supabase.from('packing_items').delete().eq('id', id)
    if (!error) fetch()
  }

  return { items, loading, addItem, toggleItem, deleteItem }
}
