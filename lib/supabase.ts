import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validasi URL sederhana untuk mencegah runtime error
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const supabase = isValidUrl(supabaseUrl) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any // Fallback to null if URL is invalid

