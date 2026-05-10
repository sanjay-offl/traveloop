import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'
import type { CommunityPost } from '../lib/types'
import type { CommunityPostInput } from '../lib/validations'

export { CommunityPost }

export function useCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('community_posts')
      .select('*, profiles:user_id(full_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(15)
    setPosts((data || []) as CommunityPost[])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetch()
    const ch = supabase
      .channel(`community-${Math.random()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, fetch)
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [fetch])

  async function createPost(input: CommunityPostInput) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('community_posts').insert([{ ...input, user_id: user.id }])
    if (!error) fetch()
    return error
  }

  async function deletePost(id: string) {
    const { error } = await supabase.from('community_posts').delete().eq('id', id)
    if (!error) fetch()
  }

  return { posts, loading, createPost, deletePost }
}
