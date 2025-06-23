import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fetch from 'cross-fetch';

const supabaseUrl = 'https://eccdcuuimltbhwhwimzz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjY2RjdXVpbWx0Ymh3aHdpbXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDI0MDEsImV4cCI6MjA2NTk3ODQwMX0.BjQlG_4z5Lt6L0KeLqi34uFEeTbtwtM1QCri839dnhs'

let supabase: SupabaseClient | null = null;

export const getSupabase = () => {
  if (!supabase) {
    supabase = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          storage: AsyncStorage,
          storageKey: 'supabase.auth.token',
        //   autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
        global: {
          fetch,
        },
      }
    );
  }
  return supabase;
};