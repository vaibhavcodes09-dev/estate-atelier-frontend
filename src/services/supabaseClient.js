import { createClient } from '@supabase/supabase-js';

// supabaseClient — singleton Supabase client initialised from env vars.
// If env vars are absent the client is null and authService falls back
// to a no-op mock so the UI remains functional during development.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
