import { createBrowserClient } from '@supabase/ssr'

// Support both the newer publishable key and the classic anon key env var names
const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey  =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[Traveloop] Supabase env vars missing. Check NEXT_PUBLIC_SUPABASE_URL and ' +
    'NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) in .env.local'
  )
}

export const createClient = () =>
  createBrowserClient(supabaseUrl, supabaseKey)
