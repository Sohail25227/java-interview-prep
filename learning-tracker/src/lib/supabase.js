import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cloud sync is optional. If the env vars aren't set, the app runs
// fully on localStorage (offline) and no auth UI is shown.
export const cloudEnabled = Boolean(url && anonKey)

export const supabase = cloudEnabled
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

// Table used to store each user's progress as a single JSON blob.
export const PROGRESS_TABLE = 'progress'
