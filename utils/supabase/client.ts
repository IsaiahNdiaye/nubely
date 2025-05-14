import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export type Database = any; // Replace with your actual Supabase database type when available

export function createClient() {
  // Create a Supabase client for Client Components
  return createClientComponentClient<Database>();
} 