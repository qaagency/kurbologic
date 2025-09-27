import { createClient } from '@supabase/supabase-js'

// TODO: Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    flowType: 'pkce'
  }
})