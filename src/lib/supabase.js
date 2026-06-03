import { createClient } from '@supabase/supabase-js'

// TEMBAK LANGSUNG DI SINI (Ganti dengan data milikmu)
const supabaseUrl = 'https://qfqpeyeyggqwssekkqtf.supabase.co'
const supabaseAnonKey = 'sb_publishable_rMDIhemi7Jfk0PiyMQ1sxQ_FvVqkVit'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)