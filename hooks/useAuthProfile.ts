'use client'

import { useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'

import { createClient } from '../utils/supabase/client'

function readMetaString(user: User | null, key: string): string | null {
  if (!user) return null
  const meta = user.user_metadata as Record<string, unknown> | undefined
  const value = meta?.[key]
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function getDisplayName(user: User | null): string {
  const fullName = readMetaString(user, 'full_name') ?? readMetaString(user, 'name')
  if (fullName) return fullName

  const email = user?.email?.trim()
  if (email) {
    return email.split('@')[0]
  }

  return 'Traveler'
}

function getInitials(displayName: string): string {
  const parts = displayName
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (parts.length === 0) return 'TR'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

export function useAuthProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    let mounted = true

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser()
      if (!mounted) return

      if (error) {
        setUser(null)
      } else {
        setUser(data.user ?? null)
      }
      setLoading(false)
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const displayName = useMemo(() => getDisplayName(user), [user])
  const initials = useMemo(() => getInitials(displayName), [displayName])

  return {
    user,
    loading,
    displayName,
    initials,
    email: user?.email ?? '',
    isAuthenticated: Boolean(user),
  }
}
